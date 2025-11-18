import React from "react";
import { motion } from "framer-motion";
import { HiUsers, HiUserAdd, HiUserCircle } from "react-icons/hi";

const CustomerStats = () => {
  const stats = [
    { title: "Total Customers", value: "2,420", icon: HiUsers },
    { title: "New Customers", value: "241", icon: HiUserAdd },
    { title: "Active Customers", value: "1,897", icon: HiUserCircle },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
      {stats.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
          className="p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-ookay hover:shadow-md transition-all duration-300"
        >
          {/* Icon */}
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-ookay/40 rounded-full">
              <item.icon className="text-yes text-3xl" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-base md:text-lg font-semibold text-gray-700 text-center mb-1">
            {item.title}
          </h2>

          {/* Value */}
          <p className="text-3xl font-bold text-gray-800 text-center">
            {item.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default CustomerStats;
