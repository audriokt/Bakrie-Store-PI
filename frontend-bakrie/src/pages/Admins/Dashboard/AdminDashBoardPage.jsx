import React from "react";
import { useState, useEffect } from "react";
import StatCard from "../../../components/dashboard/StatCard.jsx";
import LatestOrders from "../../../components/dashboard/LatestOrders";
import TopSelling from "../../../components/dashboard/TopSelling";
import CustomerStats from "../../../components/dashboard/CustomerStat.jsx";
import {
    HiShoppingCart,
    HiCurrencyDollar,
    HiUserGroup,
    HiClipboardList,
} from "react-icons/hi";
import { motion } from "framer-motion";
import { getDashboard } from "../../../services/adminDashboardService.js"

const AdminDashBoardPage = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                setLoading(true);
                const { data } = await getDashboard();

                // Sesuaikan struktur sesuai response backend kamu
                // Contoh: jika backend return { success: true, data: { ... } }
                // maka ambil data.data
                setSummary(data.data || data);
            } catch (err) {
                console.error("Error fetching dashboard:", err);
                setError("Gagal memuat data dashboard. Pastikan backend berjalan.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);
    console.log(summary)
    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">Loading dashboard...</div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    // Jika data kosong
    if (!summary) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl text-gray-600">Tidak ada data dashboard.</div>
            </div>
        );
    }
    return (
        <div className="space-y-12">
                {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h1 className="text-4xl font-extrabold text-red-700 mb-2">
                    Sales Overview
                </h1>
                <p className="text-gray-600">
                    Dashboard summary for revenue, sales, and performance insights.
                </p>
            </motion.header>

            {/* Stat Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    percentage="..."
                    positive={false}
                    icon={HiClipboardList}
                />
            </section>

            {/* Orders & Top Selling */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                    <LatestOrders todayOrders={summary.todayOrders} />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <TopSelling products={summary.topTenProductsSell} />
                </div>
            </section>

            {/* Customers */}
            <section className="bg-white rounded-xl shadow-lg p-6">
                <CustomerStats customers={summary.totalCustomers} />
            </section>
        </div>
    );
};

export default AdminDashBoardPage;