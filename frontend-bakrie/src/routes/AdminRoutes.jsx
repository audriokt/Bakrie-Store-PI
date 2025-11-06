import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/admin/adminlayout";
import DashBoardPage from "../pages/Admins/Dashboard/DashBoardPage";

// import halaman admin lain di sini

const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/admin/dashboard" element={<DashBoardPage />} />
        {/* tambahkan halaman admin lain */}
        {/* <Route path="/admin/products" element={<ProductListPage />} /> */}
      </Routes>
    </AdminLayout>
  );
};

export default AdminRoutes;
