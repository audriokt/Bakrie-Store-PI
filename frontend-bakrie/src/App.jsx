import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/layout/footer/footer'
import Navbar from './components/layout/navbar/Navbar'
import HomePage from './components/pages/home/HomePage'
import AboutPage from './components/pages/about/AboutPage'



function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      <Footer />
    </>
  )
}

export default App
