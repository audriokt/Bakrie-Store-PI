import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarItems,
  SidebarItem,
  SidebarItemGroup,
} from "flowbite-react";
import {
  HiShoppingBag,
  HiUserGroup,
  HiUsers,
  HiTable,
  HiUserCircle,
  HiChartPie,
  HiInbox,
  HiMenu,
  HiX,
} from "react-icons/hi";

const AdminSidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const baseItemClass =
    "!bg-ookay !text-yes hover:!bg-ookay/80 hover:!text-yes transition-all duration-200";
  const activeItemClass = "!bg-yes !text-white";
  const isActive = (path) => location.pathname.includes(path);

  const navItems = [
    { to: "/admin/dashboard", icon: HiChartPie, label: "Dashboard" },
    { to: "/admin/products", icon: HiShoppingBag, label: "Products" },
    { to: "/admin/orders", icon: HiInbox, label: "Order List" },
    { to: "/admin/employees", icon: HiUserGroup, label: "Employees" },
    { to: "/admin/customers", icon: HiUsers, label: "Customers" },
    { to: "/admin/transactions", icon: HiTable, label: "Transaction Report" },
    { to: "/admin/profile", icon: HiUserCircle, label: "Profile" },
  ];

  const handleNavClick = (to) => navigate(to);

  return (
    <>

      <motion.div
        initial={false}
        animate={{ width: isOpen ? 288 : 80 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex flex-col bg-ookay border-r border-ookay/30 shadow-lg fixed z-[997] overflow-hidden pt-16"
        style={{
          top: 0,
          height: "100vh",
        }}
      >
        {/* hamburger dalam sidebarnya */}
        <div className="hidden lg:flex items-center justify-center p-4 bg-ookay border-b border-ookay/30 fixed top-0 left-0 w-20 z-50">
          <button
            onClick={onToggle}
            className="text-yes hover:bg-yes/10 p-2 rounded-lg transition"
          >
            {isOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* navigation */}
        <div className="flex-1 py-4">
          <Sidebar
            aria-label="Admin Sidebar"
            className="!bg-transparent !border-none [&>*]:!bg-transparent"
          >
            <SidebarItems className="!bg-transparent">
              <SidebarItemGroup className="!border-0 !space-y-1 !px-2 !bg-transparent">
                {navItems.map((item) => (
                  <SidebarItem
                    key={item.to}
                    icon={item.icon}
                    onClick={() => handleNavClick(item.to)}
                    active={isActive(item.to)}
                    className={`${baseItemClass} ${
                      isActive(item.to) ? activeItemClass : ""
                    } ${isOpen ? "" : "!justify-center"} !rounded-lg !py-3 !bg-ookay`}
                  >
                    {isOpen && item.label}
                  </SidebarItem>
                ))}
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
        </div>

        {/* Footer */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-t border-ookay/30 bg-ookay/60"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yes rounded-full flex items-center justify-center">
                <HiUserCircle className="text-white text-lg" />
              </div>
              <div>
                <p className="text-sm font-medium text-yes">Admin</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default AdminSidebar;
