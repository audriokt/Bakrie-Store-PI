import React from "react";
import AdminSidebar from "./AdminSideBar";// Sidebar Admin kamu

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#fff8f8]">
      {/* Sidebar di kiri */}
      <Sidebar />

      {/* Konten utama */}
      <div className="flex-1">
        <Navbar />
        <main className="pt-24 p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
