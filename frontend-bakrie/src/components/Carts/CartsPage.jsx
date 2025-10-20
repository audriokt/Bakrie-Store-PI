import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CartsPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Croissant",
      price: 35000,
      quantity: 2,
      image:
        "https://tse2.mm.bing.net/th/id/OIP.9XAX5sYQx5GDtvFiSatzcAHaHa?cb=12&pid=ImgDet&w=178&h=178&c=7&dpr=1,5&o=7&rm=3"
    },
    {
      id: 2,
      name: "Cookies",
      price: 35000,
      quantity: 2,
      image:
        "https://th.bing.com/th/id/OIP.FANiKVyhnb89UFWHjirDwQHaI0?pid=ImgDet&rs=1",
    },
  ]);

  const [showNoteInput, setShowNoteInput] = useState(false);
  const [orderNote, setOrderNote] = useState("");

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleDelete = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price) =>
    price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-10 text-red-700"
    >
      <h1 className="text-xl font-bold mb-1">Your Cart</h1>
      <p className="text-sm mb-4">
        Unready to checkout?{" "}
        <Link to="/" className="underline hover:text-red-800">
          Continue Shopping
        </Link>
      </p>

      {/* Header */}
      <div className="grid grid-cols-12 border-t border-red-300 text-sm font-medium pb-1">
        <div className="col-span-6 pl-2">Products</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-center">Total</div>
      </div>

      {/* Items */}
      <AnimatePresence>
        {cartItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="border-t border-red-200 py-5"
          >
            <div className="grid grid-cols-12 items-center">
              {/* Product */}
              <div className="col-span-6 flex items-center">
                <div className="w-20 h-20 bg-red-50 rounded-md flex items-center justify-center overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center text-sm">
                {formatPrice(item.price)}
              </div>

              {/* Quantity */}
              <div className="col-span-2 flex justify-center items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  className="border border-red-400 px-2 rounded-sm"
                >
                  −
                </motion.button>
                <span>{item.quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  className="border border-red-400 px-2 rounded-sm"
                >
                  +
                </motion.button>
              </div>

              {/* Total */}
              <div className="col-span-2 text-center text-sm">
                {formatPrice(item.price * item.quantity)}
              </div>
            </div>

            {/* Delete */}
            <button
              onClick={() => handleDelete(item.id)}
              className="text-xs text-red-600 underline ml-24 mt-1"
            >
              Delete
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Subtotal Box */}
      <div className="border border-red-300 rounded-lg p-5 mt-8">
        <div className="flex justify-between text-sm font-medium">
          <span>Subtotal</span>
          <span className="font-bold">{formatPrice(subtotal)}</span>
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
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-red-700 text-white font-medium py-3 rounded-full"
        >
          Checkout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartsPage;
