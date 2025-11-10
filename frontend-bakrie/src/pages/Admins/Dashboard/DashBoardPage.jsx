import React from "react";
import StatCard from "../../../components/dashboard/StatCard";
import LatestOrders from "../../../components/dashboard/LatestOrders";
import TopSelling from "../../../components/dashboard/TopSelling";
import CustomerStats from "../../../components/dashboard/CustomerStat";
import {
  HiTrendingUp,
  HiShoppingCart,
  HiCurrencyDollar,
} from "react-icons/hi";

const DashBoardPage = () => {
  return (
    <div className="min-h-screen w-full bg-ookay/20 py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* ===== Header ===== */}
        <header>
          <h1 className="text-4xl font-bold text-yes mb-2">Sales Overview</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Dashboard summary for revenue, sales, and performance insights.
          </p>
        </header>

        {/* ===== Top Stats Cards ===== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Revenue"
            value="$21,827.13"
            percentage="+11.4%"
            positive
            icon={HiCurrencyDollar}
          />
          <StatCard
            title="Orders"
            value="1,758"
            percentage="-3.2%"
            positive={false}
            icon={HiShoppingCart}
          />
          <StatCard
            title="Purchases"
            value="$7,249.31"
            percentage="+5.7%"
            positive
            icon={HiTrendingUp}
          />
          <StatCard
            title="Profit Margin"
            value="62%"
            percentage="+1.9%"
            positive
            icon={HiTrendingUp}
          />
        </section>

        {/* ===== Middle Section: Orders & Top Selling ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Latest Orders - kiri (lebih lebar) */}
          <div className="lg:col-span-2">
            <LatestOrders />
          </div>

          {/* Top Selling - kanan */}
          <div>
            <TopSelling />
          </div>
        </section>

        {/* ===== Customer Stats Section ===== */}
        <section>
          <CustomerStats />
        </section>
      </div>
    </div>
  );
};

export default DashBoardPage;
