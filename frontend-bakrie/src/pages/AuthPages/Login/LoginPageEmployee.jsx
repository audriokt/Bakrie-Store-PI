import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { loginCustomer } from "../../../services/authService.js"
import { AppContext } from "../../../context/AppContext.jsx"

const LoginPageEmployee = () => {
    const {setAuthData} = useContext(AppContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((data)=> ({...data, [name]:value}))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const response = await loginCustomer(data)
            if(response.status === 200){
                console.info("Login successfull")
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("role", response.data.role)
                setAuthData(response.data.token, response.data.role)
                navigate("/");
            }
        } catch(error){
            console.error("Email/Password Invalid " + error)
        } finally {
            setLoading(false)
        }
    }

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
            Login to your account here!
          </p>

          {/* Form login */}
          <form className="space-y-4 w-full max-w-sm" onSubmit={onSubmitHandler}>
            <div>
              <label htmlFor="email" className="block text-sm text-red-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-red-500 rounded-md py-3 px-4 
                          focus:outline-none focus:ring-2 focus:ring-red-400 
                          text-gray-700 placeholder-gray-400"
                placeholder="Email"
                name="email"
                id="email"
                onChange={onChangeHandler}
                value={data.email}
              />
            </div>

            <div>
              <label className="block text-sm text-red-700 mb-2 font-medium" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-red-500 rounded-md py-3 px-4 
                          focus:outline-none focus:ring-2 focus:ring-red-400 
                          text-gray-700 placeholder-gray-400"
                placeholder="Password"
                name="password"
                id="password"
                onChange={onChangeHandler}
                value={data.password}
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

export default LoginPageEmployee;
