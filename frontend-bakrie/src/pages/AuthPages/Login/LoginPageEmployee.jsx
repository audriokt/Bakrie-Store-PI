import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../../../hooks/useEmployee.js";  // atau path yang benar ke hook kamu
import Loading from "../../../components/loader/Loading.jsx";
import Swal from "sweetalert2";

const LoginPageEmployee = () => {
    // GUNAKAN useEmployee → ini yang bikin context aman
    const { login, loading: contextLoading } = useEmployee();
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            // Panggil fungsi login dari EmployeeContext
            await login(data.email, data.password);

            // Success
            Swal.fire({
                title: "Login Berhasil!",
                text: "Selamat datang kembali",
                icon: "success",
                confirmButtonColor: "#C31D1D",
            }).then(() => {
                navigate("/"); // atau "/" atau route yang kamu mau
            });

        } catch (err) {
            // Error dari context sudah berupa string (lihat EmployeeContext → throw new Error(msg))
            Swal.fire({
                title: "Login Gagal",
                text: err.message || "Email atau password salah",
                icon: "error",
                confirmButtonColor: "#C31D1D",
            });
        }
    };

    // Gabung loading dari context + local (biar tombol tetap disabled saat proses)
    const isLoading = contextLoading;

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
                                required
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
                                required
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-600 text-white py-3 rounded-full
                hover:bg-red-700 transition-all duration-200 font-semibold shadow-md
                disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loading /> : "Login"}
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