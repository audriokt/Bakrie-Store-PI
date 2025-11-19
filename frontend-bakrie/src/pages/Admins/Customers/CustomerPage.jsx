import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "flowbite-react";
import { HiSearch } from "react-icons/hi";
import CustomerStats from "../../../components/dashboard/CustomerStat";
import { fetchCustomers } from "../../../services/customerService";
import CustomerDetailSidebar from "./CustomerDetailSidebar"; 

const CustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dummyCustomers = [
    {
      id: 1,
      username: "diraaa",
      email: "diraaa@mail.com",
      phone: "08123456789",
      address: "Jakarta Selatan",
      avatar: "https://ui-avatars.com/api/?name=D&background=FEE7E7&color=C31D1D",
    },
    {
      id: 2,
      username: "andika",
      email: "andika@mail.com",
      phone: "08212345678",
      address: "Depok",
      avatar: "https://ui-avatars.com/api/?name=A&background=FEE7E7&color=C31D1D",
    },
    {
      id: 3,
      username: "siti",
      email: "siti@mail.com",
      phone: "08561234567",
      address: "Jakarta Barat",
      avatar: "https://ui-avatars.com/api/?name=S&background=FEE7E7&color=C31D1D",
    },
  ];

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await fetchCustomers();
        setCustomers(response.data || dummyCustomers);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
        setCustomers(dummyCustomers);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setIsSidebarOpen(true);
  };

  if (loading)
    return <div className="p-6 text-center text-gray-600">Loading customers...</div>;

  return (
    <div className="pt-32 px-8 lg:px-12 pb-10 bg-ookay/20 min-h-screen relative">
      {/* Title + search */}
      <div className="flex items-center justify-between mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-3xl lg:text-4xl font-extrabold text-yes"
        >
          Customer Management
        </motion.h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Search username, email..."
            className="pl-10 pr-4 py-2 rounded-lg border border-ookay bg-white text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-yes/30"
          />
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-yes w-5 h-5" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 mb-8">
        <CustomerStats customers={customers} />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-2xl shadow border border-ookay overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-ookay/40 text-yes text-xs uppercase tracking-wide">
              <tr>
                <th className="px-6 py-3">Profile</th>
                <th className="px-6 py-3">Username</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ backgroundColor: "#FFF5F5" }}
                  className="border-t last:border-none"
                >
                  <td className="px-6 py-4">
                    <img
                      src={c.avatar}
                      alt={c.username}
                      className="w-10 h-10 rounded-full object-cover shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{c.username}</td>
                  <td className="px-6 py-4 text-gray-700">{c.email}</td>
                  <td className="px-6 py-4 text-gray-700">{c.phone}</td>
                  <td className="px-6 py-4 text-gray-700">{c.address}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleView(c)}
                      className="px-3 py-1 rounded-lg bg-yes/10 text-yes text-sm font-medium border border-yes/20 hover:bg-yes/20 transition"
                    >
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="mt-4 text-xs text-gray-500">
        * Data shown is demo data. Connect to your API to show live customers.
      </div>

      {/* Integrasi Sidebar */}
      <CustomerDetailSidebar
        customer={selectedCustomer}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  );
};

export default CustomerPage;
