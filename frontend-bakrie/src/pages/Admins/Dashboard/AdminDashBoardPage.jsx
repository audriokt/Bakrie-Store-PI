import React, { useState, useEffect } from "react";
import StatCard from "../../../components/dashboard/StatCard";
import LatestOrders from "../../../components/dashboard/LatestOrders";
import TopSelling from "../../../components/dashboard/TopSelling";
import CustomerStats from "../../../components/dashboard/CustomerStat";
import {
    HiTrendingUp,
    HiShoppingCart,
    HiCurrencyDollar,
    HiUserGroup, HiClipboardList,
} from "react-icons/hi";
import api from "../../../services/adminDashboardService";

const AdminDashBoardPage = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await api.get("/dashboard");
                setSummary(data);
                console.log("Summary:", summary);
            } catch (err) {
                console.error("Failed to load dashboard:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    if (loading) {
        return <div className="p-10 text-center">Loading dashboard...</div>;
    }

    if (!summary) {
        return <div className="p-10 text-center text-red-600">Failed to load data</div>;
    }

    return (
        <div className="min-h-screen w-full bg-ookay/20 py-10 px-6 md:px-10">
            <div className="max-w-7xl mx-auto space-y-10">
                <header>
                    <h1 className="text-4xl font-bold text-yes mb-2">Sales Overview</h1>
                    <p className="text-gray-600">
                        Dashboard summary for revenue, sales, and performance insights.
                    </p>
                </header>

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Today's Revenue"
                        value={`Rp ${(summary.todayRevenue || 0).toLocaleString("id-ID")}`}
                        percentage="+11.4%"
                        positive
                        icon={HiCurrencyDollar}
                    />
                    <StatCard
                        title="Total Orders"
                        value={summary.totalOrders || 0}
                        percentage="+8.2%"
                        positive
                        icon={HiShoppingCart}
                    />
                    <StatCard
                        title="Total Customers"
                        value={summary.totalCustomers || 0}
                        percentage="+5.7%"
                        positive
                        icon={HiUserGroup}
                    />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <LatestOrders todayOrders = {summary.todayOrders}/>
                    </div>
                    <div>
                        <TopSelling products = {summary.topTenProductsSell}/>
                    </div>
                </section>

                <section>
                    <CustomerStats />
                </section>
            </div>
        </div>
    );
};

export default AdminDashBoardPage;