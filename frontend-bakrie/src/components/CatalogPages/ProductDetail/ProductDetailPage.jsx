import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCarousel from "@/components/core/ProductCarousel.jsx";


const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  // Gambar produk dari backend atau data statis dulu
  const productImages = [
    "https://th.bing.com/th/id/R.58739b5f005c06bc2eb37bbf4bcc4ea9?rik=VPhf1kmQWewJtA&riu=http%3a%2f%2fwww.sweetfixbaker.com%2fwp-content%2fuploads%2f2024%2f01%2fStrawberry-Croissant-Recipe-7-819x1024.jpg&ehk=%2bmcRun1EqM3XfnNG0NyMJIdXPBJsRL10lnKG7PqcM%2fI%3d&risl=&pid=ImgRaw&r=0",
    "https://tse2.mm.bing.net/th/id/OIP.ZVXlWeklKgMgzQR9QNzZNAHaJQ?cb=12&pid=ImgDet&w=474&h=592&rs=1&o=7&rm=3",
    "https://tse3.mm.bing.net/th/id/OIP.jQ3q10uO0vAgCiLKSWn0DQHaJQ?cb=12&pid=ImgDet&w=474&h=592&rs=1&o=7&rm=3",
    "https://tse4.mm.bing.net/th/id/OIP.S5MB3gwgVcFEUJ0pdBQL_gHaJQ?cb=12&pid=ImgDet&w=474&h=592&rs=1&o=7&rm=3",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fff] px-8 py-16">
      <motion.div
        className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Carousel Produk */}
        <ProductCarousel images={productImages} />

        {/* Info Produk */}
        <div className="flex flex-col flex-1 text-red-700">
          <h2 className="text-2xl font-semibold">Strawberry Croissant</h2>
          <div className="border-b border-red-300 mt-2 mb-4 w-full"></div>

          <p className="text-sm leading-relaxed mb-8 text-red-700/90">
            Croissant renyah dengan lapisan krim strawberry lembut, cocok
            untuk teman teh soremu 🍓🥐
          </p>

       {/* Quantity Selector & Add to Cart */}
        <div className="flex flex-col items-start gap-4 mt-6">
          {/* Quantity Selector */}
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

          {/* Tombol Add to Cart */}
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
