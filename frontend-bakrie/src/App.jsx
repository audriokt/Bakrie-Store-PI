import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

// Layouts
import Footer from "./components/layout/footer/Footer";
import Navbar from "./components/layout/navbar/Navbar";

// Pages (Non-admin)
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage";
import ProductPage from "./pages/product/ProductPage";

// Catalog & Cart
import ProductDetailPage from "./pages/CatalogPages/ProductDetail/ProductDetailPage";
import CartsPage from "./pages/Carts/CartsPage";

// Auth & Profile
import LoginPage from "./pages/AuthPages/Login/LoginPage";
import SignUpPage from "./pages/AuthPages/SignUp/SignUpPage";
import UserProfilePage from "./pages/Profile/UserProfile/UserProfilePage";
import EditProfilePage from "./pages/Profile/EditProfile/EditProfilePage";
import EditPasswordPage from "./pages/Profile/EditProfile/EditPasswordPage";
import LoginPageEmployee from "./pages/AuthPages/Login/LoginPageEmployee";

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
    {/* klo true di halaman login signup maka navbar dihilangin */}
      {!hideNavbarFooter && <Navbar />}

        <Routes>
            {/* Route untuk user biasa */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* route untuk catalog dan product details */}
            <Route path='/products' element={<ProductPage/>}></Route>
            <Route path='/product-detail' element={<ProductDetailPage/>}/>
            {/* route untuk carts */}
            <Route path='/carts' element={<CartsPage/>}/>

            {/* route untuk login sama sign up */}
            {/* Auth */}
            <Route path='/login' element={<LoginPage/>}/>
            <Route path="/login-employee" element={<LoginPageEmployee />}></Route>
            <Route path='/signup' element={<SignUpPage/>}/>
            {/* Profile */}
            <Route path='/profile' element={<UserProfilePage/>}/>
            <Route path='/edit-profile' element={<EditProfilePage/>}/>
            <Route path='/edit-password' element={<EditPasswordPage/>}/>

            {/* Route untuk halaman admin */}
            <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  )
}

export default App
