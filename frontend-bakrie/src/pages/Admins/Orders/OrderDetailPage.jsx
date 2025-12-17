import React from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";

const OrderDetailPage = () => {
  const { id } = useParams();

  const orderDetail = {
    id,
    orderNumber: "BK-1001",
    productImage: "https://images.unsplash.com/photo-1608198093002-ad4e005484b1?q=80&w=800",
    productName: "Chocolate Croissant",
    category: "Bakery",
    price: 28000,
    quantity: 3,
    subtotal: 84000,
    orderDate: "2025-02-15",
    orderStatus: "Paid",
    customerName: "Audrio",
    customerEmail: "audrio@example.com",
    customerPhone: "+62 812-3456-7890",
    customerAddress: "Jl. Bakery No. 12, Jakarta Selatan 12345",
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <Link to="/admin/orders">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Orders</span>
          </motion.button>
        </Link>
        <h1 className="text-3xl font-bold text-red-600 mb-2">Order Details</h1>
        <p className="text-gray-600">Order #{orderDetail.orderNumber}</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Product & Order Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-3xl shadow-lg border-2 border-red-100 p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <Package className="text-red-500" size={24} />
              <span>Product Details</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={orderDetail.productImage}
                  alt={orderDetail.productName}
                  className="w-full h-64 object-cover rounded-2xl shadow-md"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-2xl font-bold text-gray-800">{orderDetail.productName}</h4>
                  <span className="inline-block mt-2 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                    {orderDetail.category}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per item:</span>
                    <span className="font-semibold">Rp {orderDetail.price.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">{orderDetail.quantity}x</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-2 flex justify-between">
                    <span className="text-gray-800 font-bold">Subtotal:</span>
                    <span className="text-red-600 font-bold text-xl">
                      Rp {orderDetail.subtotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Order Info Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-lg border-2 border-red-100 p-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <ShoppingBag className="text-red-500" size={24} />
              <span>Order Information</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="font-semibold text-gray-800">{orderDetail.orderDate}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Package className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="font-semibold text-gray-800">#{orderDetail.orderNumber}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {orderDetail.orderStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Customer Info */}
        <div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-lg border-2 border-red-100 p-6 sticky top-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
              <User className="text-red-500" size={24} />
              <span>Customer Information</span>
            </h3>
            <div className="space-y-5">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {orderDetail.customerName.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{orderDetail.customerName}</p>
                  <p className="text-sm text-gray-500">Customer</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{orderDetail.customerEmail}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Package className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-800">{orderDetail.customerPhone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="text-gray-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Delivery Address</p>
                    <p className="font-medium text-gray-800">{orderDetail.customerAddress}</p>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Contact Customer
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
