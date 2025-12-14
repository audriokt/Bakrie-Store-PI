// src/pages/AuthPages/Login/EmailVerification.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmailToken } from "../../../services/authService";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EmailVerification = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Token verifikasi tidak ditemukan di URL.");
            return;
        }

        const verify = async () => {
            try {
                await verifyEmailToken(token);
                setStatus("success");
                setMessage("Email Anda berhasil diverifikasi!");
                setTimeout(() => navigate("/login"), 4000);
            } catch (err) {
                setStatus("error");
                setMessage(err?.response?.data || "Token tidak valid atau sudah kadaluarsa");
            }
        };

        verify();
    }, [token, navigate]);

    return (
        <div className="min-h-screen w-full bg-white flex items-center justify-center px-6 py-16">
            <div className="max-w-2xl w-full text-center">

                <h1 className="font-extrabold text-5xl sm:text-6xl text-yes mb-12">
                    {status === "loading" && "Verifikasi Email"}
                    {status === "success" && "Verifikasi Berhasil!"}
                    {status === "error" && "Verifikasi Gagal"}
                </h1>

                <div className="bg-white border-2 border-gray-100 rounded-3xl shadow-xl p-12">

                    {/* Icon */}
                    {status === "loading" && (
                        <div className="inline-block animate-spin rounded-full h-20 w-20 border-8 border-yes border-t-transparent"></div>
                    )}
                    {status === "success" && <CheckCircle className="w-28 h-28 mx-auto text-green-500" />}
                    {status === "error" && <XCircle className="w-28 h-28 mx-auto text-red-500" />}

                    <p className={`text-xl font-medium mt-8 ${status === "error" ? "text-red-600" : "text-gray-700"}`}>
                        {message}
                    </p>

                    {/* Sukses */}
                    {status === "success" && (
                        <div className="mt-10 space-y-6">
                            <p className="text-gray-600 text-lg">
                                Anda akan diarahkan ke halaman login dalam <strong>4 detik</strong>...
                            </p>
                            <Link to="/login">
                                <button className="bg-yes text-white text-lg font-medium w-64 h-14 rounded-full border-2 border-yes hover:bg-transparent hover:text-yes transition duration-300 flex items-center justify-center gap-3 mx-auto">
                                    Masuk Sekarang <ArrowRight className="w-6 h-6" />
                                </button>
                            </Link>
                        </div>
                    )}

                    {/* Error */}
                    {status === "error" && (
                        <div className="mt-8 space-y-4">
                            <p className="text-gray-600">Silakan daftar ulang jika token sudah kadaluarsa.</p>
                            <div className="flex gap-6 justify-center">
                                <Link to="/signup" className="text-yes font-medium underline">Daftar Ulang</Link>
                                <span className="text-gray-400">|</span>
                                <Link to="/login" className="text-yes font-medium underline">Kembali ke Login</Link>
                            </div>
                        </div>
                    )}

                </div>

                <footer className="mt-12 text-sm text-gray-500">
                    © {new Date().getFullYear()} Bakrie Store. All rights reserved.
                </footer>
            </div>
        </div>
    );
};

export default EmailVerification;