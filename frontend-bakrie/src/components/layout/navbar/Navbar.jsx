import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="flex justify-between items-center w-screen h-28 bg-none margin-0 px-10 auto relative">
      {/* Hamburger Menu */}
      <button className="flex justify-center items-center gap-2 w-auto relative z-50" onClick={ handleClick }>
        <div className="flex flex-col gap-1">
          <span className={`w-7 h-[3px] bg-yes rounded-s transition-transform duration-300 ${isOpen && "rotate-45 translate-y-2"}`}></span>
          <span className={`w-7 h-[3px] bg-yes rounded-s transition-[width] ${isOpen && "w-auto m-auto"}`}></span>
          <span className={`w-7 h-[3px] bg-yes rounded-s transition-transform duration-300 ${isOpen && "-rotate-45 -translate-y-1.5"}`}></span>
        </div>
      </button>
      <img src="./logo/Patteserie.svg" alt="Patteserie" className="w-48" />
      <a href="/" className=""><i className="bx bx-shopping-bag text-2xl text-yes"></i></a>
      
      {/* sidebar menu section */}
      {isOpen && (
        <>
          <motion.div 
            initial={{ x: "-100%" }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-0 left-0 min-h-screen min-w-80 bg-ookay z-40">
            <div className="flex flex-col justify-center absolute left-10 pt-28 gap-10 text-lg font-semibold text-yes">
              {/* sign in */}
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/about">About Us</Link>
              {/* <a href="/"><p>Home</p></a>
              <a href="/products"><p>Products</p></a>
              <a href="/about"><p>About Us</p></a> */}
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