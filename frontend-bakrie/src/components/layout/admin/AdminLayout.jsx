import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { HiOutlineBell } from "react-icons/hi";
import AdminSidebar from "./AdminSidebar";
import { motion } from "framer-motion";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-ookay/20">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "lg:ml-[288px]" : "lg:ml-[80px]"
        }`}
      >
        <header className="fixed top-0 right-0 left-0 z-40 bg-ookay border-b border-ookay/30 shadow-sm h-28 px-4 lg:px-6 flex items-center">
  
  {/* Kolom kiri - kosong */}
  <div className="flex-1" />

  {/* Kolom tengah - Logo */}
  <div className="flex-1 flex justify-end">
    <motion.img
      src="/logo/Patteserie.svg"
      alt="Patteserie"
      className="w-48"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    />
  </div>

  {/* Kolom kanan - Notifikasi + Profil (lebih mepet kanan) */}
  <div className="flex-1 flex items-center justify-end gap-6 pr-2">
    {/* <button className="relative text-yes hover:text-yes/80 transition p-2">
      <HiOutlineBell className="w-7 h-7" />
      <span className="absolute top-1 right-1 w-3 h-3 bg-yes rounded-full" />
    </button> */}

    <div className="flex items-center gap-4">
      <div className="hidden sm:flex flex-col">
        <span className="text-base font-semibold text-yes leading-none">
          Admin
        </span>
      </div>
    </div>
  </div>
</header>

        <main className="pt-28 px-8 lg:px-12 bg-ookay/20 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
