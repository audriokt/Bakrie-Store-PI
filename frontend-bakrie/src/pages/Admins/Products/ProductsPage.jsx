import React, { useState, useEffect, useMemo } from "react";
import {  AnimatePresence } from "framer-motion";
import { HiSearch, HiChevronUp, HiChevronDown, HiPlus, HiPencilAlt, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import api from "../../../services/adminDashboardService.js";

const ITEMS_PER_PAGE = 10;

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // Fetch products dari backend
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await api.get("/products");
                setProducts(data || []);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    // Search filter berdasarkan product_name
    const filteredProducts = useMemo(() => {
        if (!searchQuery.trim()) return products;
        const query = searchQuery.toLowerCase();
        return products.filter((p) =>
            (p.product_name || "").toLowerCase().includes(query)
        );
    }, [products, searchQuery]);

    // Sorting
    const sortedProducts = useMemo(() => {
        if (!sortConfig.key) return filteredProducts;

        return [...filteredProducts].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Handle numeric fields
            if (sortConfig.key === "product_price") {
                aValue = Number(a.product_price) || 0;
                bValue = Number(b.product_price) || 0;
            }
            if (sortConfig.key === "product_stock") {
                aValue = Number(a.product_stock) || 0;
                bValue = Number(b.product_stock) || 0;
            }

            // Handle date
            if (sortConfig.key === "created_at") {
                aValue = new Date(a.created_at);
                bValue = new Date(b.created_at);
            }

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredProducts, sortConfig]);

    // Pagination
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedProducts.slice(start, start + ITEMS_PER_PAGE);
    }, [sortedProducts, currentPage]);

    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
        setCurrentPage(1);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? (
            <HiChevronUp className="inline w-4 h-4 ml-1" />
        ) : (
            <HiChevronDown className="inline w-4 h-4 ml-1" />
        );
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!productToDelete) return;
        try {
            await api.delete(`/products/${productToDelete.id_product}`);
            setProducts((prev) =>
                prev.filter((p) => p.id_product !== productToDelete.id_product)
            );
            setShowDeleteModal(false);
            setProductToDelete(null);
        } catch (error) {
            console.error("Failed to delete product:", error);
            alert("Gagal menghapus produk.");
        }
    };

    if (loading) {
        return (
            <div className="pt-32 px-8 lg:px-12 min-h-screen bg-ookay/20 flex items-center justify-center">
                <p className="text-lg text-gray-600">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="pt-32 px-8 lg:px-12 pb-10 bg-ookay/20 min-h-screen">
            {/* Header: Title + Search + Add Button */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
                <motion.h1
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl lg:text-4xl font-extrabold text-yes"
                >
                    Product Management
                </motion.h1>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Search Bar */}
                    <div className="relative w-full sm:w-96">
                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-yes w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search product name..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-10 py-3 rounded-lg border border-ookay bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yes/40 transition"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setCurrentPage(1);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Add Product Button */}
                    <Link to="/admin/products/add">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-yes text-white rounded-lg font-medium shadow hover:bg-yes/90 transition whitespace-nowrap"
                        >
                            <HiPlus className="w-5 h-5" />
                            Add Product
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Search Result Info */}
            {searchQuery && (
                <p className="mb-4 text-sm text-gray-600">
                    Showing <strong>{sortedProducts.length}</strong> result(s) for "
                    <span className="text-yes">{searchQuery}</span>"
                </p>
            )}

            {/* Products Table */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow border border-ookay overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-ookay/40 text-yes text-xs uppercase tracking-wide">
                        <tr>
                            <th className="px-6 py-4">Image</th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:bg-ookay/60 transition"
                                onClick={() => handleSort("product_name")}
                            >
                                Product Name {getSortIcon("product_name")}
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:bg-ookay/60 transition"
                                onClick={() => handleSort("product_price")}
                            >
                                Price {getSortIcon("product_price")}
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:bg-ookay/60 transition"
                                onClick={() => handleSort("product_stock")}
                            >
                                Stock {getSortIcon("product_stock")}
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:bg-ookay/60 transition"
                                onClick={() => handleSort("created_at")}
                            >
                                Added On {getSortIcon("created_at")}
                            </th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedProducts.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-16 text-center text-gray-500 italic">
                                    {searchQuery
                                        ? "No products found matching your search."
                                        : "No products available yet."}
                                </td>
                            </tr>
                        ) : (
                            paginatedProducts.map((p) => (
                                <motion.tr
                                    key={p.id_product}
                                    whileHover={{ backgroundColor: "#FFF5F5" }}
                                    className="border-t last:border-none"
                                >
                                    {/* Image */}
                                    <td className="px-6 py-4">
                                        <img
                                            src={
                                                p.image_url ||
                                                "https://via.placeholder.com/80?text=No+Image"
                                            }
                                            alt={p.product_name}
                                            className="w-16 h-16 object-cover rounded-lg shadow-sm border border-ookay/30"
                                        />
                                    </td>

                                    {/* Name */}
                                    <td className="px-6 py-4 font-medium text-gray-900 max-w-xs truncate">
                                        {p.product_name}
                                    </td>

                                    {/* Price */}
                                    <td className="px-6 py-4 text-gray-700">
                                        Rp {Number(p.product_price).toLocaleString("id-ID")}
                                    </td>

                                    {/* Stock */}
                                    <td className="px-6 py-4">
                      <span
                          className={`font-semibold ${
                              p.product_stock > 20
                                  ? "text-green-600"
                                  : p.product_stock > 5
                                      ? "text-yellow-600"
                                      : "text-red-600"
                          }`}
                      >
                        {p.product_stock}
                      </span>
                                    </td>

                                    {/* Created At */}
                                    <td className="px-6 py-4 text-gray-600">
                                        {p.created_at
                                            ? new Date(p.created_at).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })
                                            : "-"}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                to={`/admin/products/edit/${p.id_product}`}
                                                state={{ product: p }}  // <-- PASS DATA LANGSUNG
                                                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                            >
                                                <HiPencilAlt className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(p)}
                                                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                                            >
                                                <HiTrash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-ookay/30 bg-ookay/10">
                        <p className="text-sm text-gray-600">
                            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> (
                            {sortedProducts.length} products)
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg bg-white border border-ookay text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ookay/20 transition"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg bg-white border border-ookay text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ookay/20 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-yes mb-4">Delete Product?</h3>
                            <p className="text-gray-700 mb-6">
                                Are you sure want to delete{" "}
                                <strong>{productToDelete?.product_name}</strong>?
                                <br />
                                <span className="text-sm text-gray-500">
                  This action cannot be undone.
                </span>
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductsPage;