// src/pages/auth/ResetPasswordPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { resetPassword } from "../../../services/authService";
import Loading from "../../../components/loader/Loading.jsx";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as yup from "yup";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const token = searchParams.get("token");

    // Jika tidak ada token → langsung tampilkan error
    if (!token || token.trim() === "") {
        return (
            <div className="flex h-screen items-center justify-center bg-pink-100">
                <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md">
                    <h2 className="text-3xl font-bold text-red-700 mb-6">Link Tidak Valid</h2>
                    <p className="text-gray-600 mb-8">
                        Token reset password tidak ditemukan atau link sudah rusak.
                    </p>
                    <Link
                        to="/forgot-password"
                        className="inline-block px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition shadow-lg"
                    >
                        Kirim Ulang Link Reset
                    </Link>
                </div>
            </div>
        );
    }

    const validationSchema = yup.object({
        password: yup
            .string()
            .required("Password baru wajib diisi")
            .min(6, "Minimal 6 karakter")
            .max(100, "Terlalu panjang"),
        confirmPassword: yup
            .string()
            .required("Konfirmasi password wajib diisi")
            .oneOf([yup.ref("password")], "Password tidak cocok"),
    });

    const formik = useFormik({
        initialValues: { password: "", confirmPassword: "" },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await resetPassword({
                    token,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                });

                Swal.fire({
                    title: "Berhasil!",
                    text: "Password kamu sudah berhasil diubah. Silakan login dengan password baru.",
                    icon: "success",
                    confirmButtonColor: "#C31D1D",
                    timer: 5000,
                }).then(() => navigate("/login"));
            } catch (err) {
                const msg =
                    err.response?.data ||
                    "Link tidak valid, sudah kadaluarsa, atau sudah digunakan.";
                Swal.fire({
                    title: "Gagal",
                    text: msg,
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
            <div className="flex bg-white rounded-[40px] shadow-2xl overflow-hidden w-[85%] max-w-6xl">

                {/* FORM SIDE */}
                <motion.div
                    className="w-1/2 flex flex-col justify-center px-16 py-20"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <img src="/logo/login.svg" alt="Logo" className="w-32 mb-8 mx-auto" />

                    <h2 className="text-4xl font-bold text-red-700 text-center mb-4">
                        Buat Password Baru
                    </h2>
                    <p className="text-gray-600 text-center mb-10">
                        Masukkan password baru untuk melanjutkan.
                    </p>

                    <form onSubmit={formik.handleSubmit} className="space-y-7 max-w-md mx-auto w-full">
                        {/* Password Baru */}
                        <div>
                            <label className="block text-sm font-semibold text-red-700 mb-2">
                                Password Baru
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Min. 6 karakter"
                                className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none focus:ring-4 transition ${
                                    formik.touched.password && formik.errors.password
                                        ? "border-red-500 focus:ring-red-300"
                                        : "border-pink-300 focus:ring-pink-300"
                                }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-600 text-sm mt-2">{formik.errors.password}</p>
                            )}
                        </div>

                        {/* Konfirmasi Password */}
                        <div>
                            <label className="block text-sm font-semibold text-red-700 mb-2">
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className={`w-full px-5 py-4 rounded-xl border-2 focus:outline-none focus:ring-4 transition ${
                                    formik.touched.confirmPassword && formik.errors.confirmPassword
                                        ? "border-red-500 focus:ring-red-300"
                                        : "border-pink-300 focus:ring-pink-300"
                                }`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <p className="text-red-600 text-sm mt-2">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}
                        </div>

                        {/* Tombol Submit */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={loading || !formik.isValid}
                            className={`w-full py-4 rounded-full text-white font-bold text-lg shadow-xl transition ${
                                loading || !formik.isValid
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                            }`}
                        >
                            {loading ? <Loading /> : "Simpan Password Baru"}
                        </motion.button>
                    </form>
                </motion.div>

                {/* VIDEO SIDE */}
                <div className="w-1/2 bg-gradient-to-br from-pink-100 to-red-50 flex items-center justify-center relative overflow-hidden">
                    <motion.video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-11/12 rounded-3xl shadow-2xl"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <source src="/logo/baker-animation.mp4" type="video/mp4" />
                    </motion.video>
                    <div className="absolute inset-0 bg-black/5"></div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;