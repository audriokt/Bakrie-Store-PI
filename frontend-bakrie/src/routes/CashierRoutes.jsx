import { Routes, Route } from "react-router-dom";

import CashierLayout from "../components/layout/cashier/CashierLayout";
import CashierDashboardPage from "../pages/Cashier/Dashboard/CashierDashoardPage";
import OrderListPage from "../pages/Cashier/Orders/OrderListPage";
import OrderConfirmationPage from "../pages/Cashier/Orders/OrdersConfirmation";
import TransactionHistoryPage from "../pages/Cashier/Transaction/TransactionHistoryPage";

const CashierRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CashierLayout />}>
        <Route index element={<CashierDashboardPage />} />
        <Route path="orders" element={<OrderListPage />} />
        <Route path="confirmations" element={<OrderConfirmationPage />} />
        <Route path="transactions" element={<TransactionHistoryPage />} />
      </Route>
    </Routes>
  );
};

export default CashierRoutes;
