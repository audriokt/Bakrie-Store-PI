import React from "react";
import LatestOrders from "../../../components/dashboard/LatestOrders";

const OrderListPage = () => {
  const dummyOrders = [
    { id: 1, customer: "Budi Santoso", total: 250000, status: "Waiting", date: "2025-12-16" },
    { id: 2, customer: "Siti Aminah", total: 175000, status: "Waiting", date: "2025-12-16" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-3xl p-8 shadow">
        <h1 className="text-4xl font-extrabold text-red-600">Order List</h1>
        <p className="text-gray-600 mt-1">All incoming orders</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <LatestOrders todayOrders={dummyOrders} />
      </div>
    </div>
  );
};

export default OrderListPage;
