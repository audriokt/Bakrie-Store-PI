import { Link } from "react-router-dom";
import React, { useState } from "react";
import { motion } from "framer-motion";



const ProductDetailPage = () => {

  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  return (
   <div className="min-h-screen flex items-center justify-center bg-white px-8 py-12">
      <motion.div
        className="max-w-5xl w-full flex flex-col md:flex-row gap-10 items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Product Image */}
        <motion.img
          src="https://th.bing.com/th/id/OIP.0oqtpk1zcB48CgKtFImXAgHaHa?w=202&h=202&c=7&r=0&o=7&cb=12&dpr=1.5&pid=1.7&rm=3"
          alt="Strawberry Croissant"
          className="rounded-xl shadow-md w-[350px] h-[300px] object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        />

        {/* Product Info */}
        <div className="flex flex-col flex-1 text-red-700">
          <h2 className="text-xl font-semibold">Strawberry Croissant</h2>
          <div className="border-b border-red-300 mt-2 mb-4"></div>

          <p className="text-sm leading-relaxed mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {/* Quantity Selector */}
          <div className="flex items-center justify-center gap-6 border border-red-400 rounded-full w-56 md:w-64 py-3 mb-6 shadow-sm">
            <button
              onClick={handleDecrease}
              className="text-red-600 font-bold text-2xl hover:text-red-800 transition-transform duration-150 hover:scale-110"
            >
              −
            </button>
            <span className="text-red-600 font-semibold text-lg select-none">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="text-red-600 font-bold text-2xl hover:text-red-800 transition-transform duration-150 hover:scale-110"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white py-3 rounded-full font-medium hover:bg-red-700 transition-colors duration-200 w-56 md:w-64 shadow-md"
          >
            Add to Cart
          </motion.button>

        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetailPage