import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => setIsOpen(!isOpen);

  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) setIsScrolled(true);
      else setIsScrolled(false);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const { user } = useAuth();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[999] flex justify-between items-center w-full h-28 px-10 ${
        location.pathname === "/" ? "transition-all duration-500" : ""
      } ${isScrolled ? "bg-ookay shadow-md backdrop-blur-sm" : "bg-transparent"}`}
    >
      {/* Hamburger Menu */}
      <div className="flex w-20">
        <button
          className="flex justify-center items-center gap-2 w-auto relative z-[999]"
          onClick={handleClick}
        >
          <div className="flex flex-col gap-1">
            <span
              className={`w-7 h-[3px] bg-yes rounded-s transition-transform duration-300 ${
                isOpen && "rotate-45 translate-y-2"
              }`}
            ></span>
            <span
              className={`w-7 h-[3px] bg-yes rounded-s transition-[width] ${
                isOpen && "w-auto m-auto"
              }`}
            ></span>
            <span
              className={`w-7 h-[3px] bg-yes rounded-s transition-transform duration-300 ${
                isOpen && "-rotate-45 -translate-y-1.5"
              }`}
            ></span>
          </div>
        </button>
      </div>

      {/* Logo */}
      <div className="w-full flex justify-center">
        <Link to="/">
          <img src="./logo/Patteserie.svg" alt="Patteserie" className="w-48" />
        </Link>
      </div>

      {/* Profile + Cart Icons */}
      <div className="flex items-center gap-5 min-w-fit">
        <Link to="/profile">
          <img
            src={user.img_url || "defaultProfile/default_profile.png"}
            alt="user"
            className="w-10 h-10 rounded-full object-cover border-2 border-yes shadow-md hover:scale-105 transition"
          />
        </Link>

        <Link to="/carts">
          <i className="bx bx-shopping-bag text-3xl text-yes hover:text-red-700 transition"></i>
        </Link>
      </div>

      {/* Sidebar */}
      {isOpen && (
        <>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-0 left-0 min-h-screen min-w-80 bg-ookay z-[899]"
          >
            <div className="flex flex-col items-start text-left absolute left-10 pt-28 gap-10 text-lg font-semibold text-yes">
              <Link to="/" className="w-full">Home</Link>
              <Link to="/products" className="w-full">Products</Link>
              <Link to="/about" className="w-full">About Us</Link>
              <div className="flex w-56">
                <Link to="/login" className="flex items-center gap-2 text-yes absolute">
                  <svg
                    width="24px"
                    height="24px"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="#C31D1D"
                  >
                    <path
                      d="M19 12H12M12 12L15 15M12 12L15 9"
                      stroke="#C31D1D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18"
                      stroke="#C31D1D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span>Login</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Overlay */}
          <motion.div
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-black bg-opacity-15 backdrop-blur-[2px]"
            onClick={handleClick}
          ></motion.div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
