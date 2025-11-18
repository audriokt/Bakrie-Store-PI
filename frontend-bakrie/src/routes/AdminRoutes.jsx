import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/admin/AdminLayout";
import DashBoardPage from "../pages/Admins/Dashboard/DashBoardPage";
import ProductsPage from "../pages/Admins/Products/ProductsPage";
import AddProductsPage from "../pages/Admins/Products/AddProductsPage";
import EditProductPage from "../pages/Admins/Products/EditProductPage";
import EmployeesPage from "../pages/Admins/Employees/EmployeesPage";
import AddEmployeePage from "../pages/Admins/Employees/AddEmployeePage";
import EditEmployeePage from "../pages/Admins/Employees/EditEmployeePage";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashBoardPage />} />
        <Route path="dashboard" element={<DashBoardPage />} />

        {/* Products */}
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/add" element={<AddProductsPage />} />
        <Route path="products/edit/:id" element={<EditProductPage />} />

        {/* Employees */}
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="employees/add" element={<AddEmployeePage />} />
        <Route path="employees/edit/:id" element={<EditEmployeePage />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
