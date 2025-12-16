import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiUpload } from "react-icons/hi";
import {getProducts} from "../../../services/adminDashboardService.js";

const EditProductPage = () => {
    const { id } = useParams(); // id_product dari URL
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null); // file baru (jika diganti)
    const [form, setForm] = useState({
        product_name: "",
        product_price: "",
        description: "",
        product_stock: "",
    });

    // Fetch product detail saat komponen mount
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProducts(); // ambil semua dulu, lalu filter
                const product = data.find((p) => p.id_product === id);
                if (!product) throw new Error("Product not found");

                setForm({
                    product_name: product.product_name,
                    product_price: product.product_price,
                    description: product.description || "",
                    product_stock: product.product_stock,
                });
                setPreview(product.image_url);
            } catch (error) {
                console.error("Failed to fetch product:", error);
                alert("Produk tidak ditemukan atau gagal dimuat.");
                navigate("/admin/products");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!form.product_name || !form.product_price || !form.product_stock) {
            alert("Please fill all required fields!");
            return;
        }

        const productData = {
            product_name: form.product_name,
            product_price: parseFloat(form.product_price),
            description: form.description,
            product_stock: parseInt(form.product_stock, 10),
        };

        const formData = new FormData();
        formData.append("product", JSON.stringify(productData));
        if (file) {
            formData.append("file", file);
        }

        try {
            await api.post(`/products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Product updated successfully!");
            navigate("/admin/products");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-ookay/20 flex items-center justify-center">
                <p className="text-lg text-gray-600">Loading product...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white w-full max-w-6xl rounded-2xl shadow-lg p-10"
            >
                <h2 className="text-3xl font-bold text-red-600 mb-8">Edit Product</h2>

                <form onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Form Fields */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="product_name"
                                    value={form.product_name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-ookay rounded-xl focus:outline-none focus:ring-2 focus:ring-yes/40 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Price (Rp)
                                </label>
                                <input
                                    type="number"
                                    name="product_price"
                                    value={form.product_price}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-3 border border-ookay rounded-xl focus:outline-none focus:ring-2 focus:ring-yes/40 transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    rows="5"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="Describe your product..."
                                    className="w-full px-4 py-3 border border-ookay rounded-xl focus:outline-none focus:ring-2 focus:ring-yes/40 transition resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Stock Quantity
                                </label>
                                <input
                                    type="number"
                                    name="product_stock"
                                    value={form.product_stock}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    className="w-full px-4 py-3 border border-ookay rounded-xl focus:outline-none focus:ring-2 focus:ring-yes/40 transition"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-10 bg-gray-50 hover:border-red-400 transition">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                Product Image
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Change product image (optional)
                            </p>

                            <label
                                htmlFor="imageUpload"
                                className="cursor-pointer w-full h-80 flex flex-col items-center justify-center"
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Product preview"
                                        className="max-h-full max-w-full object-contain rounded-xl shadow-md"
                                    />
                                ) : (
                                    <div className="text-center">
                                        <HiUpload className="mx-auto text-5xl text-gray-400 mb-4" />
                                        <p className="text-gray-600">
                                            <span className="font-medium text-red-600">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-400 mt-2">PNG, JPG up to 5MB</p>
                                    </div>
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

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 mt-12">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate("/admin/products")}
                            className="px-8 py-3 rounded-xl bg-gray-700 text-white hover:bg-gray-800 transition"
                        >
                            Cancel
                        </motion.button>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            className="px-8 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            Save Changes
                        </motion.button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditProductPage;