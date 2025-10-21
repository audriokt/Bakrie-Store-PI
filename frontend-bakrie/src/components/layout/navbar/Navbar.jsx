import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  // atur hamburger menu
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  // atur sliding navbar
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      // jika scroll nya sudah lebih dari 10 px maka muncul bg nya
      if (window.scrollY > 10) setIsScrolled(true);
      else setIsScrolled(false);
    }

    // hanya di homepage bg navbar nya yang hilang timbul sesuai scroll
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      setIsScrolled(false);
    } else {
      setIsScrolled(true); // selain di homepage bg nya selalu muncul
    }

    return () => window.removeEventListener("scroll", handleScroll)}, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] flex justify-between items-center w-full h-28 px-10 ${
        location.pathname === "/" ? "transition-all duration-500" : "" } 
        ${isScrolled ? "bg-ookay shadow-md backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      {/* Hamburger Menu */}
      <button className="flex justify-center items-center gap-2 w-auto relative z-[999]" onClick={ handleClick }>
        <div className="flex flex-col gap-1">
          <span className={`w-7 h-[3px] bg-yes rounded-s transition-transform duration-300 ${isOpen && "rotate-45 translate-y-2"}`}></span>
          <span className={`w-7 h-[3px] bg-yes rounded-s transition-[width] ${isOpen && "w-auto m-auto"}`}></span>
          <span className={`w-7 h-[3px] bg-yes rounded-s transition-transform duration-300 ${isOpen && "-rotate-45 -translate-y-1.5"}`}></span>
        </div>
      </button>
      <div className="w-full">
        <img src="./logo/Patteserie.svg" alt="Patteserie" className="w-48" />
      </div>
      <Link to="/carts" className=""><i className="bx bx-shopping-bag text-2xl text-yes"></i></Link>
      
      {/* sidebar menu section */}
      {isOpen && (
        <>
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-0 left-0 min-h-screen min-w-80 bg-ookay z-[899]">
            <div className="flex flex-col items-start text-left absolute left-10 pt-28 gap-10 text-lg font-semibold text-yes">
              <Link to="/" className="w-full">Home</Link>
              <Link to="/products" className="w-full">Products</Link>
              <Link to="/about" className="w-full">About Us</Link>
              <div className="flex w-56">
                <Link to="/login" className="flex items-center gap-2 text-yes absolute"><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#C31D1D"><path d="M19 12H12M12 12L15 15M12 12L15 9" stroke="#C31D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18" stroke="#C31D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                <span>Login</span>
                </Link>
              </div>
            </div>
          </motion.div> 

          {/* Darken overlay */}
          <motion.div transition={{ duration: 0.5, ease: "easeInOut" }} className="fixed inset-0 bg-opacity-15 backdrop-blur-[2px]" onClick={handleClick}></motion.div>
        </>
      )}
    </nav>
  )
}

export default Navbar