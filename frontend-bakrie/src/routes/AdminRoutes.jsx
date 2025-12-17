import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/admin/AdminLayout";

// pages
import AdminDashBoardPage from "../pages/Admins/Dashboard/AdminDashBoardPage";
import ProductsPage from "../pages/Admins/Products/ProductsPage";
import AddProductsPage from "../pages/Admins/Products/AddProductsPage";
import EditProductPage from "../pages/Admins/Products/EditProductPage";

import EmployeesPage from "../pages/Admins/Employees/EmployeesPage";
import AddEmployeePage from "../pages/Admins/Employees/AddEmployeePage";
import EditEmployeePage from "../pages/Admins/Employees/EditEmployeePage";

import OrdersPage from "../pages/Admins/Orders/OrdersPage";
import OrderDetailPage from "../pages/Admins/Orders/OrderDetailPage";

import CustomerPage from "../pages/Admins/Customers/CustomerPage";

import TransactionHistoryPage from "../pages/Admins/Transactions/TransactionHistoryPage";
import AdminTransactionDetailPage from "../pages/Admins/Transactions/AdminTransactionDetailPage";

import OrderConfirmationPage from "../pages/Cashier/Orders/OrdersConfirmation";
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<AdminDashBoardPage />} />
        <Route path="dashboard" element={<AdminDashBoardPage />} />

        <Route path="products">
          <Route index element={<ProductsPage />} />
          <Route path="add" element={<AddProductsPage />} />
          <Route path="edit/:id" element={<EditProductPage />} />
        </Route>

        <Route path="employees">
          <Route index element={<EmployeesPage />} />
          <Route path="add" element={<AddEmployeePage />} />
          <Route path="edit/:id" element={<EditEmployeePage />} />
        </Route>

        <Route path="orders">
          <Route index element={<OrdersPage />} />
          <Route path=":id" element={<OrderDetailPage />} />
        </Route>

        <Route path="customers" element={<CustomerPage />} />

        <Route path="transactions">
          <Route index element={<TransactionHistoryPage />} />
          <Route
            path=":transactionId"
            element={<AdminTransactionDetailPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
