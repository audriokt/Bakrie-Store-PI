import { HiPlus, HiSearch, HiFilter } from "react-icons/hi";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const ProductHeader = () => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex flex-col gap-3 mb-6 bg-ookay p-4 rounded-xl border border-red-200 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Search Bar */}
        <div className="relative w-full sm:w-1/3">
          <HiSearch className="absolute left-3 top-2.5 text-red-500" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-red-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Filter Button */}
          <Button
            color="light"
            onClick={() => setShowFilter(!showFilter)}
            className={`border ${
              showFilter
                ? "bg-red-600 text-white border-red-600"
                : "border-red-400 text-red-600 hover:bg-red-50"
            } transition`}
          >
            <HiFilter className="mr-2 h-4 w-4" /> Filter
          </Button>

          {/* Add Product Button (pakai Link) */}
          <Link to="/admin/products/add">
            <Button color="failure" className="bg-red-600 hover:bg-red-700 text-white shadow-sm">
              <HiPlus className="mr-2 h-4 w-4" /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col sm:flex-row items-center gap-3 mt-2 border border-red-200 p-3 rounded-lg bg-white"
          >
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-gray-600 text-sm font-medium">From:</label>
              <input type="date" className="border border-red-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <label className="text-gray-600 text-sm font-medium">To:</label>
              <input type="date" className="border border-red-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400" />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium shadow hover:bg-red-700 transition"
            >
              Apply
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductHeader;
