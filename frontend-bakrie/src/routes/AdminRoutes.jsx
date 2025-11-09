import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/admin/AdminLayout";
import DashBoardPage from "../pages/Admins/Dashboard/DashBoardPage";
import ProductsPage from "../pages/Admins/Products/ProductsPage"
import AddProductsPage from "../pages/Admins/Products/AddProductsPage";
import EditProductPage from "../pages/Admins/Products/EditProductPage";

function AdminRoutes() {
  return (
  <Routes>
  <Route path="/" element={<AdminLayout />}>
    <Route index element={<DashBoardPage />} />
    <Route path="dashboard" element={<DashBoardPage />} />
    <Route path="products" element={<ProductsPage />} />
    <Route path="products/add" element={<AddProductsPage/>}/>
    <Route path="/admin/products/edit/:id" element={<EditProductPage />} />
  </Route>
</Routes>

  );
}

export default AdminRoutes;
