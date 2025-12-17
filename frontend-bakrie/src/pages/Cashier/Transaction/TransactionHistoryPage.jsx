import React from "react";

const TransactionHistoryPage = () => {
  const history = [
    { id: "TRX-001", customer: "Alya Nirmala", total: 185000, status: "Paid", date: "2025-12-15" },
    { id: "TRX-002", customer: "Riko Pratama", total: 92500, status: "Paid", date: "2025-12-14" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-3xl p-8 shadow">
        <h1 className="text-4xl font-extrabold text-red-600">Transaction History</h1>
        <p className="text-gray-600 mt-1">Completed transactions</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        {history.map((trx) => (
          <div
            key={trx.id}
            className="flex justify-between border-b pb-3 last:border-b-0"
          >
            <div>
              <p className="font-semibold text-lg">{trx.customer}</p>
              <p className="text-sm text-gray-500">{trx.date}</p>
            </div>

            <div className="text-right">
              <p className="font-bold text-lg">
                Rp {trx.total.toLocaleString("id-ID")}
              </p>
              <span className="text-green-600 text-sm font-medium">{trx.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
