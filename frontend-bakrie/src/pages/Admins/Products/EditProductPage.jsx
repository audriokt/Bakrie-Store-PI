import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiUpload } from "react-icons/hi";
import { motion } from "framer-motion";

import {
  getDummyProducts,
  updateDummyProduct,
} from "../../../data/dummyProducts";

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const product = getDummyProducts().find((p) => p.id === Number(id));
    if (!product) return navigate("/admin/products");

    setForm(product);
    setPreview(product.image_url);
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    updateDummyProduct(Number(id), {
      ...form,
      product_price: Number(form.product_price),
      product_stock: Number(form.product_stock),
    });

    navigate("/admin/products");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white p-6">
      
      <motion.form
        onSubmit={handleSave}
        className="bg-white p-10 rounded-2xl shadow max-w-4xl w-full grid md:grid-cols-2 gap-8"
      >
        <div className="space-y-4">
            {/* title*/}
          <h1 className="text-3xl font-bold text-red-600 mb-6">Edit Product</h1>
          <input
            name="product_name"
            value={form.product_name || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
          <input
            name="category"
            value={form.category || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
          <input
            name="product_price"
            type="number"
            value={form.product_price || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
          <input
            name="product_stock"
            type="number"
            value={form.product_stock || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
          <button className="px-6 py-2 bg-red-600 text-white rounded-xl">
            Save Changes
          </button>
        </div>

        <div className="border-2 border-dashed rounded-xl flex items-center justify-center">
          {preview ? (
            <img src={preview} className="h-64 object-contain" />
          ) : (
            <HiUpload className="text-4xl text-gray-400" />
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default EditProductPage;
