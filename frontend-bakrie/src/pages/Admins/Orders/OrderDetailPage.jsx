import React from "react";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import { useParams, Link } from "react-router-dom";

const OrderDetailPage = () => {
  const { id } = useParams();

  // ===== DUMMY DATA ORDER DETAIL =====
  const orderDetail = {
    id: id,
    productImage:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484b1?q=80&w=800",
    productName: "Chocolate Croissant",
    category: "Bakery",
    price: 28000,
    quantity: 3,
    subtotal: 84000,
    orderDate: "2025-02-15",
    customerName: "Audrio",
    customerEmail: "audrio@example.com",
    customerAddress: "Jl. Bakery No. 12, Jakarta",
  };

  return (
    <div className="min-h-screen w-full bg-ookay p-6 md:p-10">
      
      {/*back buttons*/}
      <Link to="/admin/orders">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 mb-6 px-4 py-2 bg-white text-red-600 border border-red-300 rounded-xl shadow"
        >
          <HiArrowLeft /> Back
        </motion.button>
      </Link>

      {/*main container*/}
      <div className="bg-white w-full rounded-2xl shadow-md p-6 md:p-8">

        {/* title  */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-red-100 rounded-xl text-red-600 shadow-sm">
            <HiArrowLeft className="text-xl opacity-0" /> 
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Order Detail</h2>
        </div>

        {/* isi content pergrid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* kiri - product cardnya */}
          <div className="bg-ookay p-5 rounded-2xl border border-red-200 shadow-sm">
            <img
              src={orderDetail.productImage}
              alt={orderDetail.productName}
              className="w-full h-56 object-cover rounded-xl mb-4 shadow"
            />

            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {orderDetail.productName}
            </h3>
            <p className="text-red-600 font-medium mb-1">{orderDetail.category}</p>

            <p className="text-lg font-semibold text-gray-700">
              Price:{" "}
              <span className="text-red-600">
                Rp {orderDetail.price.toLocaleString("id-ID")}
              </span>
            </p>
          </div>

          {/* kanan - order info */}
          <div className="flex flex-col gap-6">

            {/* order info */}
            <div className="bg-ookay p-5 rounded-2xl border border-red-200 shadow-sm">
              <h4 className="text-xl font-bold text-red-600 mb-4">
                Order Information
              </h4>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Order ID:</span> {orderDetail.id}
                </p>
                <p>
                  <span className="font-semibold">Order Date:</span>{" "}
                  {orderDetail.orderDate}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span>{" "}
                  {orderDetail.quantity}
                </p>
                <p>
                  <span className="font-semibold">Subtotal:</span>{" "}
                  <span className="text-red-600 font-bold">
                    Rp {orderDetail.subtotal.toLocaleString("id-ID")}
                  </span>
                </p>
              </div>
            </div>

            {/* cust info */}
            <div className="bg-ookay p-5 rounded-2xl border border-red-200 shadow-sm">
              <h4 className="text-xl font-bold text-red-600 mb-4">
                Customer Information
              </h4>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {orderDetail.customerName}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {orderDetail.customerEmail}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {orderDetail.customerAddress}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
