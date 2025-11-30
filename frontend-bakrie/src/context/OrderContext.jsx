// src/context/OrderContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import {
    fetchMyOrders,
    fetchOrderByNumber,
    cancelOrder,
} from "../services/orderService";
import Swal from "sweetalert2";

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
    const { user } = useAuth();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const customerId = user?.idCustomer || user?.customer_id || user?.id_customer || user?.id;

    const refreshOrders = async () => {
        if (!customerId) {
            setOrders([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const res = await fetchMyOrders(customerId);
            setOrders(res.data || []);
        } catch (err) {
            console.error("Gagal memuat pesanan:", err);
            setError(err.response?.data?.message || "Gagal memuat pesanan");
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const getOrderDetail = async (orderNumber) => {
        try {
            setLoading(true);
            const res = await fetchOrderByNumber(orderNumber);
            return res.data;
        } catch (err) {
            console.error("Gagal mengambil detail order:", err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Batalkan order berdasarkan orderId (UUID)
    const cancelOrderById = async (orderId) => {
        try {
            setLoading(true);
            await cancelOrder(orderId);

            // Update status lokal
            setOrders((prev) =>
                prev.map((order) =>
                    order.idOrder === orderId
                        ? { ...order, orderStatus: "CANCELLED" }
                        : order
                )
            );

            Swal.fire({
                icon: "success",
                title: "Pesanan Dibatalkan",
                text: "Pesanan telah berhasil dibatalkan.",
                confirmButtonColor: "#C31D1D",
            });

            return true;
        } catch (err) {
            const msg = err.response?.data?.message || "Gagal membatalkan pesanan";
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: msg,
                confirmButtonColor: "#C31D1D",
            });
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (customerId) {
            refreshOrders();
        } else {
            setOrders([]);
        }
    }, [customerId]);

    return (
        <OrderContext.Provider
            value={{
                orders,
                loading,
                error,
                refreshOrders,
                getOrderDetail,
                cancelOrderById, // ← pakai ini
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}
