import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";

//  Layouts
import Footer from "./components/layout/footer/Footer";
import Navbar from "./components/layout/navbar/Navbar";

// Pages (semua di luar folder components)
import HomePage from "./pages/home/HomePage";
import AboutPage from "./pages/about/AboutPage.jsx";
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
import TransactionPage from "./pages/transaction/TransactionPage";
import OrderHistoryPage from "./pages/transaction/OrderHistoryPage";
import OrderHistoryDetailPage from "./pages/transaction/OrderHistoryDetailPage";

// Admin Routes
import AdminRoutes from "./routes/AdminRoutes.jsx";

function App() {
  const location = useLocation();

  // // deteksi halaman admin
  // const isAdminPage = location.pathname.startsWith("/admin");
  // deteksi halaman yang tidak menampilkan navbar/footer
  const hideNavbarFooter =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/login-employee";

  console.log("Current path:", location.pathname);
  return (
    <>
    {/* klo true di halaman login signup maka navbar dihilangin */}
      {!hideNavbarFooter && <Navbar />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

         {/* route untuk catalog dan product details */}
          <Route path='/products' element={<ProductPage/>}></Route>
          <Route path='/product-detail' element={<ProductDetailPage/>}/>

            {/* route untuk carts */}
            <Route path='/carts' element={<CartsPage/>}/>
            <Route path='/transaction' element={<TransactionPage/>}/>
            <Route path='/order-history' element={<OrderHistoryPage/>}/>
            <Route path="/orders/:orderId" element={<OrderHistoryDetailPage />} />

            {/* route untuk login sama sign up */}
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/login-employee" element={<LoginPageEmployee />}></Route>
          <Route path='/signup' element={<SignUpPage/>}/>
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
