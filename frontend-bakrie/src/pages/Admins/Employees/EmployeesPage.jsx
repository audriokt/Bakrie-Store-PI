import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HiPlus, HiPencilAlt, HiTrash, HiSearch, HiUserCircle } from "react-icons/hi";
import { Button, Badge } from "flowbite-react";
import { Link } from "react-router-dom";

// data dummy (pake ini duls)
const seedEmployees = [
  {
    id: 1,
    name: "Anita S.",
    email: "anita@patteserie.local",
    role: "Cashier",
    status: "active",
    phone: "0812-3456-7890",
    createdAt: "2025-10-01",
  },
  {
    id: 2,
    name: "Budi P.",
    email: "budi@patteserie.local",
    role: "Baker",
    status: "active",
    phone: "0813-1111-2222",
    createdAt: "2025-09-10",
  },
  {
    id: 3,
    name: "Citra R.",
    email: "citra@patteserie.local",
    role: "Admin",
    status: "inactive",
    phone: "0812-9999-8888",
    createdAt: "2025-08-25",
  },
];


const EmployeeStats = ({ total, active }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-6 bg-gradient-to-br from-ookay to-white rounded-2xl shadow-lg border border-ookay/60"
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm text-gray-600 font-medium">Total Employees</h3>
        <p className="text-3xl font-bold text-yes mt-2">{total}</p>
        <p className="text-xs text-gray-500 mt-1">{active} currently active</p>
      </div>
      <div className="w-14 h-14 rounded-xl bg-yes/10 flex items-center justify-center">
        <HiUserCircle className="w-8 h-8 text-yes" />
      </div>
    </div>
  </motion.div>
);


const EmployeesTable = ({ employees, onDelete, onToggleStatus }) => {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const s = `${e.name} ${e.email} ${e.role} ${e.phone}`.toLowerCase();
      return s.includes(q.toLowerCase());
    });
  }, [employees, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="bg-white rounded-2xl border border-ookay shadow-md p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <HiSearch className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-ookay/60" />
          <input
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-ookay/60 focus:ring-2 focus:ring-yes/40 outline-none"
            placeholder="Search employees..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <span className="text-sm text-gray-500">
          Showing {filtered.length} result(s)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="bg-ookay/40 text-gray-800 uppercase text-xs">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {current.map((emp) => (
              <tr
                key={emp.id}
                className="border-b last:border-b-0 hover:bg-ookay/10 transition"
              >
                <td className="py-3 px-4 font-medium">{emp.name}</td>
                <td className="py-3 px-4">{emp.email}</td>
                <td className="py-3 px-4">{emp.role}</td>
                <td className="py-3 px-4">{emp.phone}</td>
                <td className="py-3 px-4">
                  <Badge
                    color={emp.status === "active" ? "success" : "gray"}
                    className="capitalize"
                  >
                    {emp.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`edit/${emp.id}`}
                      className="text-blue-600 flex items-center gap-1"
                    >
                      <HiPencilAlt />
                    </Link>
                    <Button
                      size="xs"
                      color="light"
                      onClick={() => onToggleStatus(emp)}
                    >
                      {emp.status === "active" ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      size="xs"
                      color="failure"
                      onClick={() => onDelete(emp)}
                    >
                      <HiTrash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {current.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-ookay/60 italic"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 text-sm text-gray-600">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="xs"
            color="light"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <Button
            size="xs"
            color="light"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------
   Main Page
--------------------------------*/
const EmployeesPage = () => {
  const [employees, setEmployees] = useState(seedEmployees);

  const total = employees.length;
  const activeCount = employees.filter((e) => e.status === "active").length;

  const handleDelete = (emp) => {
    if (!confirm(`Delete ${emp.name}? This action cannot be undone.`)) return;
    setEmployees((p) => p.filter((x) => x.id !== emp.id));
  };

  const handleToggleStatus = (emp) => {
    setEmployees((p) =>
      p.map((x) =>
        x.id === emp.id
          ? { ...x, status: x.status === "active" ? "inactive" : "active" }
          : x
      )
    );
  };

  return (
   <div className="p-8 bg-ookay/20 min-h-screen">
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="mb-8"
  >
    {/* Bagian Judul dan Deskripsi */}
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-yes">Employee Management</h1>
      <p className="text-gray-600 mt-2">
        Manage staff accounts, roles, and activity.
      </p>
    </div>

    {/* EmployeeStats + Add Button */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* EmployeeStats di kiri */}
      <div className="w-full md:w-auto">
        <EmployeeStats total={total} active={activeCount} />
      </div>

      {/* Tombol tambah di kanan - tampil seperti card */}
      <motion.div
        whileHover={{ scale: 1.05, y: -3 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="cursor-pointer"
      >
        <Link
          to="add"
          className="flex flex-col items-center justify-center bg-white border border-red-200 hover:border-red-400 hover:shadow-md transition-all duration-300 rounded-2xl p-6 w-48"
        >
          <div className="bg-yes/10 p-3 rounded-full mb-3">
            <HiPlus className="text-yes text-2xl" />
          </div>
          <span className="text-red-600 font-semibold text-sm tracking-wide">
            Add Employee
          </span>
          <p className="text-xs text-gray-500 mt-1">Create new staff account</p>
        </Link>
      </motion.div>
    </div>
  </motion.div>

  {/* Table di bawah */}
  <EmployeesTable
    employees={employees}
    onDelete={handleDelete}
    onToggleStatus={handleToggleStatus}
  />
</div>
);
};

export default EmployeesPage;
