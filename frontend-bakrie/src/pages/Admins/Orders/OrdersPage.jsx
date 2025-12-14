import React from "react";
import { HiEye, HiTrash, HiClipboardList } from "react-icons/hi";
import OrdersHeader from "../../../components/Header/OrdersHeader";
import { Link } from "react-router-dom";

const dummyOrders = [
  {
    id_order: "1",
    orderNumber: "BK-1001",
    orderDate: "2024-11-01T09:30:00",
    orderStatus: "Paid",
    customers: { customerName: "Alya Nirmala" },
    transaction: { paymentMethod: "VISA", total: 185.0 },
    items: ["Cheese Croissant", "Chocolate Muffin", "Vanilla Cake Slice"]
  },
  {
    id_order: "2",
    orderNumber: "BK-1002",
    orderDate: "2024-11-03T14:10:00",
    orderStatus: "Pending",
    customers: { customerName: "Riko Pratama" },
    transaction: { paymentMethod: "MasterCard", total: 92.5 },
    items: ["Red Velvet Cupcake", "Blueberry Danish"]
  },
  {
    id_order: "3",
    orderNumber: "BK-1003",
    orderDate: "2024-11-05T08:15:00",
    orderStatus: "Paid",
    customers: { customerName: "Nadia Wijaya" },
    transaction: { paymentMethod: "PayPal", total: 240.0 },
    items: ["Tiramisu Cake", "Strawberry Tart", "Cinnamon Roll"]
  },
];

const OrdersPage = () => {
  return (
    <div className="min-h-screen w-full bg-ookay p-6 md:p-10">
      {/* header */}
    <OrdersHeader/>

      {/* ===== Tabel ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-ookay border border-red-100 shadow-md rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="text-red-600 uppercase bg-red-50 text-xs">
              <tr>
                <th className="px-6 py-3">Order</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {dummyOrders.map((order, index) => (
                <motion.tr
                  key={order.id_order}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#FFF5F5" }}
                  className="border-b last:border-none"
                >
                  {/* Order Number */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{order.orderNumber}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(order.orderDate).toLocaleDateString("id-ID")}
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4 text-gray-800">
                    {order.customers.customerName}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 font-semibold">
                    <span
                      className={`${
                        order.orderStatus === "Paid"
                          ? "text-green-600"
                          : order.orderStatus === "Pending"
                          ? "text-orange-500"
                          : "text-red-600"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  {/* Items */}
                  <td className="px-6 py-4 text-gray-700">
                    {order.items.join(", ")}
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    ${order.transaction.total.toFixed(2)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-3">

                      {/* VIEW BUTTON */}
                      <Link to={`/admin/orders/detail/${order.id_order}`}>
                        <button className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition">
                          <HiEye size={18} />
                        </button>
                      </Link>


                      {/* DELETE BUTTON */}
                      <button className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition">
                        <HiTrash size={18} />
                      </button>

                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default OrdersPage;
