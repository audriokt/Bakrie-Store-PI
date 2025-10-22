import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-ookay">
      {/* Container utama */}
      <div className="flex bg-white rounded-[40px] shadow-2xl overflow-hidden w-[80%] max-w-5xl">
        {/* Bagian kiri: form login */}
        <motion.div
          className="flex flex-col justify-center items-center w-[50%] px-10 py-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo dan teks */}
          <img src="./logo/login.svg" alt="Logo" className="w-32 mb-2" />
          <p className="text-red-600 text-sm mb-6">
            Sign in to your account here!
          </p>

          {/* Form login */}
          <form className="space-y-4 w-full max-w-sm">
            <div>
              <label className="block text-sm text-red-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-red-500 rounded-md py-3 px-4 
                          focus:outline-none focus:ring-2 focus:ring-red-400 
                          text-gray-700 placeholder-gray-400"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="block text-sm text-red-700 mb-2 font-medium">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-red-500 rounded-md py-3 px-4 
                          focus:outline-none focus:ring-2 focus:ring-red-400 
                          text-gray-700 placeholder-gray-400"
                placeholder="Password"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-full 
                hover:bg-red-700 transition-all duration-200 font-semibold shadow-md"
            >
              Login
            </motion.button>
          </form>

          <Link
            to="/signup"
            className="text-red-700 text-sm underline mt-4 hover:text-red-800"
          >
            Sign Up
          </Link>
        </motion.div>

        {/* Bagian kanan: animasi video */}
        <div className="w-[50%] bg-pink-50 flex justify-center items-center">
          <motion.video
            className="w-[80%] h-auto object-contain drop-shadow-lg rounded-2xl"
            autoPlay
            muted
            loop
            playsInline
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <source src="/logo/baker-animation.mp4" type="video/mp4" />
          </motion.video>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
