// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { profileCustomer } from "../services/customerService.js";
import { profileEmployee } from "../services/employeeService.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, role: null });
    const [user, setUser] = useState(null);

    const setAuthData = (token, role) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setAuth({ token, role });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuth({ token: null, role: null });
        setUser(null);
    };

    const fetchUser = async (role) => {
        try {
            if (role === "CUSTOMER") {
                const res = await profileCustomer();
                setUser(res.data);
            } else if (role === "ADMIN" || role === "CASHIER") {
                const res = await profileEmployee();
                setUser(res.data);
            }
        } catch (err) {
            console.error("Gagal ambil data User:", err);
            setUser(null);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role) {
            setAuth({ token, role });
            fetchUser(role);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ auth, setAuthData, user, setUser, logout, fetchUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};