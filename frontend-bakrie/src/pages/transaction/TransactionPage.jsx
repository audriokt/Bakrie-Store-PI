import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TransactionPage = () => {
  const navigate = useNavigate();

  const mockCartItems = [
    {
      id: 1,
      productName: "Premium Chocolate Croissant",
      price: 35000,
      quantity: 2,
      imgUrl: "https://images.unsplash.com/photo-1555507036-ab1f40388085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 2,
      productName: "Strawberry Shortcake Slice",
      price: 45000,
      quantity: 1,
      imgUrl: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
      id: 3,
      productName: "Blueberry Muffin",
      price: 28000,
      quantity: 3,
      imgUrl: "https://images.unsplash.com/photo-1558401391-7899b4bd5bbf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    }
  ];

  const subtotal = mockCartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shippingFee = 15000;
  const serviceFee = 2000;
  const grandTotal = subtotal + shippingFee + serviceFee;

  const [formData, setFormData] = useState({
    fullName: "Priscilla Sudiyantoro", 
    phone: "081234567890",
    address: "Jl. Kenangan Mantan No. 12, South Jakarta",
    paymentMethod: "BCA", 
    note: ""
  });

  const paymentOptions = [
    { id: 'BCA', name: 'BCA Virtual Account', image: '/banks/bca-icon.png' },
    { id: 'BRI', name: 'BRI Virtual Account', image: '/banks/bri-icon.png' },
    { id: 'BNI', name: 'BNI Virtual Account', image: '/banks/bni-icon.png' },
    { id: 'MANDIRI', name: 'Mandiri Virtual Account', image: '/banks/mandiri-icon.png' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentSelect = (id) => {
    setFormData({ ...formData, paymentMethod: id });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    const transactionPayload = {
        invoice_number: `INV-${Date.now()}`, 
        payment_date: new Date().toISOString(), 
        payment_method: formData.paymentMethod, 
        total: grandTotal, 
        shipping_details: { ...formData }
    };

    console.log("Transaction Payload:", transactionPayload); 

    let timerInterval;
    Swal.fire({
      title: 'Processing Order...',
      html: 'Generating Invoice & Virtual Account',
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => { Swal.showLoading() },
      willClose: () => { clearInterval(timerInterval) }
    }).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Order Created!',
        text: 'SPlease proceed to view payment instructions',
        confirmButtonColor: '#C31D1D',
        confirmButtonText: 'Proceed to Payment' 
      }).then(() => {
        navigate("/order-confirmation", { state: transactionPayload });
      });
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const formatPrice = (price) =>
    price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <div className="min-h-screen mt-10 bg-gray-50 pt-28 pb-20 px-4 md:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold text-red-800 mb-8 text-center"
        >
            Checkout Transaction
        </motion.h1>

        {/* Layout Container */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 w-full space-y-6"
          >
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
                <div className="flex mb-6 pb-4 border-b border-gray-100">
                    <div className="bg-red-50 rounded-xl text-red-600 w-12 h-12 flex items-center justify-center shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 w-full flex items-center">Shipping Address</h2>
                </div>
                
                <form className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Recipient Name</label>
                        <input 
                            type="text" 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleInputChange} 
                            className="w-full border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition bg-white" 
                            placeholder="Full Name" 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                        <input 
                            type="text" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                      
                            className="w-full border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition bg-white" 
                            placeholder="08xxxxxxxx" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Address</label>
                        <textarea 
                            name="address" 
                            value={formData.address} 
                            onChange={handleInputChange} 
                            rows="3" 
                            className="w-full border border-gray-300 text-gray-900 placeholder:text-gray-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none transition resize-none bg-white" 
                            placeholder="Street Name, Block, House Number..."
                        ></textarea>
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-200">
                <div className="flex mb-6 pb-4 border-b border-gray-100">
                      <div className="bg-red-50 rounded-xl text-red-600 w-12 h-12 flex items-center justify-center shrink-0 mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 w-full flex items-center">Select Bank</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {paymentOptions.map((option) => (
                        <label 
                            key={option.id} 
                            onClick={() => handlePaymentSelect(option.id)}
                            className={`
                                relative w-full flex items-center gap-3 p-2 rounded-2xl border-2 cursor-pointer transition-all duration-200
                                ${formData.paymentMethod === option.id 
                                    ? 'border-red-500 bg-red-50 shadow-sm' 
                                    : 'border-gray-100 hover:border-red-200 hover:bg-gray-50'
                                }
                            `}
                        >
                            <div className="shrink-0">
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                                    ${formData.paymentMethod === option.id ? 'border-red-600' : 'border-gray-300'}
                                `}>
                                    {formData.paymentMethod === option.id && (
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
                                    )}
                                </div>
                                <input 
                                    type="radio" 
                                    name="paymentMethod" 
                                    value={option.id}
                                    checked={formData.paymentMethod === option.id}
                                    onChange={() => {}}
                                    className="hidden" 
                                />
                            </div>

                            <div className="flex items-center w-full gap-x-2">
                                <div className="w-14 h-9 flex items-center justify-start bg-white rounded-lg border border-gray-100 p-1 shrink-0">
                                    <img 
                                            src={option.image} 
                                            alt={option.name} 
                                            className="w-full h-full object-contain"
                                            onError={(e) => {
                                                e.target.style.display='none'; 
                                            }} 
                                    />
                                </div>
                                <p className={`w-full font-bold text-sm md:text-base truncate ${formData.paymentMethod === option.id ? 'text-gray-900' : 'text-gray-600'}`}>
                                    {option.name}
                                </p>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-[400px] xl:w-[450px] shrink-0 bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-red-100 h-fit"
          >
            <h2 className="text-xl md:text-2xl font-bold text-red-800 mb-6">Invoice Summary</h2>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar mb-6">
                {mockCartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-dashed border-gray-100 pb-4 last:border-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0 shadow-sm border border-gray-100">
                            <img src={item.imgUrl} alt={item.productName} className="w-full h-full object-cover"/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 text-sm line-clamp-2 mb-1">{item.productName}</h4>
                            <div className="flex justify-between items-end mt-2">
                                <p className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                    Qty: {item.quantity}
                                </p>
                                <p className="font-bold text-red-700 text-sm">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full pt-6 border-t-2 border-dashed border-gray-100">
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                        <p>Subtotal</p>
                        <p className="text-gray-900">{formatPrice(subtotal)}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                        <p>Shipping Fee</p>
                        <p className="text-gray-900">{formatPrice(shippingFee)}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                        <p>Service Fee</p>
                        <p className="text-gray-900">{formatPrice(serviceFee)}</p>
                    </div>
                </div>

                <div className="border-t border-gray-200 my-6"></div>
                
                <div className="flex justify-between items-center">
                    <p className="text-gray-900 font-bold text-lg">Total Payment</p>
                    <p className="text-xl font-bold text-red-700">{formatPrice(grandTotal)}</p>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceOrder}
                    className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-200 hover:shadow-red-300 transition-all duration-300 text-lg"
                >
                    Pay Now
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancel}
                    className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3.5 rounded-2xl hover:border-red-200 hover:text-red-600 hover:bg-red-50 transition-all duration-300 text-base"
                >
                    Cancel Order
                </motion.button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;