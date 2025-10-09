import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className="flex h-screen bg-pink-100">
      {/* Panel kiri */}
      <motion.div
        className="flex flex-col justify-center items-center bg-white rounded-r-[40px] w-[40%]"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <img src="./logo/signup.svg" alt="Logo" className="w-30 mb-2" />
       
        <p className="text-red-600 text-sm mb-6">Create your account here!</p>

        <form className="flex flex-col space-y-4 w-3/4">
          <input
            type="text"
            placeholder="Username"
            className="border border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="border border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="text"
            placeholder="Address"
            className="border border-red-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <motion.button
            whileHover={{scale: 1.05}}
            whileTap={{scale: 0.95}}
            type="submit"
            className="bg-red-600 text-white rounded-full py-2 mt-2 hover:bg-red-700 transition"
          >
            Register
          </motion.button>
        </form>

        <Link to="/" className="text-red-700 text-sm underline mt-4">
          Back to Login
        </Link>
      </motion.div>

      {/* Panel kanan */}
      <div className="flex-1"></div>
    </div>
  );
};

export default SignUpPage;
