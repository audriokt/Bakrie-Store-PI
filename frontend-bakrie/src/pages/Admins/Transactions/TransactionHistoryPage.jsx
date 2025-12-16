import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function TransactionDetailPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const transaction = state?.transaction;

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Transaction not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F9F9FC] px-4 md:px-8 py-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
        >
          <h1 className="text-2xl font-semibold text-gray-700">
            Transaction Detail
          </h1>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          >
            Back
          </button>
        </motion.div>

        {/* Transaction Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Info label="Transaction ID" value={transaction.id} />
          <Info label="Customer" value={transaction.customer_name} />
          <Info label="Date" value={transaction.date} />
          <Info label="Payment Method" value={transaction.payment_method} />
          <Info
            label="Status"
            value={transaction.status}
            highlight
          />
          <Info
            label="Total"
            value={`Rp ${Number(transaction.total).toLocaleString("id-ID")}`}
          />
        </motion.div>

        {/* Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow overflow-hidden"
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-700">
              Purchased Products
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left">Product</th>
                  <th className="px-6 py-4 text-center">Qty</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {transaction.items.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4 text-center">{item.qty}</td>
                    <td className="px-6 py-4 text-right">
                      Rp {item.price.toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold">
                      Rp {(item.qty * item.price).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

/* Reusable Info Item */
const Info = ({ label, value, highlight }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p
      className={`text-base font-semibold ${
        highlight ? "text-[#FF6781]" : "text-gray-700"
      }`}
    >
      {value}
    </p>
  </div>
);
