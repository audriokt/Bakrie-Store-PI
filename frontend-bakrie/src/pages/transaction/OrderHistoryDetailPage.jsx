import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../../components/loader/Loading";
import Swal from "sweetalert2";

const OrderHistoryDetailPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:9090/api/v1.0/public/order/getOrderById/${orderId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setOrder(res.data);
            } catch (err) {
                console.error("Gagal fetch order detail:", err);
            } finally {
                setLoading(false);
            }
        };
        if (orderId) fetchOrderDetail();
    }, [orderId, token]);

    const handleCancelOrder = async () => {
        try {
            await axios.post(
                `http://localhost:9090/api/v1.0/customer/order/${orderId}/cancel`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Pop-up sukses
            Swal.fire({
                icon: "success",
                title: "Pesanan dibatalkan",
                text: "Pesanan berhasil dibatalkan",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK"
            }).then(() => {
                // setelah klik OK, navigasi kembali ke history
                navigate("/order-history");
            });
        } catch (err) {
            console.error("Gagal cancel order:", err);
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: "Tidak bisa membatalkan pesanan ini",
                confirmButtonColor: "#d33",
                confirmButtonText: "OK"
            });
        }
    };

    if (loading) return <Loading />;
    if (!order) return <div className="pt-40 text-center text-red-700">Order not found</div>;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto px-10 pt-40 pb-32 text-red-700"
        >
            <h1 className="text-4xl font-extrabold mb-6">Order Detail</h1>

            <div className="border border-red-200 rounded-lg p-6 bg-white shadow-sm mb-10">
                <h2 className="text-xl font-bold text-red-800 mb-2">
                    Order #{order.orderNumber}
                </h2>
                <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
                <p>Status: {order.orderStatus}</p>
                <p>Address: {order.deliverAddress}</p>
                <p>Total: Rp {order.totalAmount?.toLocaleString("id-ID")}</p>

                {order.orderStatus === "PENDING" && (
                    <button
                        onClick={handleCancelOrder}
                        className="mt-4 bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-800 transition"
                    >
                        Cancel Order
                    </button>
                )}
            </div>

            <h3 className="text-2xl font-bold mb-4">Products</h3>
            <div className="space-y-4">
                {order.orderDetails?.map((detail) => (
                    <motion.div
                        key={detail.idOrderDetail}
                        whileHover={{ scale: 1.01 }}
                        className="border border-red-200 rounded-lg p-4 bg-white shadow-sm flex items-center justify-between"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={detail.productImageUrl}
                                alt={detail.productName}
                                className="w-20 h-20 object-cover rounded-lg border border-red-200"
                            />
                            <div>
                                <p className="font-medium text-red-800">{detail.productName}</p>
                                <p className="text-sm text-gray-600">Qty: {detail.quantity}</p>
                                <p className="text-sm text-gray-600">
                                    Unit Price: Rp {detail.unitPrice?.toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>
                        <p className="font-bold text-red-700">
                            Subtotal: Rp {detail.subtotal?.toLocaleString("id-ID")}
                        </p>
                    </motion.div>
                ))}
            </div>

            <Link
                to="/order-history"
                className="mt-10 inline-block bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-800 transition"
            >
                Back to History
            </Link>
        </motion.div>
    );
};

export default OrderHistoryDetailPage;