import React from "react";
import { motion } from "framer-motion";

import LatestOrders from "../../../components/dashboard/LatestOrders";
import OrderConfirmation from "../Orders/OrdersConfirmation";
import TransactionHistory from "../Transaction/TransactionHistoryPage";

const CashierDashboardPage = () => {
  const dummyData = {
    orderList: [
      { id: 1, customer: "Budi Santoso", total: 250000, status: "Waiting", date: "2025-12-16" },
      { id: 2, customer: "Siti Aminah", total: 175000, status: "Waiting", date: "2025-12-16" },
    ],
    confirmationList: [
      { id: 3, customer: "Andi Wijaya", total: 980000, status: "Need Confirmation", date: "2025-12-16" },
    ],
    transactionHistory: [
      { id: "TRX-001", customer: "Alya Nirmala", total: 185000, status: "Paid", date: "2025-12-15" },
      { id: "TRX-002", customer: "Riko Pratama", total: 92500, status: "Paid", date: "2025-12-14" },
    ],
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-pink-50 to-red-50 rounded-3xl p-8 shadow"
      >
        <h1 className="text-4xl font-extrabold text-red-600">Cashier Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage orders and transactions</p>
      </motion.div>

      {/* Order List */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Order List</h2>
        <LatestOrders todayOrders={dummyData.orderList} />
      </div>

      {/* Order Confirmation */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>
        <OrderConfirmation confirmationList={dummyData.confirmationList} />
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
        <TransactionHistory history={dummyData.transactionHistory} />
      </div>

    </div>
  );
};

export default CashierDashboardPage;
