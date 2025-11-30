import axios from '../utils/axiosConfig.js'

const BASE_URL = "http://localhost:9090/api/v1.0";

export const createOrder = async (payload) => {
    return await axios.post(`${BASE_URL}/customer/order/create`, payload);
};

export const fetchMyOrders = async (customerId) => {
    return await axios.get(`${BASE_URL}/customer/order/${customerId}`);
};

export const fetchOrderByNumber = async (orderNumber) => {
    return await axios.get(`${BASE_URL}/public/order/getOrderByNumber/${orderNumber}`);
};

export const cancelOrder = async (orderId) => {
    return await axios.post(`${BASE_URL}/customer/order/${orderId}/cancel`);
};