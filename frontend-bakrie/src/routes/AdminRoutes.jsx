import { Routes, Route } from "react-router-dom";
import AdminLayout from "../components/layout/admin/AdminLayout.jsx";
import AdminDashBoardPage from "../pages/Admins/Dashboard/AdminDashBoardPage.jsx";
import ProductsPage from "../pages/Admins/Products/ProductsPage";
import AddProductsPage from "../pages/Admins/Products/AddProductsPage";
import EditProductPage from "../pages/Admins/Products/EditProductPage";
import EmployeesPage from "../pages/Admins/Employees/EmployeesPage";
import AddEmployeePage from "../pages/Admins/Employees/AddEmployeePage";
import EditEmployeePage from "../pages/Admins/Employees/EditEmployeePage";
import OrdersPage from "../pages/Admins/Orders/OrdersPage";
import OrderDetailPage from "../pages/Admins/Orders/OrderDetailPage";
import CustomerPage from "../pages/Admins/Customers/CustomerPage";

function AdminRoutes() {
    return (
        <Routes>
            {/* Semua route admin di-wrap oleh AdminLayout */}
            {/*<Route path="/admin" element={<AdminLayout />}>*/}
            {/*    /!* Dashboard *!/*/}
            {/*    <Route index element={<AdminDashBoardPage />} /> /!* /admin *!/*/}
            {/*    <Route path="dashboard" element={<AdminDashBoardPage />} /> /!* /admin/dashboard *!/*/}
            {/*    /!* Products *!/*/}
            {/*    <Route path="products">*/}
            {/*        <Route index element={<ProductsPage />} /> /!* /admin/products *!/*/}
            {/*        <Route path="add" element={<AddProductsPage />} /> /!* /admin/products/add *!/*/}
            {/*        <Route path="edit/:id" element={<EditProductPage />} /> /!* /admin/products/edit/123 *!/*/}
            {/*    </Route>*/}

            {/*    /!* Employees *!/*/}
            {/*    <Route path="employees">*/}
            {/*        <Route index element={<EmployeesPage />} />*/}
            {/*        <Route path="add" element={<AddEmployeePage />} />*/}
            {/*        <Route path="edit/:id" element={<EditEmployeePage />} />*/}
            {/*    </Route>*/}

            {/*    /!* Orders *!/*/}
            {/*    <Route path="orders">*/}
            {/*        <Route index element={<OrdersPage />} /> /!* /admin/orders *!/*/}
            {/*        <Route path=":id" element={<OrderDetailPage />} /> /!* /admin/orders/123 *!/*/}
            {/*        /!* atau jika mau lebih jelas: <Route path="detail/:id" element={<OrderDetailPage />} /> *!/*/}
            {/*    </Route>*/}
            {/*    /!* Customers *!/*/}
            {/*    <Route path="customers" element={<CustomerPage />} /> /!* /admin/customers *!/*/}
            {/*</Route>*/}
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashBoardPage />} />
                <Route path="dashboard" element={<AdminDashBoardPage />} />
            </Route>
        </Routes>
    );
}

export default AdminRoutes;