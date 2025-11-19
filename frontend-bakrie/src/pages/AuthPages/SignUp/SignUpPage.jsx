import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { addCustomer } from "../../../services/customerService"; 
import Loading from "../../../components/loader/Loading";
import Swal from 'sweetalert2';
import { useFormik } from "formik";
import * as yup from "yup";

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(false);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .min(5, "Username must be at least 8 characters")
      .max(30, "Username cannot exceed 32 characters")
      .required("Username is required"),
    email: yup.string()
      .email("Invalid email format")
      .min(15, "Email must be at least 15 characters") 
      .max(100, "Email cannot exceed 100 characters")
      .required("Email is required"),
    password: yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    phone_num: yup.string()
      .min(11, "Phone number must be at least 11 characters")
      .max(13, "Phone number cannot exceed 13 characters")
      .matches(/^[0-9]+$/, "Phone number must contain only digits") 
      .required("Phone number is required"),
    address: yup.string()
      .min(20, "Address must be at least 20 characters")
      .max(300, "Address cannot exceed 300 characters")
      .required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      phone_num: "",
      address: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setRegisterError(false);
      try {
        await addCustomer(values);
        
        Swal.fire({
          title: "Registration Successful",
          text: "Please check your email to verify your account before logging in!",
          icon: "success",
          confirmButtonText: "Go to Login",
          confirmButtonColor: "#C31D1D"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          }
        });
      } catch (err) {
        console.error("Registration failed:", err);
        Swal.fire({
          title: "Registration Failed",
          text: err.response?.data?.message || "Something went wrong",
          icon: "error",
          confirmButtonColor: "#C31D1D"
        });
        setRegisterError(true);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex h-screen items-center justify-center bg-pink-100">
      <div className="flex bg-white rounded-[40px] shadow-2xl overflow-hidden w-[80%] max-w-5xl">
        
        {/* Left Side: Sign Up Form */}
        <motion.div
          className="flex flex-col justify-center items-center w-[50%] px-10 py-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src="./logo/signup.svg" alt="Logo" className="w-32 mb-2" />
          <p className="text-red-600 text-sm mb-6">
            Create your account here!
          </p>

          <form className="space-y-4 w-full max-w-sm" onSubmit={formik.handleSubmit}>
            
            {/* USERNAME */}
            <div>
              <input
                type="text"
                placeholder="Username"
                className={`w-full border rounded-md py-3 px-4 focus:outline-none focus:ring-2 
                  ${formik.touched.username && formik.errors.username 
                    ? "border-red-600 focus:ring-red-600" 
                    : "border-red-500 focus:ring-red-400"} 
                  text-gray-700 placeholder-gray-400`}
                name="username"
                id="username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-xs text-red-600 mt-1 ml-1">{formik.errors.username}</p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full border rounded-md py-3 px-4 focus:outline-none focus:ring-2 
                  ${formik.touched.email && formik.errors.email 
                    ? "border-red-600 focus:ring-red-600" 
                    : "border-red-500 focus:ring-red-400"} 
                  text-gray-700 placeholder-gray-400`}
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

            {/* PASSWORD */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className={`w-full border rounded-md py-3 px-4 focus:outline-none focus:ring-2 
                  ${formik.touched.password && formik.errors.password 
                    ? "border-red-600 focus:ring-red-600" 
                    : "border-red-500 focus:ring-red-400"} 
                  text-gray-700 placeholder-gray-400`}
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

            {/* PHONE NUMBER */}
            <div>
              <input
                type="text"
                placeholder="Phone Number"
                className={`w-full border rounded-md py-3 px-4 focus:outline-none focus:ring-2 
                  ${formik.touched.phone_num && formik.errors.phone_num 
                    ? "border-red-600 focus:ring-red-600" 
                    : "border-red-500 focus:ring-red-400"} 
                  text-gray-700 placeholder-gray-400`}
                name="phone_num"
                id="phone_num"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone_num}
              />
              {formik.touched.phone_num && formik.errors.phone_num && (
                <p className="text-xs text-red-600 mt-1 ml-1">{formik.errors.phone_num}</p>
              )}
            </div>

            {/* ADDRESS */}
            <div>
              <input
                type="text"
                placeholder="Address"
                className={`w-full border rounded-md py-3 px-4 focus:outline-none focus:ring-2 
                  ${formik.touched.address && formik.errors.address 
                    ? "border-red-600 focus:ring-red-600" 
                    : "border-red-500 focus:ring-red-400"} 
                  text-gray-700 placeholder-gray-400`}
                name="address"
                id="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address && (
                <p className="text-xs text-red-600 mt-1 ml-1">{formik.errors.address}</p>
              )}
            </div>

            {registerError && (
              <p className="text-red-600 text-sm mt-2 text-center">
                Registration failed. Please check your details.
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

        {/* Right Side: Video Animation */}
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
          <div className="absolute inset-0 bg-pink-100/60 mix-blend-soft-light rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;