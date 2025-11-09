import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiPencilAlt, HiTrash } from "react-icons/hi";
import { Button } from "flowbite-react";
import ProductHeader from "../../../components/productAdmin/ProductHeader";
import DeleteProductModal from "../../../components/productAdmin/DeleteProductModal";
import { fetchProducts, deleteProduct } from "../../../services/productService";

const ProductsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  // Data dummy untuk fallback
  const dummyProducts = [
    {
      id: 1,
      name: "Luminiaire Giotto Headphones",
      category: "Electronics",
      quantity: 52,
      status: "Available",
      price: "$199",
    },
    {
      id: 2,
      name: "Black Sneaker",
      category: "Fashion",
      quantity: 34,
      status: "Available",
      price: "$89",
    },
    {
      id: 3,
      name: "Wooden Chair",
      category: "Furniture",
      quantity: 15,
      status: "Low Stock",
      price: "$129",
    },
  ];

  // Ambil data produk dari backend (atau fallback dummy)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        if (response?.data && Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.warn("No data from backend, using dummy data");
          setProducts(dummyProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // handle delete modal
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  // konfirmasi hapus produk (dummy + backend)
  const handleConfirmDelete = async () => {
    try {
      if (selectedProduct.id <= 3) {
        // Jika produk dummy → hapus langsung di frontend
        setProducts(products.filter((p) => p.id !== selectedProduct.id));
        console.log("Deleted dummy:", selectedProduct);
      } else {
        // Produk dari backend → panggil API
        await deleteProduct(selectedProduct.id);
        setProducts(products.filter((p) => p.id !== selectedProduct.id));
        console.log("Deleted from backend:", selectedProduct);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Check console for details.");
    } finally {
      setOpenModal(false);
      setSelectedProduct(null);
    }
  };

  // Navigasi ke halaman edit produk
  const handleEditClick = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  if (loading) return <div className="p-6 text-center">Loading products...</div>;

  return (
    <div className="min-h-screen bg-white p-6">
      <ProductHeader />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-x-auto border border-red-100 rounded-xl shadow-sm"
      >
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="text-xs uppercase bg-red-50 text-red-600">
            <tr>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <motion.tr
                key={product.id}
                whileHover={{ scale: 1.01, backgroundColor: "#FFF5F5" }}
                transition={{ type: "spring", stiffness: 200 }}
                className="border-b hover:bg-red-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.quantity}</td>
                <td className="px-6 py-4">{product.status}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                                      
                    <Button
                      color="light"
                      size="xs"
                      className="border border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                      onClick={() =>
                        navigate(`/admin/products/edit/${product.id}`, { state: { product } })
                      }
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
      </motion.div>

      <DeleteProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={handleConfirmDelete}
        product={selectedProduct}
      />
    </div>
  );
};

export default ProductsPage;
