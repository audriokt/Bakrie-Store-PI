import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

// Layouts
import Footer from "./components/layout/footer/Footer";
import Navbar from "./components/layout/navbar/Navbar";

// Pages (Non-admin)
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import ProductPage from "./pages/product/ProductPage";
import ProductDetailPage from "./pages/CatalogPages/ProductDetail/ProductDetailPage";
import CartsPage from "./pages/Carts/CartsPage";

// Auth & Profile
import LoginPage from "./pages/AuthPages/Login/LoginPage";
import SignUpPage from "./pages/AuthPages/SignUp/SignUpPage";
import UserProfilePage from "./pages/Profile/UserProfile/UserProfilePage";
import EditProfilePage from "./pages/Profile/EditProfile/EditProfilePage";
import EditPasswordPage from "./pages/Profile/EditProfile/EditPasswordPage";

// Admin Routes
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  const location = useLocation();

  // deteksi halaman yang tidak menampilkan navbar/footer
  const hideNavbarFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <>
      {/* tampilkan navbar & footer hanya jika bukan halaman admin / login / signup */}
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        {/* Route untuk user biasa */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product-detail" element={<ProductDetailPage />} />
        <Route path="/carts" element={<CartsPage />} />

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Profile */}
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/edit-password" element={<EditPasswordPage />} />

        {/* Route untuk halaman admin */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
