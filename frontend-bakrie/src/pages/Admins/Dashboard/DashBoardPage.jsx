import React from "react";
import StatCard from "../../../components/dashboard/StatCard";
import LatestOrders from "../../../components/dashboard/LatestOrders";
import TopSelling from "../../../components/dashboard/TopSelling";
import CustomerStats from "../../../components/dashboard/CustomerStat";
import { HiTrendingUp, HiShoppingCart, HiCurrencyDollar } from "react-icons/hi";

const DashBoardPage = () => {
  return (
    <div className="p-12 bg-white min-h-screen">
      {/* Judul */}
      <h1 className="text-3xl font-bold text-yes mb-10">
        Sales Overview
      </h1>

      {/* Row 1: Statistik atas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
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
      </div>

      {/* Row 2: LatestOrders (besar) & TopSelling (sedang) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mb-10">
        {/* Latest Orders lebih besar (2 kolom) */}
        <div className="lg:col-span-2 h-[360px]">
          <LatestOrders />
        </div>

        {/* Top Selling lebih kecil di kanan */}
        <div className="h-[360px]">
          <TopSelling />
        </div>
      </div>

      {/* Row 3: Customer Stats (3 kecil bawah) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CustomerStats />
      </div>
    </div>
  );  
};

export default DashBoardPage;
