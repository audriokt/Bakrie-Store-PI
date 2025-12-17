import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDummyEmployee } from "../../../data/dummyEmployees";

const AddEmployeePage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    role: "Staff",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addDummyEmployee(form);
    navigate("/admin/employees");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white max-w-xl rounded-3xl shadow p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-6">
          Add New Employee
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Employee name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border rounded-xl px-4 py-3"
              placeholder="email@mail.com"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="08xxxxxxxx"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Admin</option>
                <option>Staff</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border rounded-full"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;
