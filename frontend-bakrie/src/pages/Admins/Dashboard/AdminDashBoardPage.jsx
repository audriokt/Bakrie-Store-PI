import React, { useState } from "react";
import { motion } from "framer-motion";

import StatCard from "../../../components/dashboard/StatCard";
import LatestOrders from "../../../components/dashboard/LatestOrders";
import TopSelling from "../../../components/dashboard/TopSelling";
import CustomerStats from "../../../components/dashboard/CustomerStat";

import {
  HiShoppingCart,
  HiCurrencyDollar,
  HiUserGroup,
  HiClipboardList,
} from "react-icons/hi";

const AdminDashBoardPage = () => {
  const dummySummary = {
    todayRevenue: 12500000,
    totalOrders: 320,
    totalCustomers: 145,
    pendingOrders: 12,
    todayOrders: [
      { id: 1, customer: "Budi Santoso", total: 250000, status: "Paid", date: "2025-12-16" },
      { id: 2, customer: "Siti Aminah", total: 175000, status: "Pending", date: "2025-12-16" },
      { id: 3, customer: "Andi Wijaya", total: 980000, status: "Paid", date: "2025-12-16" },
    ],
    topTenProductsSell: [
      { id: 1, product_name: "Produk A", totalSold: 120 },
      { id: 2, product_name: "Produk B", totalSold: 95 },
      { id: 3, product_name: "Produk C", totalSold: 80 },
      { id: 4, product_name: "Produk D", totalSold: 65 },
    ],
  };

  const [summary] = useState(dummySummary);

  return (
    <div className="space-y-6"> {/* DARI 10 → 6 BIAR RAPAT */}
      
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-pink-50 to-red-50 rounded-3xl p-8 shadow"
      >
        <h1 className="text-4xl font-extrabold text-red-600">Sales Overview</h1>
        <p className="text-gray-600 mt-1">Dashboard summary for today</p>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> 
        {/* DARI gap-6 → gap-4 */}
        <StatCard
          title="Today's Revenue"
          value={`Rp ${summary.todayRevenue.toLocaleString("id-ID")}`}
          percentage="+11.4%"
          positive
          icon={HiCurrencyDollar}
        />
        <StatCard
          title="Total Orders"
          value={summary.totalOrders}
          percentage="+8.2%"
          positive
          icon={HiShoppingCart}
        />
        <StatCard
          title="Total Customers"
          value={summary.totalCustomers}
          percentage="+5.7%"
          positive
          icon={HiUserGroup}
        />
        <StatCard
          title="Pending Orders"
          value={summary.pendingOrders}
          percentage="Attention"
          positive={false}
          icon={HiClipboardList}
        />
      </div>

      {/* Orders & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4"> 
        {/* DARI gap-8 → gap-4 */}
        <div className="lg:col-span-2">
          <LatestOrders todayOrders={summary.todayOrders} />
        </div>
        <TopSelling products={summary.topTenProductsSell} />
      </div>

      {/* Customers */}
      <CustomerStats customers={summary.totalCustomers} />
    </div>
  );
};

export default AdminDashBoardPage;
