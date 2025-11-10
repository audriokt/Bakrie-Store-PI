import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { Button } from "flowbite-react";
import ProductHeader from "../../../components/productAdmin/ProductHeader";
import { fetchProducts, deleteProduct } from "../../../services/productService";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const handleEdit = (product) => {
    navigate(`/admin/products/edit/${product.id}`);
  };

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

  const handleEditSave = () => {
    if (!selectedProduct) return;
    setProducts((prev) =>
      prev.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
    );
    setShowEditModal(false);
  };

  if (loading) return <div className="p-6 text-center">Loading products...</div>;

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-10 py-6">
      <div className="max-w-7xl mx-auto w-full">
        <ProductHeader />

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-red-100 rounded-xl shadow-sm overflow-hidden mt-6"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="text-xs uppercase bg-red-50 text-red-600">
                <tr>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Quantity</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {products.map((product) => (
                  <motion.tr
                    key={product.id}
                    whileHover={{ scale: 1.01, backgroundColor: "#FFF5F5" }}
                    className="border-b last:border-none"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.quantity}</td>
                    <td className="px-6 py-4">{product.status}</td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          color="light"
                          size="xs"
                          className="border border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                          onClick={() => handleEdit(product)}
                        >
                          <HiPencilAlt className="w-4 h-4" />
                        </Button>
                        <Button
                          color="light"
                          size="xs"
                          className="border border-red-400 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteClick(product)}
                        >
                          <HiTrash className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-ookay p-6 rounded-2xl shadow-xl w-[90%] sm:w-[400px] text-center border border-red-300"
            >
              <h3 className="text-xl font-semibold text-red-700 mb-3">
                Delete Confirmation
              </h3>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-medium">{selectedProduct?.name}</span>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
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
