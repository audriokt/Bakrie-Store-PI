import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { createOrder } from "../../services/orderService"
import Swal from "sweetalert2";

const TransactionPage = () => {
    const navigate = useNavigate();
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();

    const shippingFee = 15000;
    const serviceFee = 2000;
    const grandTotal = cartTotal + shippingFee + serviceFee;

    const [address, setAddress] = useState(user?.address || "");
    const [note, setNote] = useState("");
    const [isSnapLoaded, setIsSnapLoaded] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const formatPrice = (price) =>
        price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

    // Load Midtrans Snap Script (dengan fallback & loading state)
    useEffect(() => {
        if (window.snap) {
            setIsSnapLoaded(true);
            return;
        }

        const midtransScriptUrl =
            import.meta.env.VITE_MIDTRANS_ENV === "production"
                ? "https://app.midtrans.com/snap/snap.js"
                : "https://app.sandbox.midtrans.com/snap/snap.js";

        const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

        if (!clientKey) {
            console.error("VITE_MIDTRANS_CLIENT_KEY tidak ditemukan di .env");
            Swal.fire({
                icon: "error",
                title: "Konfigurasi Bermasalah",
                text: "Client key Midtrans belum diatur.",
            });
            return;
        }

        const script = document.createElement("script");
        script.src = midtransScriptUrl;
        script.setAttribute("data-client-key", clientKey);
        script.async = true;

        script.onload = () => {
            console.log("Midtrans Snap loaded successfully");
            setIsSnapLoaded(true);
        };

        script.onerror = () => {
            console.error("Gagal memuat Midtrans Snap script");
            Swal.fire({
                icon: "error",
                title: "Koneksi Bermasalah",
                text: "Gagal memuat sistem pembayaran. Coba refresh halaman.",
            });
        };

        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const handlePayNow = async () => {
        if (isProcessing) return;
        if (!isSnapLoaded) {
            Swal.fire({
                icon: "warning",
                title: "Sistem Pembayaran Belum Siap",
                text: "Tunggu sebentar atau refresh halaman.",
            });
            return;
        }

        if (!address.trim()) {
            Swal.fire({
                icon: "error",
                title: "Alamat Wajib Diisi!",
                confirmButtonColor: "#C31D1D",
            });
            return;
        }

        setIsProcessing(true);

        try {
            const orderItems = cartItems.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            }));

            const payload = {
                customerId:
                    user?.idCustomer ||
                    user?.customer_id ||
                    user?.id_customer ||
                    user?.id,
                deliverAddress: address,
                note: note.trim(),
                orderDetails: orderItems,
            };

            const { data } = await createOrder(payload);
            const { transactionToken, orderNumber } = data;

            if (!transactionToken) {
                throw new Error("Token pembayaran tidak diterima dari server");
            }

            // Jalankan Midtrans Snap
            window.snap.pay(transactionToken, {
                onSuccess: async (result) => {
                    console.log("Payment SUCCESS:", result);
                    await clearCart();
                    Swal.fire({
                        icon: "success",
                        title: "Pembayaran Berhasil!",
                        text: `Pesanan ${orderNumber} sedang diproses.`,
                        confirmButtonColor: "#C31D1D",
                    }).then(() => {
                        navigate("/order-success", { state: { orderNumber } });
                    });
                },
                onPending: (result) => {
                    console.log("Payment PENDING:", result);
                    Swal.fire({
                        icon: "info",
                        title: "Menunggu Pembayaran",
                        text: `Order ${orderNumber} menunggu pembayaran. Silakan selesaikan dalam 24 jam.`,
                        confirmButtonColor: "#C31D1D",
                    }).then(() => {
                        navigate("/orders");
                    });
                },
                onError: (result) => {
                    console.error("Payment ERROR:", result);
                    Swal.fire({
                        icon: "error",
                        title: "Pembayaran Gagal",
                        text: "Terjadi kesalahan sistem pembayaran.",
                        confirmButtonColor: "#C31D1D",
                    });
                },
                onClose: () => {
                    Swal.fire({
                        icon: "warning",
                        title: "Pembayaran Dibatalkan",
                        text: "Kamu menutup jendela pembayaran. Pesanan belum diproses.",
                        confirmButtonColor: "#C31D1D",
                    });
                },
            });
        } catch (err) {
            console.error("Error saat checkout:", err);
            const msg =
                err.response?.data?.message ||
                err.message ||
                "Gagal membuat pesanan. Coba lagi atau hubungi admin.";
            Swal.fire({
                icon: "error",
                title: "Transaksi Gagal",
                text: msg,
                confirmButtonColor: "#C31D1D",
            });
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancel = () => {
        Swal.fire({
            icon: "question",
            title: "Batalkan Pesanan?",
            text: "Kamu akan kembali ke keranjang belanja.",
            showCancelButton: true,
            confirmButtonText: "Ya, batalkan",
            cancelButtonText: "Lanjutkan checkout",
            confirmButtonColor: "#C31D1D",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/cart");
            }
        });
    };

    if (cartItems.length === 0) {
        return (
            <div className="pt-40 text-center">
                <p className="text-2xl font-medium text-gray-600 mb-6">Keranjang kosong</p>
                <button onClick={() => navigate("/products")} className="text-red-700 underline text-lg">
                    Belanja Sekarang
                </button>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-extrabold text-red-800 text-center mb-10"
                >
                    Checkout Transaction
                </motion.h1>

                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* LEFT - FORM */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-1 space-y-8">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
                            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                                <div className="bg-red-50 rounded-xl p-3">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">Shipping Address</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Recipient Name</label>
                                    <input
                                        type="text"
                                        value={user?.fullname || user?.username || "User"}
                                        disabled
                                        className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-600 border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="text"
                                        value={user?.phone_num || "-"}
                                        disabled
                                        className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-600 border border-gray-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Full Address <span className="text-red-600">*</span>
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none resize-none"
                                        placeholder="Contoh: Jl. Sudirman No.10, RT 01/RW 02, Kel. Senayan, Jakarta Selatan"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Order Note (opsional)</label>
                                    <textarea
                                        rows={3}
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-red-500 outline-none resize-none"
                                        placeholder="Contoh: Tolong bungkus rapi, taruh di pos satpam"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT - SUMMARY */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-96 bg-white rounded-3xl shadow-lg border border-red-100 p-8">
                        <h2 className="text-2xl font-bold text-red-800 mb-6">Invoice Summary</h2>

                        <div className="max-h-96 overflow-y-auto space-y-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item.itemCartId} className="flex gap-4 pb-4 border-b border-dashed border-gray-200 last:border-0">
                                    <img src={item.productImgUrl} alt={item.productName} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.productName}</h4>
                                        <div className="flex justify-between mt-2">
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">Qty: {item.quantity}</span>
                                            <span className="font-bold text-red-700">{formatPrice(item.subPrice)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-dashed border-gray-300 pt-6 space-y-3">
                            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatPrice(cartTotal)}</span></div>
                            <div className="flex justify-between text-gray-600"><span>Shipping Fee</span><span>{formatPrice(shippingFee)}</span></div>
                            <div className="flex justify-between text-gray-600"><span>Service Fee</span><span>{formatPrice(serviceFee)}</span></div>
                        </div>

                        <div className="my-6 border-t border-gray-300 pt-6">
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total Payment</span>
                                <span className="text-red-700">{formatPrice(grandTotal)}</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <motion.button
                                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                                onClick={handlePayNow}
                                disabled={isProcessing || !isSnapLoaded}
                                className={`w-full font-bold py-4 rounded-2xl shadow-lg transition ${
                                    isProcessing || !isSnapLoaded
                                        ? "bg-gray-400 cursor-not-allowed text-white"
                                        : "bg-gradient-to-r from-red-700 to-red-600 text-white hover:shadow-red-300"
                                }`}
                            >
                                {isProcessing ? "Memproses..." : !isSnapLoaded ? "Loading Payment..." : "Pay Now"}
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCancel}
                                className="w-full border border-gray-300 text-gray-700 font-medium py-3.5 rounded-2xl hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition"
                            >
                                Cancel Order
                            </motion.button>
                        </div>

                        {/* Debug Info (hapus saat production) */}
                        {import.meta.env.DEV && (
                            <div className="mt-4 text-xs text-gray-500 text-center">
                                Mode: <span className="font-mono">{import.meta.env.VITE_MIDTRANS_ENV || "sandbox"}</span>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TransactionPage;