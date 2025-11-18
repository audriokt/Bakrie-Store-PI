import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiUpload } from "react-icons/hi";
import { addProduct } from "../../../services/productService";


const AddProductsPage = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    product_name: "",
    product_price: "",
    description: "",
    product_stock: "",
  });

  // handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle image
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  // handle save button
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.product_name || !file) {
      alert("Please fill all required fields and select an image!");
      return;
    }

    // siapkan data product dalam bentuk JSON string
    const productData = {
      product_name: form.product_name,
      product_price: parseFloat(form.product_price),
      description: form.description,
      product_stock: parseInt(form.product_stock),
    };

    // buat FormData untuk kirim file + data json
    const formData = new FormData();
    formData.append("product", JSON.stringify(productData));
    formData.append("file", file);

    try {
      const response = await addProduct(formData);
      alert("Product added successfully!");
      console.log("Response:", response.data);

      // reset form
      setForm({ product_name: "", product_price: "", description: "", product_stock: "" });
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-6xl rounded-2xl shadow p-10"
      >
        <h2 className="text-3xl font-bold text-red-600 mb-6">Add New Product</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Enter your new Product Information below!
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Section to configure new product information
            </p>

            <form className="space-y-5" onSubmit={handleSave}>
              <input
                type="text"
                name="product_name"
                placeholder="Name"
                value={form.product_name}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-ookay rounded-xl focus:outline-none focus:border-red-500 transition"
              />
              <input
                type="number"
                name="product_price"
                placeholder="Price"
                value={form.product_price}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-ookay rounded-xl focus:outline-none focus:border-red-500 transition"
              />
              <textarea
                name="description"
                placeholder="Describe your product..."
                rows="4"
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-ookay rounded-xl focus:outline-none focus:border-red-500 transition"
              ></textarea>
              <input
                type="number"
                name="product_stock"
                placeholder="Stock quantity"
                value={form.product_stock}
                onChange={handleChange}
                className="w-full p-3 bg-white border border-ookay rounded-xl focus:outline-none focus:border-red-500 transition"
              />

              <div className="flex justify-end mt-10 gap-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
                  onClick={() => {
                    setForm({ product_name: "", product_price: "", description: "", product_stock: "" });
                    setFile(null);
                    setPreview(null);
                  }}
                >
                  Discard
                </motion.button>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Save
                </motion.button>
              </div>
            </form>
          </div>

          {/* Right Side - Image Upload */}
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
      </motion.div>
    </div>
  );
};

export default AddProductsPage;
