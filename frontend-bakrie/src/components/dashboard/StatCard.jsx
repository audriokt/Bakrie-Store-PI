import React from "react";
import { motion } from "framer-motion";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

const StatCard = ({ title, value, percentage, positive, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="w-full bg-white rounded-2xl shadow-sm border border-ookay p-6 md:p-8 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base md:text-lg font-semibold text-gray-700">{title}</h2>
        {Icon && (
          <div className="p-2 bg-ookay/40 rounded-xl">
            <Icon className="text-yes text-xl md:text-2xl" />
          </div>
        )}
      </div>

      {/* Main Value */}
      <div className="flex flex-col gap-2">
        <p className="text-3xl font-bold text-gray-800 leading-tight">{value}</p>
        <div
          className={`flex items-center gap-1 text-sm font-medium ${
            positive ? "text-green-500" : "text-red-500"
          }`}
        >
          {positive ? <HiArrowUp /> : <HiArrowDown />}
          <span>{percentage}</span>
          <span className="text-gray-500 text-xs font-normal ml-1">
            vs. last 3 months
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
