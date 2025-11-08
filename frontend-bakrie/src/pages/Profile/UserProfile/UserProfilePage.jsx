import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-100px)] bg-[#FFF8F8] px-6 md:px-10 pt-28 pb-10 mt-10">
      {/* Main content */}
      <main className="flex flex-col md:flex-row gap-10 w-full max-w-6xl">
        {/* Left Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center bg-white shadow-lg rounded-3xl p-10 md:w-1/3 w-full"
        >
          {/* Profile Photo */}
          <div className="relative mb-8">
            <img
              src="https://i.pinimg.com/736x/e0/97/a7/e097a7826127764391f21dbb511ba437.jpg"
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-[#FFECEC]"
            />
            {/* Icon edit dipindah ke kiri bawah */}
            <button
              title="Edit Profile Picture"
              className="absolute bottom-2 right-2 w-9 h-9 flex items-center justify-center bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md transition"
            >
              ✎
            </button>
          </div>

          {/* Buttons */}
          <Link to="/edit-profile" className="w-full">
           <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full bg-red-600 text-white py-3 rounded-full font-semibold mb-4 shadow-sm hover:bg-red-700 transition"
          >
            Edit Profile
          </motion.button>
          </Link>
          <Link to="/edit-password" className="w-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full bg-white text-red-600 border border-red-600 py-3 rounded-full font-semibold mb-4 hover:bg-red-600 hover:text-white transition"
          >
            Change Password
          </motion.button>

          </Link>
         <Link to="/" className="w-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full bg-[#FFB6B6] text-white py-3 rounded-full font-semibold hover:bg-red-600 transition"
          >
            Logout
          </motion.button>
         </Link>
        </motion.div>

        {/* Right Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex-1 bg-white shadow-lg rounded-3xl p-12 md:w-1/3 w-full"
        >
          <h2 className="text-2xl font-bold text-red-600 border-b-2 border-red-300 pb-3 mb-8 text-center md:text-left">
            My Profile
          </h2>

          {/* Profile Info */}
          <div className="space-y-6 text-sm md:text-base">
            <div className="flex flex-col border-b border-red-100 pb-3">
              <label className="text-red-700 font-semibold mb-1">Username</label>
              <span className="text-gray-800 font-medium">John Doe</span>
            </div>

            <div className="flex flex-col border-b border-red-100 pb-3">
              <label className="text-red-700 font-semibold mb-1">Email</label>
              <span className="text-gray-800 font-medium">
                john@example.com
              </span>
            </div>

            <div className="flex flex-col border-b border-red-100 pb-3">
              <label className="text-red-700 font-semibold mb-1">Phone Number</label>
              <span className="text-gray-800 font-medium">
                +62 812 3456 7890
              </span>
            </div>

            <div className="flex flex-col border-b border-red-100 pb-3">
              <label className="text-red-700 font-semibold mb-1">Address</label>
              <span className="text-gray-800 font-medium leading-relaxed">
                Jl. Mawar No. 12, Bandung
              </span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;
