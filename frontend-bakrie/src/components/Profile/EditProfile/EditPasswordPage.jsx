import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EditPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FFF5F5] pt-24 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-10 border border-[#FFDADA]"
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-red-600 text-xl mr-3 hover:scale-110 transition"
          >
            ←
          </button>
          <h2 className="text-lg font-bold text-red-600 tracking-wide">
            Change Password
          </h2>
        </div>

        <hr className="border-red-200 mb-6" />

        {/* Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-red-600 mb-1 text-left">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-red-600 mb-1 text-left">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full bg-red-600 text-white py-3 rounded-full font-semibold mt-6 hover:bg-red-700 transition shadow-md"
          >
            Save Password
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditPasswordPage;
