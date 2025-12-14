// src/pages/admin/EmployeesPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import { HiSearch, HiChevronUp, HiChevronDown, HiPlus, HiPencilAlt, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import api from "../../../services/adminDashboardService.js";

const ITEMS_PER_PAGE = 10;

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    // Fetch employees
    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const data = await api.get("/employees");
                setEmployees(data || []);
            } catch (error) {
                console.error("Failed to fetch employees:", error);
            } finally {
                setLoading(false);
            }
        };
        loadEmployees();
    }, []);

    // Search filter
    const filteredEmployees = useMemo(() => {
        if (!searchQuery.trim()) return employees;
        const q = searchQuery.toLowerCase();
        return employees.filter((e) => {
            const name = (e.username || "").toLowerCase();
            const email = (e.email || "").toLowerCase();
            return name.includes(q) || email.includes(q);
        });
    }, [employees, searchQuery]);

    // Sorting
    const sortedEmployees = useMemo(() => {
        if (!sortConfig.key) return filteredEmployees;

        return [...filteredEmployees].sort((a, b) => {
            let aVal = a[sortConfig.key];
            let bVal = b[sortConfig.key];

            if (sortConfig.key === "created_at") {
                aVal = new Date(a.created_at);
                bVal = new Date(b.created_at);
            }

            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredEmployees, sortConfig]);

    // Pagination
    const paginated = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedEmployees.slice(start, start + ITEMS_PER_PAGE);
    }, [sortedEmployees, currentPage]);

    const totalPages = Math.ceil(sortedEmployees.length / ITEMS_PER_PAGE);

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
        setCurrentPage(1);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? (
            <HiChevronUp className="inline w-4 h-4 ml-1" />
        ) : (
            <HiChevronDown className="inline w-4 h-4 ml-1" />
        );
    };

    const handleDelete = (emp) => {
        setEmployeeToDelete(emp);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!employeeToDelete) return;
        try {
            await api.delete(`/employees/${employeeToDelete.employee_id}`);
            setEmployees((prev) =>
                prev.filter((e) => e.employee_id !== employeeToDelete.employee_id)
            );
            setShowDeleteModal(false);
            setEmployeeToDelete(null);
        } catch (error) {
            console.error("Failed to delete employee:", error);
            alert("Gagal menghapus karyawan.");
        }
    };

    if (loading) {
        return (
            <div className="pt-32 px-8 lg:px-12 min-h-screen bg-ookay/20 flex items-center justify-center">
                <p className="text-lg text-gray-600">Loading employees...</p>
            </div>
        );
    }

    return (
        <div className="pt-32 px-8 lg:px-12 pb-10 bg-ookay/20 min-h-screen">
            {/* Header */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 gap-6">
                <motion.h1
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl lg:text-4xl font-extrabold text-yes"
                >
                    Employee Management
                </motion.h1>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    {/* Search */}
                    <div className="relative w-full sm:w-96">
                        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-yes w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search name or email..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // Fixed: arrow function tanpa parameter salah
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

                    {/* Add Button */}
                    <Link to="/admin/employees/add">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-yes text-white rounded-lg font-medium shadow hover:bg-yes/90 transition"
                        >
                            <HiPlus className="w-5 h-5" />
                            Add Employee
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Search Info */}
            {searchQuery && (
                <p className="mb-4 text-sm text-gray-600">
                    Showing <strong>{sortedEmployees.length}</strong> result(s) for "
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
                            <th className="px-6 py-4">Avatar</th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:bg-ookay/60 transition"
                                onClick={() => handleSort("username")}
                            >
                                Name {getSortIcon("username")}
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:bg-ookay/60 transition"
                                onClick={() => handleSort("email")}
                            >
                                Email {getSortIcon("email")}
                            </th>
                            <th
                                className="px-6 py-4 cursor-pointer hover:bg-ookay/60 transition"
                                onClick={() => handleSort("created_at")}
                            >
                                Joined {getSortIcon("created_at")}
                            </th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-16 text-center text-gray-500 italic">
                                    {searchQuery ? "No employees found." : "No employees yet."}
                                </td>
                            </tr>
                        ) : (
                            paginated.map((e) => (
                                <motion.tr
                                    key={e.employee_id}
                                    whileHover={{ backgroundColor: "#FFF5F5" }}
                                    className="border-t last:border-none"
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={
                                                e.img_url ||
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                    e.username || "E"
                                                )}&background=FEE7E7&color=C31D1D&size=128`
                                            }
                                            alt={e.username}
                                            className="w-12 h-12 rounded-full object-cover shadow-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {e.username || "-"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{e.email}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {e.created_at
                                            ? new Date(e.created_at).toLocaleDateString("id-ID")
                                            : "-"}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <Link
                                                to={`/admin/employees/edit/${e.employee_id}`}
                                                state={{ employee: e }}  // PASS DATA LANGSUNG
                                                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                                            >
                                                <HiPencilAlt className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(e)}
                                                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                                            >
                                                <HiTrash className="w-4 h-4" />
                                            </button>
                                        </div>
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
                            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
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

            {/* Delete Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-bold text-yes mb-4">Delete Employee?</h3>
                            <p className="text-gray-700 mb-6">
                                Are you sure want to delete <strong>{employeeToDelete?.username}</strong>?
                                <br />
                                <span className="text-sm text-gray-500">This action cannot be undone.</span>
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EmployeesPage;