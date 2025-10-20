import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/layout/footer/footer'
import Navbar from './components/layout/navbar/Navbar'
import HomePage from './components/pages/home/HomePage'
import AboutPage from './components/pages/about/AboutPage'

import LoginPage from './components/AuthPages/Login/LoginPage'
import SignUpPage from './components/AuthPages/SignUp/SignUpPage'

import ProductDetailPage from './components/CatalogPages/ProductDetail/ProductDetailPage'
import CartsPage from './components/Carts/CartsPage'
function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

        {/* route untuk catalog dan product details */}
          <Route path='/product-detail' element={<ProductDetailPage/>}/>

          {/* route untuk carts */}
          <Route path='/carts' element={<CartsPage/>}/>
        </Routes>
      <Footer />
    <Routes>
         {/* route untuk login sama sign up */}
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
    </Routes>
    </>
  )
}

export default App
