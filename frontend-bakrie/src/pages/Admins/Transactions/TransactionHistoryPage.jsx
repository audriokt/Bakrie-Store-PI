import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ===============================
// 🟢 DUMMY DATA
import dummyTransactions from "../../../data/dummyTransactions";

// ===============================
// 🔴 API ASLI (JANGAN DIHAPUS)
// import { fetchTransactions } from "../../../services/transactionService";

const TransactionHistoryPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // ===============================
    // 🟢 DUMMY MODE
    setTransactions(dummyTransactions);
    // ===============================

    /*
    // 🔴 API MODE
    const fetchTransactions = async () => {
      const res = await fetch("/api/admin/transactions");
      const data = await res.json();
      setTransactions(data);
    };
    fetchTransactions();
    */
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          Transaction History
        </h1>
        <p className="text-gray-600">
          View all customer transactions
        </p>
      </div>

      {/* table */}
      <div className="bg-white rounded-3xl shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-red-50">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-center">Total</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Date</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((trx) => (
                <tr
                  key={trx.id}
                  className="border-t hover:bg-red-50 transition"
                >
                  <td className="px-6 py-4 font-semibold">{trx.id}</td>
                  <td className="px-6 py-4">{trx.customer}</td>
                  <td className="px-6 py-4 text-center font-bold text-red-600">
                    Rp {(trx.total ?? 0).toLocaleString("id-ID")}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          trx.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {trx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {trx.date}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/transactions/${trx.id}`)
                      }
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
