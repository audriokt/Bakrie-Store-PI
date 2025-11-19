// src/context/EmployeeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import {
    loginEmployee,
    addEmployee,
    fetchEmployees,
    updateEmployeeProfile,
    deleteEmployee,
} from '../services/employeeService';

export const EmployeeContext = createContext(null);

export const EmployeeProvider = ({ children }) => {
    const [employees, setEmployees] = useState([]);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await loginEmployee({ email, password });
            const data = res.data;

            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role || 'EMPLOYEE');
            localStorage.setItem('employee_id', data.employee_id);

            setToken(data.token);
            setRole(data.role || 'EMPLOYEE');
            setCurrentEmployee(data); // biasanya backend kasih data employee langsung

            return data;
        } catch (err) {
            const msg = err.response?.data?.message || 'Login gagal. Email/password salah.';
            setError(msg);
            throw new Error(msg);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('employee_id');
        setToken(null);
        setRole(null);
        setCurrentEmployee(null);
    };

    const getAllEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchEmployees();
            // Backend langsung return List<EmployeeResponse>
            setEmployees(res.data || []);
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal mengambil data karyawan';
            setError(msg);
            console.error('[EmployeeContext] getAllEmployees error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Tambah karyawan baru
    const createEmployee = async (employeeData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await addEmployee(employeeData);
            const newEmployee = res.data; // EmployeeResponse
            setEmployees((prev) => [...prev, newEmployee]);
            return newEmployee;
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal menambah karyawan';
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update karyawan (dengan foto opsional)
    const updateEmployee = async (employeeId, data, file = null) => {
        setLoading(true);
        setError(null);

        const formData = new FormData();

        // Bagian JSON harus dikirim sebagai string dengan key "employee"
        const employeeJson = {
            username: data.username,
            email: data.email,
            ...(data.password && { password: data.password }), // password optional
        };
        formData.append('employee', JSON.stringify(employeeJson));

        // Kalau ada file foto
        if (file) {
            formData.append('file', file);
        }

        try {
            const res = await updateEmployeeProfile(employeeId, formData);
            const updatedEmployee = res.data;

            setEmployees((prev) =>
                prev.map((emp) =>
                    emp.employee_id === employeeId ? updatedEmployee : emp
                )
            );

            return updatedEmployee;
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal mengupdate karyawan';
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Hapus karyawan
    const removeEmployee = async (employeeId) => {
        setLoading(true);
        setError(null);
        try {
            await deleteEmployee(employeeId);
            setEmployees((prev) => prev.filter((emp) => emp.employee_id !== employeeId));
        } catch (err) {
            const msg = err.response?.data?.message || 'Gagal menghapus karyawan';
            setError(msg);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Load data saat pertama kali mount
    useEffect(() => {
        if (token && role === 'ADMIN') {
            getAllEmployees();
        }
    }, [token, role]);

    const value = {
        // Auth
        currentEmployee,
        setCurrentEmployee,
        token,
        role,
        isAuthenticated: !!token,
        login,
        logout,

        // CRUD
        employees,
        loading,
        error,
        getAllEmployees,
        createEmployee,
        updateEmployee,
        removeEmployee,
        clearError: () => setError(null),
    };

    return (
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    );
};

