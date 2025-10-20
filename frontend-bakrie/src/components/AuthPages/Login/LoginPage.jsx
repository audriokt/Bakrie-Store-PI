import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex h-screen bg-ookay">
      {/* Panel kiri (Form Login) */}
      <motion.div
        className="flex flex-col justify-center items-center bg-white rounded-r-[40px] w-[40%]"
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
        <form className="flex flex-col space-y-4 w-3/4">
          <div>
            <label className="block text-sm text-red-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm text-red-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <motion.button
            whileFocus={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-red-600 text-white rounded-full py-2 mt-2 hover:bg-red-700 transition"
          >
            Login
          </motion.button>
        </form>

        <Link to="/signup" className="text-red-700 text-sm underline mt-4">
          Sign Up
        </Link>
      </motion.div>
      
 {/* Panel kanan (Video Animasi Kecil) */}
      <div className="relative w-[45%] flex justify-center items-center">
        <motion.video
          className="w-[70%] h-auto object-contain drop-shadow-lg rounded-xl"
          autoPlay
          muted
          loop
          playsInline
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <source src="/logo/baker-animation.mp4" type="video/mp4" />
        </motion.video>

        {/* Overlay lembut agar menyatu dengan pink */}
        <div className="absolute inset-0 bg-pink-100/60 mix-blend-soft-light rounded-xl"></div>
      </div>

    </div>
  );
};

export default LoginPage;
