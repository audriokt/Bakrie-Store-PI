import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-pink-100">
      {/* Container utama */}
      <div className="flex bg-white rounded-[40px] shadow-2xl overflow-hidden w-[80%] max-w-5xl">
        {/* Bagian kiri: form sign up */}
        <motion.div
          className="flex flex-col justify-center items-center w-[50%] px-10 py-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Judul */}
          <img src="./logo/signup.svg" alt="Logo" className="w-32 mb-2" />
          <p className="text-red-600 text-sm mb-6">
            Create your account here!
          </p>

          {/* Form signup */}
          <form className="space-y-4 w-full max-w-sm">
            <input
              type="text"
              placeholder="Username"
              className="w-full border border-red-500 rounded-md py-3 px-4 
                        focus:outline-none focus:ring-2 focus:ring-red-400 
                        text-gray-700 placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-red-500 rounded-md py-3 px-4 
                        focus:outline-none focus:ring-2 focus:ring-red-400 
                        text-gray-700 placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-red-500 rounded-md py-3 px-4 
                        focus:outline-none focus:ring-2 focus:ring-red-400 
                        text-gray-700 placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-red-500 rounded-md py-3 px-4 
                        focus:outline-none focus:ring-2 focus:ring-red-400 
                        text-gray-700 placeholder-gray-400"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-red-500 rounded-md py-3 px-4 
                        focus:outline-none focus:ring-2 focus:ring-red-400 
                        text-gray-700 placeholder-gray-400"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-full 
                hover:bg-red-700 transition-all duration-200 font-semibold shadow-md"
            >
              Register
            </motion.button>
          </form>

          <Link
            to="/login"
            className="text-red-700 text-sm underline mt-4 hover:text-red-800"
          >
            Back to Login
          </Link>
        </motion.div>

        {/* Bagian kanan: video animasi */}
        <div className="w-[50%] bg-pink-50 flex justify-center items-center relative">
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

          {/* Overlay lembut agar menyatu */}
          <div className="absolute inset-0 bg-pink-100/60 mix-blend-soft-light rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
