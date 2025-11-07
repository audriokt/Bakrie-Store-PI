import React from "react";
import { motion } from "framer-motion";
import { HiShoppingBag } from "react-icons/hi";

const TopSelling = () => {
  const products = [
    { name: "Luminiaire Giotto Headphones", sold: 252 },
    { name: "Black Sneaker", sold: 186 },
    { name: "Gray Hoodies", sold: 166 },
    { name: "Blue Backpack", sold: 93 },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-3xl p-8 shadow-lg border-2 border-ookay transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-yes flex items-center gap-3">
          <HiShoppingBag className="text-yes text-3xl" /> Top Selling
        </h2>
        <button className="text-sm text-white bg-yes px-4 py-2 rounded-xl hover:bg-red-700 transition">
          View Products
        </button>
      </div>

      {/* List */}
      <div className="space-y-4 mt-4">
        {products.map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-center py-4 px-2 border-b-2 border-ookay hover:bg-ookay/30 rounded-lg transition"
          >
            <span className="text-gray-800 text-base font-medium">
              {item.name}
            </span>
            <span className="font-bold text-lg text-gray-900">{item.sold}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopSelling;
