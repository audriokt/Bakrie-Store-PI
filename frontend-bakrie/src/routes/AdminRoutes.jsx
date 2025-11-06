import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/admin/AdminLayout";
import DashBoardPage from "../pages/Admins/Dashboard/DashBoardPage";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashBoardPage />} />
        <Route path="dashboard" element={<DashBoardPage />} />
        {/* Tambahkan route admin lainnya di sini */}
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
