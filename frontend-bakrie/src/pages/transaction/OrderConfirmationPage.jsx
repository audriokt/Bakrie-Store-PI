import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { 
    invoice_number = "INV-1701234567", 
    total = 82000, 
    payment_method = "BCA Virtual Account", 
    payment_date = new Date().toISOString() 
  } = location.state || {};

  const [vaNumber] = useState("88001234567890");

  const handleCopy = () => {
    navigator.clipboard.writeText(vaNumber);
    Swal.fire({
      icon: 'success',
      title: 'Copied!',
      text: 'Virtual Account number copied.',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleBackToTransaction = () => {
    navigate("/order");
  };

  const handleProducts = () => {
    navigate("/products");
  };

  const formatPrice = (price) =>
    price?.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  const getExpiryDate = () => {
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return date.toLocaleDateString("en-GB", {
      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 md:px-8 font-sans flex items-center justify-center">
      <div className="max-w-lg w-full">

        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
        >
            <h1 className="text-3xl font-extrabold text-gray-800">
                Complete Payment
            </h1>
            <p className="text-gray-500 mt-2">Please transfer before <span className="text-red-600 font-bold">{getExpiryDate()}</span></p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-red-100 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-yellow-400"></div>

          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-orange-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="text-center mb-8 border-b border-dashed border-gray-200 pb-6">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Payment</p>
            <p className="text-3xl font-extrabold text-red-700 mt-2">{formatPrice(total)}</p>
            <p className="text-xs text-gray-400 mt-1">Order ID: {invoice_number}</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200 mb-8">
             <p className="text-sm text-gray-500 font-medium mb-2 text-center">{payment_method} Number</p>
             <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                <span className="font-mono text-xl md:text-2xl font-bold text-gray-800 tracking-widest truncate">
                    {vaNumber}
                </span>
                <button 
                    onClick={handleCopy}
                    className="ml-2 text-red-600 hover:text-red-800 font-bold text-sm px-3 py-1 rounded-lg hover:bg-red-50 transition"
                >
                    COPY
                </button>
             </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-gray-800 mb-3 text-sm uppercase tracking-wide">How to Pay</h3>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-sm text-gray-600 space-y-2">
                <p>1. Open your <strong>{payment_method}</strong> Mobile Banking.</p>
                <p>2. Select menu <strong>m-Transfer</strong> / Virtual Account.</p>
                <p>3. Enter the Virtual Account Number: <strong className="text-gray-900">{vaNumber}</strong>.</p>
                <p>4. Check the details and confirm payment.</p>
                <p>5. Keep your transaction receipt.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* BUTTON 1: Back to Transaction Page */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBackToTransaction}
                className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-200 hover:shadow-red-300 transition-all duration-300 text-lg"
            >
                Back to Order
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProducts}
                className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3.5 rounded-2xl hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all duration-300 text-base"
            >
                Continue Shopping
            </motion.button>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;