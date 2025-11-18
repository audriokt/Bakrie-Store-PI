import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import ProductHeader from "../../../components/productAdmin/ProductHeader";
import { fetchProducts, deleteProduct } from "../../../services/productService";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dummyProducts = [
    { id: 1, name: "Luminiaire Giotto Headphones", category: "Electronics", quantity: 52, status: "Available", price: "$199" },
    { id: 2, name: "Black Sneaker", category: "Fashion", quantity: 34, status: "Available", price: "$89" },
    { id: 3, name: "Wooden Chair", category: "Furniture", quantity: 15, status: "Low Stock", price: "$129" },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response?.data || dummyProducts);
      } catch {
        setProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProduct(selectedProduct.id);
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
      setShowDeleteModal(false);
    } catch {
      alert("Failed to delete product.");
    }
  };

  if (loading)
    return <div className="p-6 text-center text-gray-600">Loading products...</div>;

  return (
    <div className="min-h-screen w-full bg-ookay/20 py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* header */}
        <ProductHeader />

        {/*tabelnyaaw*/}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-ookay rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-ookay text-red-600">
                <tr>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-ookay">
                {products.map((product) => (
                  <motion.tr
                    key={product.id}
                    whileHover={{ backgroundColor: "#FFF5F5" }}
                    className="transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.quantity}</td>
                    <td
                      className={`px-6 py-4 font-medium ${
                        product.status === "Available"
                          ? "text-green-600"
                          : product.status === "Low Stock"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {product.status}
                    </td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                        >
                          <HiPencilAlt className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition"
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* buat kayak delete pop-up gituch*/}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white p-8 rounded-2xl shadow-xl w-[90%] sm:w-[400px] text-center border border-ookay"
            >
              <h3 className="text-2xl font-semibold text-yes mb-4">
                Delete Confirmation
              </h3>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">
                  {selectedProduct?.name}
                </span>
                ?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
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
