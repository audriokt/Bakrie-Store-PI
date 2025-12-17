import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// ===============================
// 🟢 DUMMY DATA
import dummyTransactions from "../../../data/dummyTransactions";

// ===============================
// 🔴 API ASLI (JANGAN DIHAPUS)
// import { fetchTransactionDetail } from "../../../services/transactionService";

const AdminTransactionDetailPage = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    // ===============================
    // 🟢 DUMMY MODE
    const found = dummyTransactions.find(
      (trx) => trx.id === transactionId
    );
    setTransaction(found);
    // ===============================

    /*
    // 🔴 API MODE
    const fetchTransactionDetail = async () => {
      const res = await fetch(`/api/admin/transactions/${transactionId}`);
      const data = await res.json();
      setTransaction(data);
    };
    fetchTransactionDetail();
    */
  }, [transactionId]);

  if (!transaction) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="bg-white p-6 rounded-3xl shadow border">
          <p className="text-gray-500">Transaction not found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-blue-600 hover:underline"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl bg-white rounded-3xl shadow border p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-6">
          Transaction Detail
        </h1>

        <div className="space-y-5">
          <DetailItem label="Transaction ID" value={transaction.id} />
          <DetailItem label="Customer" value={transaction.customer} />
          <DetailItem
            label="Total"
            value={`Rp ${(transaction.total ?? 0).toLocaleString("id-ID")}`}
          />

          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-medium
                ${
                  transaction.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {transaction.status}
            </span>
          </div>

          <DetailItem label="Date" value={transaction.date} />
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 text-blue-600 hover:underline font-medium"
        >
          ← Back to Transactions
        </button>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

export default AdminTransactionDetailPage;
