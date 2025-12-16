import React, { useState, useEffect, useMemo } from "react";
import { HiSearch, HiChevronUp, HiChevronDown } from "react-icons/hi";
import { getCustomers } from "../../../services/adminDashboardService";
import CustomerStats from "../../../components/dashboard/CustomerStat";
import CustomerDetailSidebar from "./CustomerDetailSidebar";

const ITEMS_PER_PAGE = 10;

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const data = await getCustomers();
                setCustomers(data || []);
            } catch (error) {
                console.error("Failed to fetch customers:", error);
            } finally {
                setLoading(false);
            }
        };
        loadCustomers();
    }, []);

    // Filtered by search
    const filteredCustomers = useMemo(() => {
        if (!searchQuery.trim()) return customers;

        const query = searchQuery.toLowerCase();
        return customers.filter((c) => {
            const username = (c.username || "").toLowerCase();
            const email = (c.email || "").toLowerCase();
            return username.includes(query) || email.includes(query);
        });
    }, [customers, searchQuery]);

    // Sorted
    const sortedCustomers = useMemo(() => {
        if (!sortConfig.key) return filteredCustomers;

        const sorted = [...filteredCustomers].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Khusus created_at (Timestamp → Date)
            if (sortConfig.key === "created_at") {
                aValue = new Date(a.created_at);
                bValue = new Date(b.created_at);
            }

            if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });

        return sorted;
    }, [filteredCustomers, sortConfig]);

    // Paginated
    const paginatedCustomers = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return sortedCustomers.slice(start, end);
    }, [sortedCustomers, currentPage]);

    const totalPages = Math.ceil(sortedCustomers.length / ITEMS_PER_PAGE);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction:
                prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
        setCurrentPage(1); // reset ke halaman 1 saat sort
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? (
            <HiChevronUp className="inline w-4 h-4" />
        ) : (
            <HiChevronDown className="inline w-4 h-4" />
        );
    };

    const handleView = (customer) => {
        const transformed = {
            id: customer.customer_id,
            username: customer.username || "Unknown",
            email: customer.email,
            phone: customer.phone_num || "-",
            address: customer.address || "-",
            avatar:
                customer.img_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    customer.username || "U"
                )}&background=FEE7E7&color=C31D1D&size=128`,
            created_at: customer.created_at,
            updated_at: customer.updated_at,
        };
        setSelectedCustomer(transformed);
        setIsSidebarOpen(true);
    };

    if (loading) {
        return (
            <div className="pt-32 px-8 lg:px-12 min-h-screen bg-ookay/20 flex items-center justify-center">
                <p className="text-lg text-gray-600">Loading customers...</p>
            </div>
        );
    }

    return (
        <div className="pt-32 px-8 lg:px-12 pb-10 bg-ookay/20 min-h-screen relative">
            {/* Title + Search */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <motion.h1
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl lg:text-4xl font-extrabold text-yes"
                >
                    Customer Management
                </motion.h1>

                <div className="relative w-full sm:w-96">
                    <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-yes w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by username or email..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-10 pr-10 py-3 rounded-lg border border-ookay bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yes/40"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setCurrentPage(1);
                            }}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-6 mb-8">
                <CustomerStats customers={customers} />
            </div>

            {/* Search Result Info */}
            {searchQuery && (
                <p className="mb-4 text-sm text-gray-600">
                    Showing <strong>{sortedCustomers.length}</strong> result(s) for "
                    <span className="text-yes">{searchQuery}</span>"
                </p>
            )}

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow border border-ookay overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-ookay/40 text-yes text-xs uppercase tracking-wide">
                        <tr>
                            <th className="px-6 py-4">Profile</th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:bg-ookay/60 transition"
                                onClick={() => handleSort("username")}
                            >
                                Username {getSortIcon("username")}
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:bg-ookay/60 transition"
                                onClick={() => handleSort("email")}
                            >
                                Email {getSortIcon("email")}
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:bg-ookay/60 transition"
                                onClick={() => handleSort("phone_num")}
                            >
                                Phone {getSortIcon("phone_num")}
                            </th>
                            <th className="px-6 py-4">Address</th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:bg-ookay/60 transition"
                                onClick={() => handleSort("created_at")}
                            >
                                Join Date {getSortIcon("created_at")}
                            </th>
                            <th className="px-6 py-4 text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginatedCustomers.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-16 text-center text-gray-500">
                                    {searchQuery
                                        ? "No customers found matching your search."
                                        : "No customers available."}
                                </td>
                            </tr>
                        ) : (
                            paginatedCustomers.map((c, i) => (
                                <motion.tr
                                    key={c.customer_id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.03 }}
                                    whileHover={{ backgroundColor: "#FFF5F5" }}
                                    className="border-t last:border-none"
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={
                                                c.img_url ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                    c.username || "U"
                                                )}&background=FEE7E7&color=C31D1D&size=128`
                                            }
                                            alt={c.username}
                                            className="w-10 h-10 rounded-full object-cover shadow-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {c.username || "-"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{c.email}</td>
                                    <td className="px-6 py-4 text-gray-700">{c.phone_num || "-"}</td>
                                    <td className="px-6 py-4 text-gray-700">{c.address || "-"}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {c.created_at
                                            ? new Date(c.created_at).toLocaleDateString("id-ID")
                                            : "-"}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => handleView(c)}
                                            className="px-4 py-2 rounded-lg bg-yes/10 text-yes text-sm font-medium border border-yes/20 hover:bg-yes/20 transition"
                                        >
                                            View Detail
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-ookay/30 bg-ookay/10">
                        <p className="text-sm text-gray-600">
                            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> (
                            {sortedCustomers.length} total)
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg bg-white border border-ookay text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ookay/20 transition"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg bg-white border border-ookay text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-ookay/20 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Sidebar */}
            <CustomerDetailSidebar
                customer={selectedCustomer}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </div>
    );
};

export default CustomerPage;