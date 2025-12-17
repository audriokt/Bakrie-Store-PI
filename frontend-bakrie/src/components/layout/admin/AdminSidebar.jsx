import { motion } from "framer-motion";
import {
  Home,
  Package,
  ShoppingBag,
  Users,
  UserCheck,
  Clock,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { path: "/admin/dashboard", icon: Home, label: "Dashboard" },
  { path: "/admin/products", icon: Package, label: "Products" },
  { path: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { path: "/admin/customers", icon: Users, label: "Customers" },
  { path: "/admin/employees", icon: UserCheck, label: "Employees" },
  { path: "/admin/transactions", icon: Clock, label: "Transaction History" },
];

const AdminSidebar = () => {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 bg-gradient-to-b from-pink-200 via-pink-100 to-pink-50 flex flex-col shadow-lg"
    >
      {/* Logo */}
      <div className="p-8 flex justify-center">
        <img
          src="/logo/Patteserie.svg"
          alt="Patteserie Logo"
          className="w-40 h-auto"
        />
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.label} to={item.path}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-3xl transition-all
                    ${
                      isActive
                        ? "bg-white text-red-600 shadow-lg"
                        : "text-gray-600 hover:bg-pink-200/50"
                    }
                  `}
                >
                  <Icon size={24} />
                  <span className="text-base font-semibold">
                    {item.label}
                  </span>
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="p-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="w-full flex items-center space-x-3 p-4 rounded-3xl bg-white/50 hover:bg-pink-200/50 transition-all"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">Admin</p>
            <p className="text-xs text-gray-500">
              admin@patteserie.com
            </p>
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default AdminSidebar;
