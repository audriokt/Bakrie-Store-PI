import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      className="
        relative w-full 
        h-[350px] sm:h-[420px] md:h-[480px] lg:h-[520px] 
        overflow-hidden rounded-2xl shadow-lg bg-white
        flex items-center justify-center
      "
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          className="absolute w-full h-full object-cover rounded-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>

      {/* Tombol Navigasi */}
      <button
        onClick={prevImage}
        className="
          absolute top-1/2 left-4 -translate-y-1/2 
          bg-white/80 rounded-full p-2 sm:p-3 shadow 
          hover:bg-white transition
        "
      >
        ◀
      </button>
      <button
        onClick={nextImage}
        className="
          absolute top-1/2 right-4 -translate-y-1/2 
          bg-white/80 rounded-full p-2 sm:p-3 shadow 
          hover:bg-white transition
        "
      >
        ▶
      </button>

      {/* Indikator */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentIndex === i ? "bg-red-500 scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
