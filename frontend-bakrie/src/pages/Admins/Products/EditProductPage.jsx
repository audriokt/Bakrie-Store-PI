import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { HiUpload } from "react-icons/hi";

const EditProductPage = () => {
  const { id } = useParams();
  const location = useLocation();

  // ambil data produk dari location.state (kalau ada)
  const productFromState = location.state?.product;

  const [product, setProduct] = useState({
      id: "",
      name: "",
      category: "",
      quantity: "",
      status: "",
      price: "",
    ...productFromState, // kalau ada data dari ProductsPage, isi langsung
  });

  const [preview, setPreview] = useState(productFromState?.image_url || null);

  // kalau nanti backend aktif, kamu bisa tambahkan fetch dari server di sini
  useEffect(() => {
    if (!productFromState) {
      console.log("No product passed, fallback ke backend / dummy fetch nanti");
    }
  }, [productFromState]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setProduct({ ...product, image_url: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Product updated: ${JSON.stringify(product, null, 2)}`);
  };

  return (
    <div className="min-h-screen bg-ookay flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-6xl rounded-2xl shadow p-10"
      >
        <h2 className="text-3xl font-bold text-red-600 mb-6">Edit Product</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Basic Information
              </h3>
              <div className="space-y-5 mt-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={product.name || ""}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  className="w-full p-3 bg-white border border-ookay rounded-xl focus:outline-none focus:border-red-500 transition"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={product.price?.replace("$", "") || ""}
                  onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  className="w-full p-3 bg-white border border-ookay rounded-xl focus:outline-none focus:border-red-500 transition"
                />
                <textarea
                  placeholder="Description"
                  rows="4"
                  value={product.description || ""}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                  className="w-full p-3 bg-white border border-ookay rounded-xl focus:outline-none focus:border-red-500 transition"
                ></textarea>
                <input
                  type="number"
                  placeholder="Stock quantity"
                  value={product.quantity || ""}
                  onChange={(e) =>
                    setProduct({ ...product, quantity: e.target.value })
                  }
                  className="w-full p-3 bg-white border border-ookay rounded-xl focus:outline-none focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* image */}
          <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 hover:border-red-400 transition">
             <h3 className="text-lg font-semibold text-gray-700 mb-1">
               Product Image
             </h3>
             <p className="text-gray-500 text-sm mb-4">
               Add or change image for the product
             </p>
 
             <label
               htmlFor="imageUpload"
               className="flex flex-col items-center justify-center w-full h-64 cursor-pointer"
             >
               {preview ? (
                 <img
                   src={preview}
                   alt="Preview"
                   className="object-contain h-56 w-full rounded-lg shadow"
                 />
               ) : (
                 <>
                   <HiUpload className="text-4xl text-gray-400 mb-3" />
                   <p className="text-gray-600">
                     <span className="font-medium text-red-600 hover:underline">
                       Drop your image here
                     </span>{" "}
                     or browse
                   </p>
                   <p className="text-gray-400 text-sm mt-1">
                     Support: jpeg, png
                   </p>
                 </>
               )}
               <input
                 id="imageUpload"
                 type="file"
                 accept="image/*"
                 className="hidden"
                 onChange={handleImageChange}
               />
             </label>
            </div>
          </div>

          <div className="flex justify-end mt-10 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
            >
              Cancel
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Update
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProductPage;
