import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth"

const CartsPage = () => {
  const { cartItems, cartTotal, loading, updateQty, removeFromCart } = useCart();
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [orderNote, setOrderNote] = useState("");
    const { user } = useAuth();                 // <-- tambahkan
    const navigate = useNavigate();

  // const handleQuantityChange = (id, newQty) => {
  //   if (newQty < 1) return;
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, quantity: newQty } : item
  //     )
  //   );
  // };

  // const handleDelete = (id) =>
  //   setCartItems((prev) => prev.filter((item) => item.id !== id));

  // const subtotal = cartItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );

    const handleCheckout = () => {
        if (!user) {
            Swal.fire({
                icon: "warning",
                title: "Login Diperlukan",
                text: "Silakan login terlebih dahulu untuk melanjutkan checkout.",
                confirmButtonColor: "#C31D1D",
            });
            navigate("/login");
            return;
        }
        navigate("/order");
    };

  const formatPrice = (price) =>
    price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  if (loading && cartItems.length === 0) {
    return <div className="pt-40 text-center font-bold text-red-700">Loading Cart...</div>
  }

return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-10 pt-40 md:pb-10 text-red-700"
    >
      {/* Heading */}
      <h1 className="text-5xl font-extrabold mb-2">Your Cart</h1>
      <p className="mb-6">
        Not ready to checkout?{" "}
        <Link to="/products" className="underline hover:text-red-800">
          Continue Shopping
        </Link>
      </p>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-[#FFF5F5] border-2 border-dashed border-[#FFDADA] rounded-3xl shadow-lg max-w-2xl mx-auto py-10 px-10 text-center mb-10">
          <div className="text-center py-20 bg-red-50">
            <h2 className="text-2xl font-bold mb-4 text-red-800">
              You don't have any items in your cart
            </h2>
            <Link
              to="/products"
              className="bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-800 transition shadow-md inline-block mt-4"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Header Table */}
          <div className="grid grid-cols-12 border-b border-red-300 text-sm font-semibold pb-2 mt-8">
            <div className="col-span-5 pl-2">Products</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-center">Total</div>
          </div>

          {/* Items List */}
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.itemCartId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="border-b border-red-200 py-5"
              >
                <div className="grid grid-cols-12 items-center gap-3">
                  {/* Product Info */}
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden border border-red-100 shadow-sm bg-white">
                      <img
                        // Tambahkan fallback image jika null
                        src={item.productImgUrl} 
                        alt={item.productName}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-red-800">{item.productName}</h3>
                      <button
                        onClick={() => removeFromCart(item.itemCartId)}
                        className="text-xs text-red-600 underline hover:text-red-800 mt-1 disabled:opacity-50"
                        disabled={loading} // Disable tombol saat sedang proses hapus
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Price (Satuan) */}
                  <div className="col-span-2 text-center text-sm">
                    {formatPrice((item.subPrice || 0) / (item.quantity || 1))}
                  </div>

                  {/* Quantity Control */}
                  <div className="col-span-3 flex justify-center items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQty(item.itemCartId, item.quantity - 1)}
                      className="border border-red-400 px-2 rounded-sm hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={loading || item.quantity <= 1}
                    >
                      −
                    </motion.button>
                    
                    <span className="w-8 text-center">{item.quantity}</span>
                    
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQty(item.itemCartId, item.quantity + 1)}
                      className="border border-red-400 px-2 rounded-sm hover:bg-red-50 disabled:opacity-50"
                      disabled={loading}
                    >
                      +
                    </motion.button>
                  </div>

                  {/* Total per Item */}
                  <div className="col-span-2 text-center text-sm font-medium">
                    {formatPrice(item.subPrice)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Subtotal Box */}
          <div className="border border-red-300 rounded-lg p-6 mt-10 mb-10 shadow-sm bg-white">
            <div className="flex justify-between text-sm font-medium text-lg">
              <span>Subtotal</span>
              <span className="font-bold text-xl">{formatPrice(cartTotal)}</span>
            </div>

            <div className="border-t border-red-200 my-3" />

            {/* Order Note */}
            <div>
              <button
                onClick={() => setShowNoteInput(!showNoteInput)}
                className="flex items-center gap-2 text-sm text-red-700 hover:text-red-900 mb-2"
              >
                <motion.span
                  animate={{ rotate: showNoteInput ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg"
                >
                  +
                </motion.span>
                Order Note
              </button>

              <AnimatePresence>
                {showNoteInput && (
                  <motion.textarea
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    className="w-full border border-red-200 rounded-md p-2 text-sm focus:ring-1 focus:ring-red-400 outline-none"
                    placeholder="Add note..."
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="border-t border-red-200 my-4" />

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-red-700 text-white font-medium py-3 rounded-full hover:bg-red-800 transition-colors shadow-lg"
              onClick={handleCheckout}
            >
              Checkout
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default CartsPage;
