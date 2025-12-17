// src/pages/cashier/OrderConfirmationPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

// ===================================================
// ✅ DUMMY DATA (sementara untuk demo / preview)
// ===================================================
const dummyOrder = {
  orderNumber: "BK-1001",
  orderDate: "2024-11-01T09:30:00",
  customerName: "Alya Nirmala",
  items: [
    { name: "Cheese Croissant", qty: 2, price: 25 },
    { name: "Chocolate Muffin", qty: 1, price: 15 },
    { name: "Coffee Latte", qty: 1, price: 10 },
  ],
  total: 75,
  status: "Pending",
};

const OrderConfirmationPage = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    setIsConfirmed(true);

    // 🔹 PLACEHOLDER API
    // Di sini nanti bisa dipanggil API untuk:
    // - update status order
    // - catat transaksi / payment
    // Contoh:
    // await api.put(`/orders/${dummyOrder.id_order}/confirm`, { status: "Paid" });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow space-y-6"
      >
        <h1 className="text-3xl font-bold text-red-600">Confirm Order</h1>

        {/* Order Info */}
        <div className="space-y-2">
          <p><strong>Order Number:</strong> {dummyOrder.orderNumber}</p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(dummyOrder.orderDate).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p><strong>Customer:</strong> {dummyOrder.customerName}</p>
        </div>

        {/* Items Table */}
        <table className="w-full border-t border-b border-gray-200 mt-4">
          <thead>
            <tr className="text-left">
              <th className="py-2">Item</th>
              <th className="py-2 text-center">Qty</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {dummyOrder.items.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="py-2">{item.name}</td>
                <td className="py-2 text-center">{item.qty}</td>
                <td className="py-2 text-right">${item.price}</td>
                <td className="py-2 text-right">${item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-end items-center space-x-4 text-lg font-bold mt-4">
          <span>Total:</span>
          <span className="text-red-600">${dummyOrder.total}</span>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleConfirm}
            className={`px-6 py-3 rounded-xl text-white font-semibold ${
              isConfirmed ? "bg-green-400" : "bg-red-600 hover:bg-red-700"
            } transition-colors`}
            disabled={isConfirmed}
          >
            {isConfirmed ? "Confirmed ✔" : "Confirm & Pay"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderConfirmationPage;
