import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FFF5F5] pt-24 pb-10 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-10 border border-[#FFDADA]"
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
            Edit Profile
          </h2>
        </div>

        <hr className="border-red-200 mb-6" />

        {/* Form */}
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-red-600 mb-1 text-left">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-red-600 mb-1 text-left">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-red-600 mb-1 text-left">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="+62..."
              autoComplete="off"
              className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-red-600 mb-1 text-left">
              Address
            </label>
            <textarea
              rows="3"
              placeholder="Enter your address"
              className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none placeholder-gray-400"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full bg-red-600 text-white py-3 rounded-full font-semibold mt-6 hover:bg-red-700 transition shadow-md"
          >
            Save Changes
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProfilePage;
