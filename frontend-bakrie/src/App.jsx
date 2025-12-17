import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

// Layouts
import Footer from "./components/layout/footer/Footer";
import Navbar from "./components/layout/navbar/Navbar";

// Pages
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import ProductPage from "./pages/product/ProductPage";
import ProductDetailPage from "./pages/CatalogPages/ProductDetail/ProductDetailPage";
import CartsPage from "./pages/Carts/CartsPage";

// Auth & Profile
import LoginPage from "./pages/AuthPages/Login/LoginPage";
import SignUpPage from "./pages/AuthPages/SignUp/SignUpPage";
import LoginPageEmployee from "./pages/AuthPages/Login/LoginPageEmployee";
import UserProfilePage from "./pages/Profile/UserProfile/UserProfilePage";
import EditProfilePage from "./pages/Profile/EditProfile/EditProfilePage";
import EditPasswordPage from "./pages/Profile/EditProfile/EditPasswordPage";

// Transaction
import TransactionPage from "./pages/transaction/TransactionPage";
import OrderHistoryPage from "./pages/transaction/OrderHistoryPage";
import OrderHistoryDetailPage from "./pages/transaction/OrderHistoryDetailPage";

// Admin
import AdminRoutes from "./routes/AdminRoutes";

//Cashier
import CashierRoutes from "./routes/CashierRoutes";
function App() {
  const location = useLocation();

  const hideNavbarFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/cashier") ||
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/login-employee";

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/products" element={<ProductPage />} />
        <Route path="/product-detail" element={<ProductDetailPage />} />

        <Route path="/carts" element={<CartsPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
        <Route path="/orders/:orderId" element={<OrderHistoryDetailPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-employee" element={<LoginPageEmployee />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/edit-password" element={<EditPasswordPage />} />

        {/* ADMIN */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* CASHIER */}
        <Route path="/cashier/*" element={<CashierRoutes />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
