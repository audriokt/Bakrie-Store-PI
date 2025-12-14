import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const OrderHistoryPage = ({ customerId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:9090/api/v1.0/customer/order/${customerId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setOrders(res.data);
            } catch (err) {
                console.error("Gagal fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };
        if (customerId) {
            fetchOrders();
        }
    }, [customerId, token]);

    if (loading) {
        return (
            <div className="pt-40 text-center font-bold text-red-700">
                Loading Orders...
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto px-10 pt-40 pb-32 text-red-700"
        >
            <h1 className="text-5xl font-extrabold mb-6">Order History</h1>

            {orders.length === 0 ? (
                <div className="text-center bg-red-50 border border-red-200 rounded-lg p-10">
                    <h2 className="text-xl font-bold text-red-800">No orders found</h2>
                    <Link
                        to="/products"
                        className="mt-4 inline-block bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-800 transition"
                    >
                        Shop Now
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <motion.div
                            key={order.idOrder}
                            whileHover={{ scale: 1.01 }}
                            className="border border-red-200 rounded-lg p-6 bg-white shadow-sm"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg text-red-800">
                                        Order #{order.orderNumber}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Date: {new Date(order.orderDate).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Status: {order.orderStatus}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Address: {order.deliverAddress}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Total: Rp {order.totalAmount.toLocaleString("id-ID")}
                                    </p>
                                </div>
                                <Link
                                    to={`/orders/${order.idOrder}`}
                                    className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-800 transition"
                                >
                                    View Details
                                </Link>
                            </div>

                            {/* tampilkan ringkasan produk */}
                            <div className="mt-4 border-t border-red-100 pt-4">
                                <h4 className="font-semibold text-red-700 mb-2">Products:</h4>
                                <ul className="space-y-2">
                                    {order.orderDetails.map((detail) => (
                                        <li
                                            key={detail.idOrderDetail}
                                            className="flex justify-between text-sm"
                                        >
                      <span>
                        {detail.productName} (x{detail.quantity})
                      </span>
                                            <span>
                        Rp {detail.subtotal.toLocaleString("id-ID")}
                      </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default OrderHistoryPage;