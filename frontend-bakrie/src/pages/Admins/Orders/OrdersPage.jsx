import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Eye, 
  Trash2, 
  Search,
  Download
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

// ===============================
// ORDERS PAGE
// ===============================
const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const dummyOrders = [
    {
      id_order: "1",
      orderNumber: "BK-1001",
      orderDate: "2024-11-01T09:30:00",
      orderStatus: "Paid",
      customers: { customerName: "Alya Nirmala" },
      transaction: { total: 185 },
      items: ["Cheese Croissant", "Chocolate Muffin"],
    },
    {
      id_order: "2",
      orderNumber: "BK-1002",
      orderDate: "2024-11-03T14:10:00",
      orderStatus: "Pending",
      customers: { customerName: "Riko Pratama" },
      transaction: { total: 92.5 },
      items: ["Red Velvet Cupcake"],
    },
    {
      id_order: "3",
      orderNumber: "BK-1003",
      orderDate: "2024-11-05T11:20:00",
      orderStatus: "Completed",
      customers: { customerName: "Siti Aminah" },
      transaction: { total: 250 },
      items: ["Birthday Cake", "Macarons"],
    },
    {
      id_order: "4",
      orderNumber: "BK-1004",
      orderDate: "2024-11-07T16:45:00",
      orderStatus: "Cancelled",
      customers: { customerName: "Budi Santoso" },
      transaction: { total: 75 },
      items: ["Baguette"],
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Paid: 'bg-green-100 text-green-700',
      Pending: 'bg-yellow-100 text-yellow-700',
      Completed: 'bg-blue-100 text-blue-700',
      Cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const filteredOrders = dummyOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customers.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

 
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">Orders List</h1>
        <p className="text-gray-600">Track and manage customer orders</p>
      </div>

     
      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6 gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search orders or customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white border-2 border-gray-200 rounded-full hover:border-red-400 transition-all flex items-center space-x-2"
          >
            <Download size={20} />
            <span>Export</span>
          </motion.button>
        </div>
      </div>

      {/* Orders Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl shadow-lg border-2 border-red-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-red-50 to-pink-50 border-b-2 border-red-100">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Order #</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Items</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Total</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id_order}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: '#fff5f5' }}
                  className="border-b border-gray-100 hover:shadow-sm transition-all"
                >
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800">#{order.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(order.orderDate).toLocaleDateString("id-ID", { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {order.customers.customerName.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{order.customers.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {order.items.slice(0, 2).join(", ")}
                      {order.items.length > 2 && ` +${order.items.length - 2} more`}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-red-600 text-lg">
                      ${order.transaction.total}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <Link to={`/admin/orders/detail/${order.id_order}`}>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                        >
                          <Eye size={18} />
                        </motion.button>
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-lg">No orders found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
export default OrdersPage;