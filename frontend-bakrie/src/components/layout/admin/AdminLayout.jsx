import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { HiOutlineBell } from "react-icons/hi";
import { HiMenu, HiX } from "react-icons/hi";
import AdminSidebar from "./AdminSidebar";
import { motion } from "framer-motion";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} />

      
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "lg:ml-[288px]" : "lg:ml-0" 
        }`}
      >
        
        <header className="fixed top-0 right-0 left-0 z-40 bg-ookay border-b border-ookay/30 shadow-sm flex items-center justify-between h-28 px-8 lg:px-12"> {/* Tinggi dan padding diperbesar */}
    
          <div className="flex items-between gap-6">
        
            <button
              onClick={toggleSidebar}
              className="text-yes hover:bg-yes/10 p-3 rounded-lg transition" 
            >
              {sidebarOpen ? (
                <HiX className="w-8 h-8" />
              ) : (
                <HiMenu className="w-8 h-8" /> 
              )}
            </button>

           <motion.img
              src="/logo/Patteserie.svg"
              alt="Patteserie"
              className="w-48"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            />

          </div>

          {/* KANAN: Notifikasi + Profil */}
          <div className="flex items-center gap-6"> {/* Gap diperbesar */}
            {/* Tombol Notifikasi */}
            <button className="relative text-yes hover:text-yes/80 transition p-2">
              <HiOutlineBell className="w-7 h-7" /> {/* Icon diperbesar */}
              <span className="absolute top-1 right-1 w-3 h-3 bg-yes rounded-full" /> {/* Notif dot diperbesar */}
            </button>

            {/* Profil Admin */}
            <div className="flex items-center gap-4"> {/* Gap diperbesar */}
              <div className="w-12 h-12 rounded-full bg-yes text-white flex items-center justify-center font-semibold text-lg"> {/* Profile diperbesar */}
                A
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-base font-semibold text-yes leading-none"> {/* Text diperbesar */}
                  Admin
                </span>
                <span className="text-sm text-yes/70">Administrator</span> {/* Text diperbesar */}
              </div>
            </div>
          </div>
        </header>

        <main className="pt-28 px-8 lg:px-12 bg-white min-h-screen"> {/* Padding top disesuaikan dengan navbar besar */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;