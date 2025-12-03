// src/pages/auth/ForgotPasswordPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/authService.js";
import Loading from "../../../components/loader/Loading.jsx";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as yup from "yup";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        email: yup
            .string()
            .trim()
            .lowercase()
            .required("Email wajib diisi")
            .email("Format email tidak valid")
            .max(100, "Email terlalu panjang"),
    });

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema,
        onSubmit: async (values) => {
            console.log("Form values (sebelum kirim):", values); // { email: "test@gmail.com" }
            console.log("Email yang akan dikirim:", values.email);

            setLoading(true);
            try {
                console.log("Mengirim request ke backend...");
                const response = await forgotPassword(values); // ← HARUS values (object), bukan values.email

                console.log("Response dari backend (SUKSES):", response);
                console.log("Status:", response.status);
                console.log("Data:", response.data);

                Swal.fire({
                    title: "Link Reset Terkirim!",
                    html: `
                        <p class="text-gray-700">Jika email <strong>${values.email}</strong> terdaftar dan sudah diverifikasi, 
                        link reset password telah dikirim ke email Anda.</p>
                        <p class="text-sm text-gray-600 mt-3">Silakan cek kotak masuk (atau folder spam).</p>
                    `,
                    icon: "success",
                    confirmButtonText: "Kembali ke Login",
                    confirmButtonColor: "#C31D1D",
                }).then(() => {
                    navigate("/login");
                });
            } catch (err) {
                console.error("ERROR saat forgot password:");
                console.error("Full error object:", err);
                console.error("Error response dari backend:", err.response);
                console.error("Status code:", err.response?.status);
                console.error("Error message:", err.response?.data || err.message);

                Swal.fire({
                    title: "Terjadi Kesalahan",
                    text: err.response?.data || "Gagal mengirim link reset. Coba lagi nanti.",
                    icon: "error",
                    confirmButtonColor: "#C31D1D",
                });
            } finally {
                setLoading(false);
                console.log("Loading selesai, set ke false");
            }
        },
    });

    // Debug tambahan: lihat setiap perubahan input
    console.log("Current form values (live):", formik.values);
    console.log("Form errors:", formik.errors);
    console.log("Form touched:", formik.touched);

    return (
        <div className="flex h-screen items-center justify-center bg-pink-100">
            <div className="flex bg-white rounded-[40px] shadow-2xl overflow-hidden w-[80%] max-w-5xl">
                {/* Left Side - Form */}
                <motion.div
                    className="w-1/2 flex flex-col justify-center items-center px-12 py-16"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <img src="/logo/login.svg" alt="Logo" className="w-32 mb-4" />
                    <h2 className="text-2xl font-bold text-red-700 mb-2">Lupa Password?</h2>
                    <p className="text-gray-600 text-center mb-8 max-w-xs">
                        Masukkan email Anda, kami akan kirim link untuk reset password.
                    </p>

                    <form onSubmit={formik.handleSubmit} className="w-full max-w-sm space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-red-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="contoh@gmail.com"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition 
                                    ${formik.touched.email && formik.errors.email
                                    ? "border-red-600 focus:ring-red-600"
                                    : "border-red-400 focus:ring-red-400"
                                }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-xs text-red-600 mt-1 ml-1">{formik.errors.email}</p>
                            )}
                        </div>
m 
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"                    // ← INI YANG HILANG SEBELUMNYA!!!
                            disabled={loading || !formik.isValid || !formik.dirty}
                            className={`w-full py-3 rounded-full font-semibold transition ${
                                loading || !formik.isValid || !formik.dirty
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-red-600 text-white hover:bg-red-700 shadow-md"
                            }`}
                        >
                            {loading ? <Loading /> : "Kirim Link Reset"}
                        </motion.button>
                    </form>

                    <Link to="/login" className="mt-6 text-red-700 underline hover:text-red-800 text-sm">
                        ← Kembali ke Login
                    </Link>
                </motion.div>

                {/* Right Side - Animation */}
                <div className="w-1/2 bg-pink-50 flex items-center justify-center relative overflow-hidden">
                    <motion.video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-4/5 rounded-2xl shadow-xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <source src="/logo/baker-animation.mp4" type="video/mp4" />
                    </motion.video>
                    <div className="absolute inset-0 bg-pink-100/50 mix-blend-soft-light rounded-2xl"></div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;