import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { loginCustomer } from "../../../services/authService.js";
import { profileCustomer } from "../../../services/customerService.js";
import { useAuth } from "../../../hooks/useAuth.js";
import Loading from "../../../components/loader/Loading.jsx";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as yup from "yup";

const LoginPage = () => {
  const { setAuthData, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const validationSchema = yup.object().shape({
    email: yup.string()
      .email("Invalid email format")
      .min(15, "Email must be at least 15 characters") 
      .max(100, "Email cannot exceed 100 characters") 
      .required("Email is required"),
    password: yup.string()
      .min(6, "Password must be at least 6 characters") 
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setLoginError(false);

      try {
        // Mengirim data values (email & password) ke API
        const resLogin = await loginCustomer(values);
        const { token, role } = resLogin.data;
        
        setAuthData(token, role);
        
        const resUser = await profileCustomer();
        setUser(resUser.data);

        Swal.fire({
          title: "Login Successful",
          text: "You have successfully logged in.",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#C31D1D"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      } catch (err) {
        console.error("Login Failed:", err);
        setLoginError(true);
        Swal.fire({
            title: "Login Failed",
            text: err.response?.data?.message || "Invalid email or password",
            icon: "error",
            confirmButtonColor: "#C31D1D"
        });
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-pink-100">
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

          {/* Form login menggunakan formik.handleSubmit */}
          <form className="space-y-4 w-full max-w-sm" onSubmit={formik.handleSubmit}>
            
            {/* EMAIL INPUT */}
            <div>
              <label htmlFor="email" className="block text-sm text-red-700 mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                className={`w-full border rounded-md py-3 px-4 focus:outline-none focus:ring-2 
                  ${formik.touched.email && formik.errors.email 
                    ? "border-red-600 focus:ring-red-600" 
                    : "border-red-500 focus:ring-red-400"} 
                  text-gray-700 placeholder-gray-400`}
                placeholder="Email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-xs text-red-600 mt-1 ml-1">{formik.errors.email}</p>
              )}
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label className="block text-sm text-red-700 mb-2 font-medium" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                className={`w-full border rounded-md py-3 px-4 focus:outline-none focus:ring-2 
                  ${formik.touched.password && formik.errors.password 
                    ? "border-red-600 focus:ring-red-600" 
                    : "border-red-500 focus:ring-red-400"} 
                  text-gray-700 placeholder-gray-400`}
                placeholder="Password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-xs text-red-600 mt-1 ml-1">{formik.errors.password}</p>
              )}
            </div>

            {loginError && (
              <p className="text-red-600 text-sm mt-2 text-center">
                Login failed. Please check your email and password.
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
              {loading ? <Loading /> : "Login"}
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
           {/* Overlay agar konsisten dengan signup page */}
           <div className="absolute inset-0 bg-pink-100/60 mix-blend-soft-light rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;