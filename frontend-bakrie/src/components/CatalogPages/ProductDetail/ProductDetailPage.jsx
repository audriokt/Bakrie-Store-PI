import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ProductCarousel from "@/components/core/ProductCarousel.jsx";

const ProductDetailPage = () => {
  const { state } = useLocation(); // ← ambil data produk dari Link
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  if (!state) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        <p>Product not found 😢</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff] px-8 py-16">
      <motion.div
        className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Carousel Produk */}
        <ProductCarousel images={[state.src]} />

        {/* Info Produk */}
        <div className="flex flex-col flex-1 text-red-700">
          <h2 className="text-2xl font-semibold">{state.name}</h2>
          <div className="border-b border-red-300 mt-2 mb-4 w-full"></div>

          <p className="text-sm leading-relaxed mb-8 text-red-700/90">
            {state.description}
          </p>

          <p className="text-lg font-semibold mb-4">{state.price}</p>

          {/* Quantity Selector & Add to Cart */}
          <div className="flex flex-col items-start gap-4 mt-6">
            <div className="flex items-center justify-between border border-red-400 rounded-full w-60 py-3 px-6 shadow-sm bg-white/70 backdrop-blur-sm">
              <button
                onClick={handleDecrease}
                className="text-red-600 font-bold text-2xl hover:text-red-800 transition-all duration-150 hover:scale-110 active:scale-95"
              >
                −
              </button>

              <span className="text-red-700 font-semibold text-lg select-none text-center w-6">
                {quantity}
              </span>

              <button
                onClick={handleIncrease}
                className="text-red-600 font-bold text-2xl hover:text-red-800 transition-all duration-150 hover:scale-110 active:scale-95"
              >
                +
              </button>
            </div>

            <Link to="/carts" className="w-60">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-red-600 text-white py-3 w-full rounded-full font-semibold hover:bg-red-700 transition-colors duration-200 shadow-md"
              >
                Add to Cart
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage;
