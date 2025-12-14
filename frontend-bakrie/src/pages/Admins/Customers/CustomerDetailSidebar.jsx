import React from "react";
import {  AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

const CustomerDetailSidebar = ({ customer, isOpen, onClose }) => {
    if (!customer) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.div
                        className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-yes">Customer Detail</h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                            >
                                <HiX className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
                            {/* Profile Section */}
                            <div className="flex flex-col items-center text-center">
                                <img
                                    src={customer.avatar}
                                    alt={customer.username}
                                    className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-yes/20"
                                />
                                <h3 className="mt-4 text-xl font-bold text-gray-900">
                                    {customer.username}
                                </h3>
                                <p className="text-sm text-gray-500">{customer.email}</p>
                            </div>

                            <div className="space-y-5">
                                <div>
                  <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </span>
                                    <p className="mt-1 text-base text-gray-800">{customer.phone}</p>
                                </div>

                                <div>
                  <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </span>
                                    <p className="mt-1 text-base text-gray-800">{customer.address}</p>
                                </div>

                                <div>
                  <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Member Since
                  </span>
                                    <p className="mt-1 text-base text-gray-800">
                                        {customer.created_at
                                            ? new Date(customer.created_at).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })
                                            : "-"}
                                    </p>
                                </div>

                                <div>
                  <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </span>
                                    <p className="mt-1 text-base text-gray-800">
                                        {customer.updated_at
                                            ? new Date(customer.updated_at).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })
                                            : "-"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-5 border-t border-gray-200 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                            >
                                Close
                            </button>
                            {/* Tombol Edit bisa ditambahkan nanti jika ada fitur edit customer */}
                            {/* <button className="px-5 py-2.5 rounded-lg bg-yes text-white hover:bg-yes/90 transition">
                Edit Profile
              </button> */}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CustomerDetailSidebar;