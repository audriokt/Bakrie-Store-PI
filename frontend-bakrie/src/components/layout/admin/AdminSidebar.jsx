import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar as FlowSidebar,
  SidebarItems,
  SidebarItem,
  SidebarItemGroup,
} from "flowbite-react";
import {
  HiHome,
  HiShoppingBag,
  HiClipboardList,
  HiPencilAlt,
  HiPlusCircle,
  HiUserGroup,
  HiUsers,
  HiDocumentReport,
  HiUserCircle,
} from "react-icons/hi";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const handleClick = () => setIsOpen(!isOpen);

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

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[999] flex justify-between items-center w-full h-20 px-10 transition-all duration-500 ${
          isScrolled ? "bg-ookay shadow-md backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        {/* Hamburger Menu */}
        <button
          className="flex flex-col justify-center items-center gap-1 w-8 h-8 z-[1000]"
          onClick={handleClick}
        >
          <span
            className={`w-7 h-[3px] bg-yes rounded-sm transition-transform duration-300 ${
              isOpen && "rotate-45 translate-y-2"
            }`}
          ></span>
          <span
            className={`w-7 h-[3px] bg-yes rounded-sm transition-[width] ${
              isOpen && "w-0"
            }`}
          ></span>
          <span
            className={`w-7 h-[3px] bg-yes rounded-sm transition-transform duration-300 ${
              isOpen && "-rotate-45 -translate-y-1.5"
            }`}
          ></span>
        </button>

        <div className="flex justify-center w-full">
          <img src="./logo/Patteserie.svg" alt="Patteserie" className="w-40" />
        </div>

        <Link to="/carts">
          <i className="bx bx-shopping-bag text-2xl text-yes"></i>
        </Link>
      </nav>

      {/* Sidebar Admin */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-screen w-72 bg-ookay shadow-lg z-[998]"
      >
        <FlowSidebar aria-label="Admin Dashboard Sidebar" className="h-full bg-ookay">
          <SidebarItems>
            <SidebarItemGroup>
              <SidebarItem icon={HiHome}>
                <Link to="/admin/dashboard" onClick={handleClick}>Dashboard</Link>
              </SidebarItem>
              <SidebarItem icon={HiShoppingBag}>
                <Link to="/admin/products" onClick={handleClick}>Product List</Link>
              </SidebarItem>
              <SidebarItem icon={HiPencilAlt}>
                <Link to="/admin/products/edit" onClick={handleClick}>Product Edit</Link>
              </SidebarItem>
              <SidebarItem icon={HiPlusCircle}>
                <Link to="/admin/products/new" onClick={handleClick}>New Product</Link>
              </SidebarItem>
              <SidebarItem icon={HiClipboardList}>
                <Link to="/admin/orders" onClick={handleClick}>Order List</Link>
              </SidebarItem>
              <SidebarItem icon={HiClipboardList}>
                <Link to="/admin/orders/details" onClick={handleClick}>Order Details</Link>
              </SidebarItem>
              <SidebarItem icon={HiUserGroup}>
                <Link to="/admin/employees" onClick={handleClick}>Employees</Link>
              </SidebarItem>
              <SidebarItem icon={HiUsers}>
                <Link to="/admin/customers" onClick={handleClick}>Customers</Link>
              </SidebarItem>
              <SidebarItem icon={HiDocumentReport}>
                <Link to="/admin/transactions" onClick={handleClick}>Transaction Report</Link>
              </SidebarItem>
              <SidebarItem icon={HiUserCircle}>
                <Link to="/admin/profile" onClick={handleClick}>Profile</Link>
              </SidebarItem>
            </SidebarItemGroup>
          </SidebarItems>
        </FlowSidebar>
      </motion.div>

      {isOpen && (
        <motion.div
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black backdrop-blur-sm z-[900]"
        ></motion.div>
      )}
    </>
  );
};

export default AdminSidebar;
