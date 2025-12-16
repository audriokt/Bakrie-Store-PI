import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { HiOutlineBell } from "react-icons/hi";
import { motion } from "framer-motion";
import AdminSidebar from "./AdminSidebar.jsx";

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    console.log("AdminLayout rendered");
    return (
        <div className="flex min-h-screen bg-gray-100"> {/* gunakan warna default dulu */}
            {/* Sidebar */}
            <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

            {/* Main content */}
            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${
                    sidebarOpen ? "lg:ml-[288px]" : "lg:ml-[80px]"
                }`}
            >
                {/* Header */}
                <header className="fixed top-0 right-0 left-0 z-40 bg-white border-b border-gray-200 shadow-sm h-20 px-4 lg:px-6 flex items-center">
                    {/* Kolom kiri */}
                    <div className="flex-1" />

                    {/* Kolom tengah - Logo */}
                    <div className="flex-1 flex justify-center">
                        <motion.img
                            src="/logo/Patteserie.svg"
                            alt="Patisserie"
                            className="w-40"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                    </div>

                    {/* Kolom kanan - Profil */}
                    <div className="flex-1 flex items-center justify-end gap-6 pr-2">
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex flex-col">
                <span className="text-base font-semibold text-gray-700 leading-none">
                  Admin
                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Konten utama */}
                <main className="pt-24 px-8 lg:px-12 bg-gray-50 min-h-screen">
                    <Outlet /> {/* ⬅️ Child route akan muncul di sini */}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;