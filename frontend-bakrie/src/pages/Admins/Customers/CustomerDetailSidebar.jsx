import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

const CustomerDetailSidebar = ({ customer, isOpen, onClose }) => {
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
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-yes">Customer Detail</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <HiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Profile di tengah */}
              <div className="flex flex-col items-center text-center gap-3">
                <img
                  src={customer?.avatar}
                  alt={customer?.username}
                  className="w-20 h-20 rounded-full object-cover shadow"
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {customer?.username}
                </h3>
                <p className="text-sm text-gray-500">{customer?.email}</p>
              </div>

              {/* Data detail ke bawah */}
              <div className="space-y-4">
                <div>
                  <span className="block text-xs text-gray-500">Phone</span>
                  <span className="text-sm font-medium text-gray-800">
                    {customer?.phone}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">Address</span>
                  <span className="text-sm font-medium text-gray-800">
                    {customer?.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Close
              </button>
              <button className="px-4 py-2 rounded-lg bg-yes text-white hover:bg-yes/90 transition">
                Edit
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomerDetailSidebar;
