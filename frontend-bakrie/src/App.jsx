import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/layout/footer/footer'
import Navbar from './components/layout/navbar/Navbar'
import HomePage from './components/pages/home/HomePage'
import AboutPage from './components/pages/about/AboutPage'

import LoginPage from './components/layout/AuthPages/Login/LoginPage'
import SignUpPage from './components/layout/AuthPages/SignUp/SignUpPage'



function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* route untuk login sama sign up */}
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
        </Routes>
      <Footer />
    </>
  )
}

export default App
