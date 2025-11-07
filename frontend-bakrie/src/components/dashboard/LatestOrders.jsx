import React from "react";
import { motion } from "framer-motion";

const LatestOrders = () => {
  const orders = [
    { id: "#95954", status: "Paid", date: "10/08/2022", customer: "Ron Vargas", total: "$168.00", color: "text-green-500" },
    { id: "#95423", status: "Paid", date: "30/07/2022", customer: "Carolyn Hanso", total: "$523.00", color: "text-green-500" },
    { id: "#92903", status: "Pending", date: "18/07/2022", customer: "Gabriella May", total: "$81.00", color: "text-yellow-500" },
    { id: "#92627", status: "Failed", date: "09/07/2022", customer: "Tara Fletcher", total: "$279.00", color: "text-red-500" },
    { id: "#89332", status: "Paid", date: "02/06/2022", customer: "Eileen Horton", total: "$597.00", color: "text-green-500" },
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-2xl p-4 shadow border border-ookay"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-yes">Latest Orders</h2>
        <button className="text-sm text-white bg-yes px-3 py-1 rounded-lg hover:bg-red-700 transition">
          View Orders
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-ookay text-gray-700">
            <tr>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="border-b border-ookay">
                <td className="px-4 py-2">{order.id}</td>
                <td className={`px-4 py-2 font-semibold ${order.color}`}>
                  {order.status}
                </td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default LatestOrders;
