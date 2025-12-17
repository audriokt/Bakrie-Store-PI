// src/data/dummyEmployees.js

let dummyEmployees = [
  {
    employee_id: 1,
    username: "Admin Utama",
    email: "admin@mail.com",
    role: "Admin",
    status: "Active",
    phone: "081234567890",
    created_at: "2024-01-10",
    img_url: null,
  },
  {
    employee_id: 2,
    username: "Staff Gudang",
    email: "staff@mail.com",
    role: "Staff",
    status: "Active",
    phone: "089876543210",
    created_at: "2024-03-15",
    img_url: null,
  },
];

// ===============================
// GET
// ===============================
export const getDummyEmployees = () => dummyEmployees;

// ===============================
// ADD
// ===============================
export const addDummyEmployee = (employee) => {
  dummyEmployees.push({
    employee_id: Date.now(),
    created_at: new Date().toISOString().split("T")[0],
    ...employee,
  });
};

// ===============================
// UPDATE
// ===============================
export const updateDummyEmployee = (id, updatedData) => {
  dummyEmployees = dummyEmployees.map((e) =>
    e.employee_id === id ? { ...e, ...updatedData } : e
  );
};

// ===============================
// DELETE
// ===============================
export const deleteDummyEmployee = (id) => {
  dummyEmployees = dummyEmployees.filter(
    (e) => e.employee_id !== id
  );
};
