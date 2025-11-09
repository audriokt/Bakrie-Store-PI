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
} from "react-icons/hi";

const AdminSidebar = ({ isOpen }) => {
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

  const handleNavClick = (to) => {
    navigate(to);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={false}
        animate={{ width: isOpen ? 288 : 80 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:flex flex-col bg-ookay border-r border-ookay/30 shadow-lg fixed z-[997] overflow-hidden"
        style={{
          top: "5rem",
          height: "calc(100vh - 5rem)",
        }}
      >
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
                    onClick={() => handleNavClick(item.to)} // ✅ Ganti Link dengan navigate
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

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="lg:hidden fixed top-0 left-0 h-screen w-72 bg-ookay border-r border-ookay/30 shadow-lg z-[998]"
      >
        <div className="py-8">
          <Sidebar aria-label="Admin Sidebar" className="!bg-transparent !border-none">
            <SidebarItems className="!bg-transparent">
              <SidebarItemGroup className="!border-0 !space-y-1 !px-2 !bg-transparent">
                {navItems.map((item) => (
                  <SidebarItem
                    key={item.to}
                    icon={item.icon}
                    onClick={() => handleNavClick(item.to)} // ✅ Navigasi juga
                    active={isActive(item.to)}
                    className={`${baseItemClass} ${
                      isActive(item.to) ? activeItemClass : ""
                    } !rounded-lg !py-4 !px-4 !bg-ookay text-lgy`}
                  >
                    {item.label}
                  </SidebarItem>
                ))}
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-ookay/30 bg-ookay/60">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-yes rounded-full flex items-center justify-center">
              <HiUserCircle className="text-yes text-xl" />
            </div>
            <div>
              <p className="text-sm font-medium text-yes">Admin</p>
              <p className="text-xs text-yes/70">Administrator</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminSidebar;
