import React from "react";
import { motion } from "framer-motion";
import { HiArrowUp, HiArrowDown } from "react-icons/hi";

const StatCard = ({ title, value, percentage, positive, icon: Icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
  className="w-full px-12 py-10 bg-white rounded-2xl shadow border border-ookay"

   >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        {Icon && <Icon className="text-yes text-2xl" />}
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p
        className={`flex items-center gap-1 text-sm mt-1 ${
          positive ? "text-green-500" : "text-red-500"
        }`}
      >
        {positive ? <HiArrowUp /> : <HiArrowDown />} {percentage}
      </p>
      <p className="text-xs text-gray-500">vs. 3 months prior to 21 Jan</p>
    </motion.div>
  );
};

export default StatCard;
