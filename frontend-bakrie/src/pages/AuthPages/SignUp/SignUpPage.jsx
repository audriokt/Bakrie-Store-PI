import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { addCustomer, profileCustomer } from "../../../services/customerService";
import { useAuth } from "../../../hooks/useAuth";
import Loading from "../../../components/loader/Loading";
import Swal from 'sweetalert2'

const SignUpPage = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    phone_num: "",
    address: "",
  })

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [registerError, setRegisterError] = useState(false)
  
  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setData((prev) => ({...prev, [name]: value}));
  }

  // const {setAuthData, setUser} = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resRegister = await addCustomer(data);
      Swal.fire({
        title: "Registration Successful",
        text: "You have to verify your email before logging in. Check your email please!",
        icon: "success",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#C31D1D"
      }).then((result) => {
        if(result.isConfirmed) {
          navigate("/login");
        }
      });
      }
      catch (err) {
        console.error("Registration failed:", err);
        Swal.fire({
          title: "Registration Failed",
          text: "Please verify your email before logging in. Check your email please!",
          icon: "error",
          confirmButtonColor: "#C31D1D"
        })
        setRegisterError(true);
      } finally {
        setLoading(false);
      }
    }
  

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
          <form className="space-y-4 w-full max-w-sm" onSubmit={onSubmitHandler}>
            <input
              type="text"
              placeholder="Username"
              className="w-full border border-red-500 rounded-md py-3 px-4 
                        focus:outline-none focus:ring-2 focus:ring-red-400 
                        text-gray-700 placeholder-gray-400"
              name="username"
              id="username"
              onChange={onChangeHandler}
              value={data.username}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-red-500 rounded-md py-3 px-4 
                        focus:outline-none focus:ring-2 focus:ring-red-400 
                        text-gray-700 placeholder-gray-400"
              name="email"
              id="email"
              onChange={onChangeHandler}
              value={data.email}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-red-500 rounded-md py-3 px-4 
                        focus:outline-none focus:ring-2 focus:ring-red-400 
                        text-gray-700 placeholder-gray-400"
              name="password"
              id="password"
              onChange={onChangeHandler}
              value={data.password}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-red-500 rounded-md py-3 px-4 
                        focus:outline-none focus:ring-2 focus:ring-red-400 
                        text-gray-700 placeholder-gray-400"
              name="phone_num"
              id="phone_num"
              onChange={onChangeHandler}
              value={data.phone_num}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-red-500 rounded-md py-3 px-4 
                        focus:outline-none focus:ring-2 focus:ring-red-400 
                        text-gray-700 placeholder-gray-400"
              name="address"
              id="address"
              onChange={onChangeHandler}
              value={data.address}
            />

            {registerError && (
              <p className="text-red-600 text-sm mt-2">
                Registration failed. Please make sure your information is correct.
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full h-12 bg-red-600 text-white py-3 rounded-full 
                hover:bg-red-700 transition-all duration-200 font-semibold shadow-md"
              disabled={loading}
            >
              {loading ? <Loading /> : "Sign Up"}
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
