import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Loading from "../../components/loader/Loading";
import { FaBoxOpen, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaChevronDown, FaChevronUp } from "react-icons/fa";

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [customerId, setCustomerId] = useState(null);
    const token = localStorage.getItem("token");

    // state untuk dropdown
    const [openSection, setOpenSection] = useState({
        PENDING: true,
        COMPLETED: false,
        CANCELLED: false,
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:9090/api/v1.0/customer/myprofile",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setCustomerId(res.data.customer_id);
            } catch (err) {
                console.error("Gagal fetch profile:", err);
                setLoading(false);
            }
        };
        if (token) fetchProfile();
    }, [token]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (!customerId) return;
                const res = await axios.get(
                    `http://localhost:9090/api/v1.0/customer/order/${customerId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setOrders(res.data);
            } catch (err) {
                console.error("Gagal fetch orders:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [customerId, token]);

    if (loading) return <Loading />;

    // Kelompokkan order berdasarkan status
    const groupedOrders = {
        PENDING: orders.filter((o) => o.orderStatus === "PENDING"),
        COMPLETED: orders.filter((o) => o.orderStatus === "COMPLETED"),
        CANCELLED: orders.filter((o) => o.orderStatus === "CANCELLED"),
    };

    const toggleSection = (status) => {
        setOpenSection((prev) => ({ ...prev, [status]: !prev[status] }));
    };

    const renderOrders = (orders, statusLabel, badgeColor, buttonColor, statusKey) => (
        <div className="mb-8 border rounded-lg shadow-sm">
            {/* Header dropdown */}
            <div
                className="flex items-center px-6 py-4 bg-gray-100 cursor-pointer rounded-t-lg"
                onClick={() => toggleSection(statusKey)}
            >
                <h2 className="text-xl font-bold text-red-700">{statusLabel}</h2>
                <div className="ml-auto">
                    {openSection[statusKey] ? (
                        <FaChevronUp className="text-red-600" />
                    ) : (
                        <FaChevronDown className="text-red-600" />
                    )}
                </div>
            </div>



            {/* Isi dropdown */}
            {openSection[statusKey] && (
                <div className="p-6">
                    {orders.length === 0 ? (
                        <p className="text-gray-500 text-sm">No {statusLabel.toLowerCase()} orders.</p>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <motion.div
                                    key={order.idOrder}
                                    whileHover={{ scale: 1.01 }}
                                    className="border border-gray-200 rounded-xl p-6 bg-white shadow hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg text-red-700">
                                                Order #{order.orderNumber}
                                            </h3>
                                            <span
                                                className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${badgeColor}`}
                                            >
                        {order.orderStatus}
                      </span>
                                        </div>
                                        <Link
                                            to={`/orders/${order.idOrder}`}
                                            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
                                        >
                                            View Details
                                        </Link>
                                    </div>

                                    {/* Info utama */}
                                    <div className="space-y-3 text-sm text-gray-700 mt-4">
                                        <div className="flex">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 mr-3">
                                                <FaCalendarAlt size={14} />
                                            </div>
                                            <div className="flex-1">
                                                {new Date(order.orderDate).toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 mr-3">
                                                <FaMapMarkerAlt size={14} />
                                            </div>
                                            <div className="flex-1">{order.deliverAddress}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-600 mr-3">
                                                <FaMoneyBillWave size={14} />
                                            </div>
                                            <div className="flex-1">
                                                Rp {order.totalAmount?.toLocaleString("id-ID")}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ringkasan produk */}
                                    <div className="mt-6 border-t border-gray-100 pt-4">
                                        <h4 className="font-semibold text-red-700 mb-3">Products:</h4>
                                        <ul className="space-y-2">
                                            {order.orderDetails?.map((detail) => (
                                                <li
                                                    key={detail.idOrderDetail}
                                                    className="flex justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg"
                                                >
                          <span>
                            {detail.productName}{" "}
                              <span className="text-gray-500">(x{detail.quantity})</span>
                          </span>
                                                    <span className="font-medium text-gray-700">
                            Rp {detail.subtotal?.toLocaleString("id-ID")}
                          </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto px-6 pt-32 pb-20 text-gray-800"
        >
            <h1 className="text-4xl font-extrabold mb-10 text-center text-red-700">
                Your Order History
            </h1>

            {orders.length === 0 ? (
                <div className="text-center bg-red-50 border border-red-200 rounded-xl p-12 shadow-md">
                    <FaBoxOpen className="mx-auto text-5xl text-red-400 mb-4" />
                    <h2 className="text-xl font-bold text-red-800">No orders found</h2>
                    <p className="text-gray-600 mt-2">
                        Start shopping and track your orders here.
                    </p>
                    <Link
                        to="/products"
                        className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition"
                    >
                        Shop Now
                    </Link>
                </div>
            ) : (
                <>
                    {renderOrders(groupedOrders.PENDING, "Pending Orders", "bg-yellow-100 text-yellow-700", "bg-yellow-500", "PENDING")}
                    {renderOrders(groupedOrders.COMPLETED, "Completed Orders", "bg-green-100 text-green-700", "bg-green-600", "COMPLETED")}
                    {renderOrders(groupedOrders.CANCELLED, "Cancelled Orders", "bg-red-100 text-red-700", "bg-red-600", "CANCELLED")}
                </>
            )}
        </motion.div>
    );
};

export default OrderHistoryPage;