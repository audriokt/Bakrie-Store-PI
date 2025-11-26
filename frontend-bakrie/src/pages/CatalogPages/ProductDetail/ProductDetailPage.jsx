import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCarousel from "@/components/core/ProductCarousel.jsx";
import { useAuth } from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useCart } from "../../../hooks/useCart";

const ProductDetailPage = () => {
  const { state } = useLocation(); 
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // 1. Panggil langsung sesuai nama di Context: 'addItemToCart'
  const { addItemToCart, loading } = useCart(); 
  
  const [quantity, setQuantity] = useState(1);

  // --- DEBUGGING PRODUK (Cek Console F12) ---
  useEffect(() => {
    console.group("🔍 DEBUG DETAIL PAGE: PRODUCT DATA");
    console.log("Raw Product State:", state);
    // Cek mana ID yang berisi data
    const detecetedId = state?.id_product || state?.id || state?.productId;
    console.log("Detected Product ID:", detecetedId || "❌ TIDAK KETEMU");
    console.groupEnd();
  }, [state]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = async () => {
    // A. Cek Login
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You need to login to add items to your cart.",
        confirmButtonText: "Login Now",
        showCancelButton: true,
        confirmButtonColor: "#C31D1D",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    // B. Ambil ID Product (Prioritas: id_product sesuai log kamu sebelumnya)
    const productId = state.id_product || state.id || state.productId;

    if (!productId) {
        console.error("❌ Product ID Missing!", state);
        Swal.fire({
            icon: "error",
            title: "Data Error",
            text: "Product ID tidak ditemukan. Cek Console.",
        });
        return;
    }

    try {
      console.log("🚀 Mengirim Request Add to Cart...", { productId, quantity });
      
      // 2. Panggil fungsi dengan nama asli
      await addItemToCart(productId, quantity);

      // C. Sukses
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: `${state.product_name} added to cart!`,
        confirmButtonColor: "#C31D1D",
        confirmButtonText: "Go to Cart",
        showCancelButton: true,
        cancelButtonText: "Continue Shopping"
      }).then((result) => {
        if (result.isConfirmed) navigate("/carts"); 
      });

    } catch (error) {
      // Error detail sudah di-log di Context, disini tampilkan UI saja
      console.error("❌ Gagal di Page:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Failed to add item to cart.",
        confirmButtonColor: "#C31D1D",
      });
    }
  };

  if (!state) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fff] px-6">
        <div className="flex flex-col items-center justify-center bg-[#FFF5F5] border border-[#FFDADA] rounded-2xl shadow-md w-[80%] max-w-xl py-16 px-10 text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-3">Product Not Found 😢</h2>
          <Link to="/products" className="bg-red-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-700 transition-colors duration-200">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return price?.toLocaleString("id-ID");
  };

  return (
    <div className="max-w-screen min-h-screen flex items-center justify-center bg-[#fff] px-8 py-16 pt-32">
      <motion.div
        className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ProductCarousel images={[state.image_url]} />

        <div className="flex flex-col text-red-700 w-full">
          <h2 className="text-2xl font-semibold">{state.product_name}</h2>
          <div className="border-b border-red-300 mt-2 mb-4 w-full"></div>

          <p className="text-sm leading-relaxed mb-8 text-red-700/90">
            {state.description}
          </p>

          <p className="text-lg font-semibold mb-4">Rp{formatPrice(state.product_price)}</p>

          <div className="flex flex-col w-full h-20 items-start gap-4 mt-6">
            <div className="flex w-full items-center justify-between border border-red-400 rounded-full py-3 px-6 shadow-sm bg-white/70 backdrop-blur-sm">
              <button onClick={handleDecrease} className="text-red-600 font-bold text-2xl hover:text-red-800 transition-all duration-150 hover:scale-110 active:scale-95">−</button>
              <span className="text-red-700 font-semibold text-lg select-none text-center w-6">{quantity}</span>
              <button onClick={handleIncrease} className="text-red-600 font-bold text-2xl hover:text-red-800 transition-all duration-150 hover:scale-110 active:scale-95">+</button>
            </div>

            <div className="w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart} 
                disabled={loading} 
                className={`w-full py-3 rounded-full font-semibold transition-colors duration-200 shadow-md ${
                    loading ? "bg-red-400 cursor-not-allowed text-white" : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {loading ? "Adding..." : "Add to Cart"}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;