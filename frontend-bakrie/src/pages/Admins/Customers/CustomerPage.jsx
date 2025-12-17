// src/pages/admin/customer/CustomerPage.js
import React, { useEffect, useState, useMemo } from "react";
import { HiSearch, HiChevronUp, HiChevronDown } from "react-icons/hi";
import { motion } from "framer-motion";

import CustomerStats from "../../../components/dashboard/CustomerStat";
import CustomerDetailSidebar from "./CustomerDetailSidebar";

// ✅ Dummy data
import { getDummyCustomers } from "../../../data/dummyCustomers";

const ITEMS_PER_PAGE = 10;

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setCustomers(getDummyCustomers());
  }, []);

  // Filter
  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return customers;
    const q = searchQuery.toLowerCase();
    return customers.filter(
      (c) =>
        (c.username || "").toLowerCase().includes(q) ||
        (c.email || "").toLowerCase().includes(q)
    );
  }, [customers, searchQuery]);

  // Sort
  const sortedCustomers = useMemo(() => {
    if (!sortConfig.key) return filteredCustomers;
    return [...filteredCustomers].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];
      if (sortConfig.key.includes("at")) {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredCustomers, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedCustomers.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedCustomers, currentPage]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1);
  };

  const handleView = (customer) => {
    setSelectedCustomer({
      id: customer.customer_id,
      username: customer.username,
      email: customer.email,
      phone: customer.phone_num || "-",
      address: customer.address || "-",
      avatar:
        customer.img_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.username)}&background=FEE7E7&color=C31D1D&size=128`,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    });
    setIsSidebarOpen(true);
  };

  const sortIcon = (key) =>
    sortConfig.key === key ? (
      sortConfig.direction === "asc" ? (
        <HiChevronUp className="inline w-4 h-4 ml-1" />
      ) : (
        <HiChevronDown className="inline w-4 h-4 ml-1" />
      )
    ) : null;

  return (
    <div className="pt-32 px-8 pb-10 bg-gray-50 min-h-screen">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-red-600 mb-6"
      >
        Customer Management
      </motion.h1>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search customer..."
          className="w-full pl-11 pr-4 py-3 rounded-full border focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Stats */}
      <CustomerStats customers={customers} />

      {/* Table */}
      <div className="bg-white rounded-2xl shadow mt-6 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-red-50 text-gray-700">
            <tr>
              <th className="px-6 py-4">Profile</th>
              <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort("username")}>
                Username {sortIcon("username")}
              </th>
              <th className="px-6 py-4 cursor-pointer" onClick={() => handleSort("email")}>
                Email {sortIcon("email")}
              </th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((c) => (
                <tr key={c.customer_id} className="border-t hover:bg-red-50 transition">
                  <td className="px-6 py-4">
                    <img
                      src={c.img_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.username)}`}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{c.username}</td>
                  <td className="px-6 py-4">{c.email}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleView(c)}
                      className="px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-10 text-center text-gray-400">
                  No customer found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-4 py-2 rounded-full ${
                currentPage === idx + 1 ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}

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
