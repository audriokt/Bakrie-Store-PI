import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiUpload } from "react-icons/hi";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "../../../services/employeeService";

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    status: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(id);
        const emp = response.data;

        setForm({
          name: emp.name,
          email: emp.email,
          role: emp.role,
          phone: emp.phone,
          status: emp.status,
        });
        setPreview(emp.photoUrl);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const employeeData = {
      name: form.name,
      email: form.email,
      role: form.role,
      phone: form.phone,
      status: form.status,
    };

    const formData = new FormData();
    formData.append("employee", JSON.stringify(employeeData));
    if (file) formData.append("file", file);

    try {
      await updateEmployee(id, formData);
      alert("Employee updated successfully!");
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee.");
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
        <h2 className="text-3xl font-bold text-red-600 mb-6">Edit Employee</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <form className="space-y-5" onSubmit={handleUpdate}>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-xl" />
            <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-xl" />
            <select name="role" value={form.role} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-xl">
              <option value="Staff">Staff</option>
              <option value="Admin">Admin</option>
            </select>
            <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-xl" />
            <select name="status" value={form.status} onChange={handleChange} className="w-full p-3 bg-white border border-gray-300 rounded-xl">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <div className="flex justify-end mt-10 gap-4">
                   <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition"
                        onClick={() => navigate("/admin/employees")}
                      >
                          Cancel
                    </motion.button>
              

              <motion.button type="submit" whileHover={{ scale: 1.05 }} className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
                Save Changes
              </motion.button>
            </div>
          </form>

          {/* Right Side - Image Upload */}
          <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-xl p-8 bg-gray-50 hover:border-red-400 transition">
            <h3 className="text-lg font-semibold text-gray-700 mb-1">Profile Image</h3>
            <p className="text-gray-500 text-sm mb-4">Change employee photo</p>

            <label htmlFor="imageUpload" className="flex flex-col items-center justify-center w-full h-64 cursor-pointer">
              {preview ? (
                <img src={preview} alt="Preview" className="object-contain h-56 w-full rounded-lg shadow" />
              ) : (
                <>
                  <HiUpload className="text-4xl text-gray-400 mb-3" />
                  <p className="text-gray-600">
                    <span className="font-medium text-red-600 hover:underline">Drop your image here</span> or browse
                  </p>
                  <p className="text-gray-400 text-sm mt-1">Support: jpeg, png</p>
                </>
              )}
              <input id="imageUpload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditEmployeePage;
