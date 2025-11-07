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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {stats.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          className="px-12 py-5 bg-white rounded-2xl shadow border border-ookay text-center"
        >
          <div className="flex justify-center mb-2">
            <item.icon className="text-3xl text-yes" />
          </div>
          <h2 className="text-lg font-semibold text-yes">{item.title}</h2>
          <p className="text-3xl font-bold mt-2">{item.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default CustomerStats;
