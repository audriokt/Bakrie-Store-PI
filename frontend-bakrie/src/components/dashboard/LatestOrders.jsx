import React from "react";
import { HiClipboardList } from "react-icons/hi";

const LatestOrders = ({ todayOrders }) => {
  // const orders = [
  //   { id: "#95954", status: "Paid", date: "10/08/2022", customer: "Ron Vargas", total: "$168.00", color: "text-green-500" },
  //   { id: "#95423", status: "Paid", date: "30/07/2022", customer: "Carolyn Hanso", total: "$523.00", color: "text-green-500" },
  //   { id: "#92903", status: "Pending", date: "18/07/2022", customer: "Gabriella May", total: "$81.00", color: "text-yellow-500" },
  //   { id: "#92627", status: "Failed", date: "09/07/2022", customer: "Tara Fletcher", total: "$279.00", color: "text-red-500" },
  //   { id: "#89332", status: "Paid", date: "02/06/2022", customer: "Eileen Horton", total: "$597.00", color: "text-green-500" },
  // ];

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-3xl p-8 shadow-md border border-ookay w-full h-full"
    >
      {/* Header */}
    <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-ookay rounded-xl">
            <HiClipboardList className="text-yes text-2xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Latest Orders</h2>
        </div>

        <button className="text-sm text-white bg-yes px-4 py-2 rounded-xl hover:bg-red-700 transition">
          View Orders
        </button>
      </div>


      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-base text-left border-collapse">
          <thead>
            <tr className="bg-ookay/50 text-gray-700">
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {todayOrders.map((order, i) => (
              <tr
                key={i}
                className="border-b border-ookay/60 hover:bg-ookay/20 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">{order.id}</td>
                <td className={`px-6 py-4 font-semibold ${order.color}`}>
                  {order.status}
                </td>
                <td className="px-6 py-4 text-gray-700">{order.date}</td>
                <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                <td className="px-6 py-4 font-semibold text-gray-800">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default LatestOrders;
