import React from "react";
import { HiShoppingBag } from "react-icons/hi";

const TopSelling = ({ products }) => {
  // const products = [
  //   { name: "Luminiaire Giotto Headphones", sold: 252 },
  //   { name: "Black Sneaker", sold: 186 },
  //   { name: "Gray Hoodies", sold: 166 },
  //   { name: "Blue Backpack", sold: 93 },
  // ];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-3xl p-8 shadow-md border border-ookay transition-all duration-300 w-full h-full"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-ookay rounded-xl">
            <HiShoppingBag className="text-yes text-2xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Top Selling Products</h2>
        </div>

        <button className="text-sm md:text-base text-white bg-yes px-5 py-2 rounded-xl hover:bg-red-700 transition font-medium shadow">
          View All
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-5">
        {products.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between bg-ookay/20 hover:bg-ookay/40 transition-all rounded-2xl p-4 border border-ookay/60 shadow-sm"
          >
            <div className="flex items-center gap-4">
              {/* Rank Badge */}
              <div className="bg-yes text-white font-semibold text-sm px-3 py-1 rounded-lg">
                #{index + 1}
              </div>

              {/* Product Name */}
              <span className="text-gray-800 font-medium text-base sm:text-lg">
                {item.name}
              </span>
            </div>

            {/* Sold Number */}
            <span className="font-bold text-lg text-gray-900">{item.sold}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopSelling;
