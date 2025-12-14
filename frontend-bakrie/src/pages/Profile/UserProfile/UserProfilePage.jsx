import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js"
import Swal from "sweetalert2";
import Loading from "../../../components/loader/Loading";

const ProfilePage = () => {
  const { user, logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = () => {
    logout(); 
    Swal.fire({
      title: "Logout Successful",
      text: "You have successfully logged out.",
      icon: "success",
      confirmButtonText: "Ok",
      confirmButtonColor: "#C31D1D"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/"); 
      }
    })
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] bg-[#FFF8F8] pt-28 pb-10">
        <Loading />
      </div>
    );
  }

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
              src={user.img_url || "defaultProfile/default_profile.png"}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-[#FFECEC]"
            />
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
            onClick={handleLogout}
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
              <span className="text-gray-800 font-medium">{user.username}</span>
            </div>

            <div className="flex flex-col border-b border-red-100 pb-3">
              <label className="text-red-700 font-semibold mb-1">Email</label>
              <span className="text-gray-800 font-medium">
                {user.email}
              </span>
            </div>

            <div className="flex flex-col border-b border-red-100 pb-3">
              <label className="text-red-700 font-semibold mb-1">Phone Number</label>
              <span className="text-gray-800 font-medium">
                {user.phone_num}
              </span>
            </div>

            <div className="flex flex-col border-b border-red-100 pb-3">
              <label className="text-red-700 font-semibold mb-1">Address</label>
              <span className="text-gray-800 font-medium leading-relaxed">
                {user.address}
              </span>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProfilePage;
