import React, { useState } from "react";
import { HiUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ✅ dummy
import { addDummyProduct } from "../../../data/dummyProducts";

// import api from "../../../services/api"; 

const AddProductsPage = () => {
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    product_name: "",
    product_price: "",
    description: "",
    product_stock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!form.product_name || !form.product_price || !form.product_stock) {
      alert("Lengkapi semua field!");
      return;
    }

    const newProduct = {
      id: Date.now().toString(),
      product_name: form.product_name,
      product_price: Number(form.product_price),
      product_stock: Number(form.product_stock),
      description: form.description,
      image_url: preview || "https://via.placeholder.com/300",
      category: "General",
    };

    // ===============================
    // ✅ DUMMY MODE
    addDummyProduct(newProduct);
    navigate("/admin/products");
    // ===============================

    /*
    // ===============================
    // 🔌 API MODE (JANGAN DIHAPUS)
    const formData = new FormData();
    formData.append("product", JSON.stringify(newProduct));
    formData.append("file", file);

    await api.post("/products", formData);
    navigate("/admin/products");
    // ===============================
    */
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <motion.div className="bg-white w-full max-w-5xl rounded-2xl shadow p-10">
        <h2 className="text-3xl font-bold text-red-600 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <input
              name="product_name"
              placeholder="Product Name"
              value={form.product_name}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <input
              name="product_price"
              type="number"
              placeholder="Price"
              value={form.product_price}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <input
              name="product_stock"
              type="number"
              placeholder="Stock"
              value={form.product_stock}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            />
            <button className="px-6 py-2 bg-red-600 text-white rounded-xl">
              Save
            </button>
          </div>

          <label className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer">
            {preview ? (
              <img src={preview} className="h-64 object-contain" />
            ) : (
              <>
                <HiUpload className="text-4xl text-gray-400" />
                <p>Upload Image</p>
              </>
            )}
            <input type="file" className="hidden" onChange={handleImageChange} />
          </label>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProductsPage;
