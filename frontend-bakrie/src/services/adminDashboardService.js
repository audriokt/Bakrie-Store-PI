// src/services/api.js
import api from "../utils/axiosConfig.js"; // ini adalah axios instance yang sudah kamu buat

// Dashboard
export const getDashboard = () => api.get("/admin/dashboard");

// Products
export const getProducts = (page = 0, size = 8) =>
    api.get(`/admin/products?page=${page}&size=${size}`);

export const addProduct = (formData) =>
    api.post("/admin/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const updateProduct = (id, formData) =>
    api.put(`/admin/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const deleteProduct = (id) => api.delete(`/admin/products/${id}`);

// Orders
export const getOrders = () => api.get("/admin/orders");
export const getOrderById = (id) => api.get(`/admin/orders/${id}`);
export const updateOrderStatus = (id, status) =>
    api.patch(`/admin/orders/${id}/status?status=${status}`);

// Customers
export const getCustomers = () => api.get("/admin/customers");
export const deleteCustomer = (id) => api.delete(`/admin/customers/${id}`);

// Employees
export const getEmployees = () => api.get("/admin/employees");
export const addEmployee = (formData) =>
    api.post("/admin/employees", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const updateEmployee = (id, formData) =>
    api.put(`/admin/employees/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const deleteEmployee = (id) => api.delete(`/admin/employees/${id}`);
