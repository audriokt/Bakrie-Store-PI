import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const CashierLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-72 bg-white shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-extrabold text-red-600">Kasir</h1>

        <nav className="space-y-3">
          <NavLink
            to="/cashier"
            className="block px-4 py-2 rounded-lg hover:bg-red-100 font-medium"
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/cashier/orders"
            className="block px-4 py-2 rounded-lg hover:bg-red-100 font-medium"
          >
            Order List
          </NavLink>

          <NavLink
            to="/cashier/confirmations"
            className="block px-4 py-2 rounded-lg hover:bg-red-100 font-medium"
          >
            Order Confirmation
          </NavLink>

          <NavLink
            to="/cashier/transactions"
            className="block px-4 py-2 rounded-lg hover:bg-red-100 font-medium"
          >
            Transaction History
          </NavLink>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default CashierLayout;
