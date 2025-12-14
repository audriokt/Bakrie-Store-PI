import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiUpload } from "react-icons/hi";
import api from "../../../services/adminDashboardService.js";

const EditEmployeePage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const employee = state?.employee;
    const [preview, setPreview] = useState(employee.img_url || null);
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        username: employee.username || "",
        email: employee.email || "",
    });

    // Jika tidak ada data, redirect
    if (!employee) {
        alert("Data karyawan tidak ditemukan.");
        navigate("/admin/employees");
        return null;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!form.username || !form.email) {
            alert("Nama dan email wajib diisi!");
            return;
        }

        const employeeData = {
            username: form.username.trim(),
            email: form.email.trim(),
        };

        const formData = new FormData();
        formData.append("employee", JSON.stringify(employeeData));
        if (file) {
            formData.append("file", file);
        }

        try {
            // Backend kamu pakai POST/PUT? Dari kode sebelumnya sepertinya POST untuk update juga
            await api.post(`/employees`, formData); // atau PUT jika ada
            alert("Karyawan berhasil diperbarui!");
            navigate("/admin/employees");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Gagal memperbarui karyawan.");
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white w-full max-w-6xl rounded-2xl shadow-lg p-10"
            >
                <h2 className="text-3xl font-bold text-red-600 mb-8">Edit Employee</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name *
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-ookay rounded-xl focus:outline-none focus:ring-2 focus:ring-yes/40 transition"
                                placeholder="Masukkan nama lengkap"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-ookay rounded-xl focus:outline-none focus:ring-2 focus:ring-yes/40 transition"
                                placeholder="email@company.com"
                            />
                        </div>
                    </div>

                    {/* Image */}
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-10 bg-gray-50 hover:border-red-400 transition">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            Profile Photo
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">Change photo (optional)</p>

                        <label
                            htmlFor="photoUpload"
                            className="cursor-pointer w-full h-80 flex items-center justify-center"
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="max-h-full max-w-full object-contain rounded-xl shadow-md"
                                />
                            ) : (
                                <div className="text-center">
                                    <HiUpload className="mx-auto text-5xl text-gray-400 mb-4" />
                                    <p className="text-gray-600">Click to upload new photo</p>
                                </div>
                            )}
                            <input
                                id="photoUpload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-12">
                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => navigate("/admin/employees")}
                        className="px-8 py-3 rounded-xl bg-gray-700 text-white hover:bg-gray-800 transition"
                    >
                        Cancel
                    </motion.button>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        onClick={handleUpdate}
                        className="px-8 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Save Changes
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default EditEmployeePage;