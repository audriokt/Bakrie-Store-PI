import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth.js";
import { updateCustomerProfile } from "../../../services/customerService";
import Swal from "sweetalert2";

const EditPasswordPage = () => {
    const navigate = useNavigate();
    const { user, fetchUser } = useAuth();

    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            Swal.fire("Error", "Password baru tidak cocok!", "error");
            return;
        }
        if (formData.newPassword.length < 6) {
            Swal.fire("Error", "Password minimal 6 karakter", "error");
            return;
        }

        setLoading(true);

        const data = new FormData();
        data.append("customer", JSON.stringify({
            password: formData.newPassword.trim(),
        }));

        try {
            await updateCustomerProfile(user.customer_id, data);

            Swal.fire({
                title: "Berhasil!",
                text: "Password berhasil diubah",
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#C31D1D",
            }).then(() => {
                fetchUser();
                navigate("/profile");
            });
        } catch (err) {
            const msg = err.response?.data?.message || "Gagal mengubah password";
            Swal.fire("Gagal", msg, "error");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FFF5F5] pt-24 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-10 border border-[#FFDADA]"
      >
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-red-600 text-xl mr-3 hover:scale-110 transition"
          >
            ←
          </button>
          <h2 className="text-lg font-bold text-red-600 tracking-wide">
            Change Password
          </h2>
        </div>

        <hr className="border-red-200 mb-6" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-red-600 mb-1 text-left">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength={8}
              placeholder="Enter new password"
              className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-red-600 mb-1 text-left">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Re-enter new password"
              className="w-full border border-red-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-full font-semibold mt-6 hover:bg-red-700 transition shadow-md"
          >
              {loading ? "Loading..." : "Save Password"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EditPasswordPage;
