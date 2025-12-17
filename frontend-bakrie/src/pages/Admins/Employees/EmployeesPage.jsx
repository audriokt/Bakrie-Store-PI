import React, { useEffect, useState, useMemo } from "react";
import { HiSearch, HiPlus, HiPencilAlt, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ✅ DUMMY (INI YANG TADI SALAH)
import {
  getDummyEmployees,
  deleteDummyEmployee,
} from "../../../data/dummyEmployees";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    setEmployees(getDummyEmployees());
  }, []);

  const filteredEmployees = useMemo(() => {
    if (!searchQuery) return employees;
    return employees.filter(
      (e) =>
        e.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [employees, searchQuery]);

  const confirmDelete = () => {
    deleteDummyEmployee(employeeToDelete.employee_id);
    setEmployees(getDummyEmployees());
    setEmployeeToDelete(null);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-red-600">
            Employee Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage admin and staff accounts
          </p>
        </div>

        <Link to="/admin/employees/add">
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center gap-2 transition">
            <HiPlus className="text-lg" />
            Add Employee
          </button>
        </Link>
      </div>

      {/* SEARCH */}
      <div className="relative max-w-md mb-6">
        <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search employee..."
          className="w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-red-50 text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-center">Role</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  No employees found
                </td>
              </tr>
            )}

            {filteredEmployees.map((e) => (
              <tr
                key={e.employee_id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">{e.username}</td>
                <td className="px-6 py-4 text-gray-600">{e.email}</td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-600 font-medium">
                    {e.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <Link to={`/admin/employees/edit/${e.employee_id}`}>
                      <HiPencilAlt className="text-blue-600 text-lg hover:scale-110 transition" />
                    </Link>

                    <button onClick={() => setEmployeeToDelete(e)}>
                      <HiTrash className="text-red-600 text-lg hover:scale-110 transition" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {employeeToDelete && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-sm shadow"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-lg font-semibold mb-2">
                Delete Employee
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">
                  {employeeToDelete.username}
                </span>
                ?
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setEmployeeToDelete(null)}
                  className="px-4 py-2 rounded-full border"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-full bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployeesPage;
