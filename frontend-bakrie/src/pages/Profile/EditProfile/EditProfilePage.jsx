import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";
import { updateCustomerProfile } from "../../../services/customerService";
import Swal from "sweetalert2";

const EditProfilePage = () => {
    const navigate = useNavigate();
    const { user, fetchUser } = useAuth(); // tambah fetchUser!

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNum: "",
        address: "",
    });

    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Isi form saat user sudah ada
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
                phoneNum: user.phone_num || "",
                address: user.address || "",
            });
            setAvatarPreview(user.img_url || "defaultProfile/default_profile.png");
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file); // penting! ini yang dikirim ke backend

            const reader = new FileReader();
            reader.onload = () => setAvatarPreview(reader.result.toString());
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append("customer", JSON.stringify({
            username: formData.username,
            email: formData.email,
            phone_num: formData.phoneNum,
            address: formData.address,
        }));
        if (avatarFile) data.append("file", avatarFile);

        try {
            await updateCustomerProfile(user.customer_id, data);
            Swal.fire({
                title: "Berhasil!",
                text: "Profil kamu berhasil diperbarui",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#C31D1D",
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    fetchUser();        // refresh data user
                    navigate("/profile"); // kembali ke halaman profil
                }
            });
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || "Terjadi kesalahan";

            Swal.fire({
                title: "Gagal!",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "Coba Lagi",
                confirmButtonColor: "#C31D1D",
            });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex justify-center items-center bg-[#FFF5F5] pt-24 pb-10 mt-10">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-lg rounded-2xl w-full max-w-2xl p-10 border border-[#FFDADA]"
            >
                {/* Header */}
                <div className="flex items-center mb-6">
                    <button onClick={() => navigate(-1)} className="text-red-600 text-xl mr-3 hover:scale-110 transition">
                        ←
                    </button>
                    <h2 className="text-lg font-bold text-red-600 tracking-wide">Edit Profile</h2>
                </div>

                <hr className="border-red-200 mb-6" />

                {/* Profile Photo */}
                <div className="relative mb-8 w-40 mx-auto">
                    <img
                        src={avatarPreview || "defaultProfile/default_profile.png"}
                        alt="Profile"
                        className="w-40 h-40 rounded-full object-cover border-4 border-[#FFECEC]"
                    />
                    {/* Hidden file input */}
                    <input
                        id="avatarUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        style={{
                            border: 0,
                            clip: "rect(0 0 0 0)",
                            height: "1px",
                            margin: "-1px",
                            overflow: "hidden",
                            padding: 0,
                            position: "absolute",
                            whiteSpace: "nowrap",
                            width: "1px",
                        }}
                        className="hidden"
                    />

                    {/* Icon Button */}
                    <button
                        type="button"
                        onClick={() => document.getElementById("avatarUpload")?.click()}
                        className="absolute bottom-1 right-1 w-9 h-9 flex items-center justify-center
                         bg-red-600 text-white rounded-full hover:bg-red-700 shadow-md transition
                          border-2 border-white"
                    >
                        ✎
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-red-600 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-red-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-red-600 mb-1">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNum"
                            value={formData.phoneNum}
                            onChange={handleInputChange}
                            placeholder="+62..."
                            className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-red-600 mb-1">Address</label>
                        <textarea
                            name="address"
                            rows={3}
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 text-white py-3 rounded-full font-semibold mt-6 hover:bg-red-700 transition shadow-md disabled:opacity-70"
                    >
                        {loading ? "Menyimpan..." : "Save Changes"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default EditProfilePage;