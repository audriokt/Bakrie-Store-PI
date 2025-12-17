import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import {
  getDummyProducts,
  deleteDummyProduct,
} from "../../../data/dummyProducts";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    setProducts(getDummyProducts());
  }, []);

  const handleDelete = () => {
    if (!productToDelete) return;
    deleteDummyProduct(productToDelete.id);
    setProducts(getDummyProducts());
    setProductToDelete(null);
  };

  const filteredProducts = products.filter((p) =>
    p.product_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Products Management
        </h1>
        <p className="text-gray-600">
          Manage your bakery products inventory
        </p>
      </div>

      {/* ACTION BAR */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:ring-2 focus:ring-red-400"
          />
        </div>

        <Link to="/admin/products/add">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-4 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full font-semibold shadow-lg flex items-center gap-2"
          >
            <Package size={20} />
            Add Product
          </motion.button>
        </Link>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-50">
            <tr>
              <th className="px-6 py-4 text-left">Image</th>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-center">Category</th>
              <th className="px-6 py-4 text-center">Stock</th>
              <th className="px-6 py-4 text-center">Price</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t hover:bg-red-50"
                >
                  <td className="px-6 py-4">
                    <img
                      src={p.image_url}
                      alt={p.product_name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold">{p.product_name}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                      {p.category || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">{p.product_stock}</td>
                  <td className="px-6 py-4 text-center font-bold text-red-600">
                    Rp {(p.product_price ?? 0).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-3">
                    <Link to={`/admin/products/edit/${p.id}`}>
                      <Pencil className="text-blue-600 cursor-pointer" />
                    </Link>
                    <button onClick={() => setProductToDelete(p)}>
                      <Trash2 className="text-red-600 cursor-pointer" />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* DELETE CONFIRMATION POPUP */}
      <AnimatePresence>
        {productToDelete && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-lg font-semibold mb-2">Delete Product</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{productToDelete.product_name}</span>?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setProductToDelete(null)}
                  className="px-4 py-2 rounded-full border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-full bg-red-600 text-white"
                >
                  Delete
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
