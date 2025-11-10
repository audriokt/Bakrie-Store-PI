import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { HiOutlineBell } from "react-icons/hi";
import AdminSidebar from "./AdminSidebar";
import { motion } from "framer-motion";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "lg:ml-[288px]" : "lg:ml-[80px]"
        }`}
      >
        <header className="fixed top-0 right-0 left-0 z-40 bg-ookay border-b border-ookay/30 shadow-sm flex items-center justify-between h-28 px-8 lg:px-12">
          {/* Logo di kanan */}
          <motion.img
            src="/logo/Patteserie.svg"
            alt="Patteserie"
            className="w-48 ml-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Kanan: Notifikasi + Profil */}
          <div className="flex items-center gap-6 ml-10">
            <button className="relative text-yes hover:text-yes/80 transition p-2">
              <HiOutlineBell className="w-7 h-7" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-yes rounded-full" />
            </button>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yes text-white flex items-center justify-center font-semibold text-lg">
                A
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-base font-semibold text-yes leading-none">
                  Admin
                </span>
                <span className="text-sm text-yes/70">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <main className="pt-28 px-8 lg:px-12 bg-white min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
