import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as yup from "yup";
import Loading from "../../../components/loader/Loading.jsx";
import { loginEmployee, profileEmployee } from "../../../services/employeeService";

const LoginPageEmployee = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // ✅ Schema validasi dengan Yup
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .matches(
                /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                "Email tidak valid"
            )
            .min(10, "Email harus minimal 10 karakter")
            .max(100, "Email tidak boleh lebih dari 100 karakter")
            .required("Email wajib diisi"),
        password: yup
            .string()
            .min(8, "Password harus minimal 8 karakter")
            .required("Password wajib diisi"),
    });

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const resLogin = await loginEmployee(values);
                const { token, role } = resLogin.data;
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                Swal.fire({
                    title: "Login Berhasil!",
                    text: `Selamat datang lagi`,
                    icon: "success",
                    confirmButtonColor: "#C31D1D",
                }).then(() => navigate("/admin/admin/dashboard"));
            } catch (err) {
                Swal.fire({
                    title: "Login Gagal",
                    text: err.response?.data?.message || "Email atau password salah",
                    icon: "error",
                    confirmButtonColor: "#C31D1D",
                });
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="flex h-screen items-center justify-center bg-pink-100">
            <div className="flex bg-white rounded-[40px] shadow-2xl overflow-hidden w-[80%] max-w-5xl">
                {/* Form login */}
                <motion.div
                    className="flex flex-col justify-center items-center w-[50%] px-10 py-10"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <img src="./logo/login.svg" alt="Logo" className="w-32 mb-2" />
                    <p className="text-red-600 text-sm mb-6">Login to your employee account here!</p>

                    <form className="space-y-4 w-full max-w-sm" onSubmit={formik.handleSubmit}>
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm text-red-700 mb-2 font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className={`w-full border rounded-md py-3 px-4 focus:outline-none focus:ring-2
                  ${formik.touched.email && formik.errors.email
                                    ? "border-red-600 focus:ring-red-600"
                                    : "border-red-500 focus:ring-red-400"}
                  text-gray-700 placeholder-gray-400`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-xs text-red-600 mt-1 ml-1">{formik.errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm text-red-700 mb-2 font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className={`w-full border rounded-md py-3 px-4 focus:outline-none focus:ring-2
                  ${formik.touched.password && formik.errors.password
                                    ? "border-red-600 focus:ring-red-600"
                                    : "border-red-500 focus:ring-red-400"}
                  text-gray-700 placeholder-gray-400`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-xs text-red-600 mt-1 ml-1">{formik.errors.password}</p>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 text-white py-3 rounded-full hover:bg-red-700 transition-all duration-200 font-semibold shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loading /> : "Login"}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Bagian kanan: video */}
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