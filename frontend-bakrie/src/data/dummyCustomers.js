// src/data/dummyCustomers.js

let customers = [
  {
    customer_id: 1,
    username: "Budi Santoso",
    email: "budi@mail.com",
    phone_num: "081234567890",
    address: "Yogyakarta",
    img_url: "",
    created_at: "2024-01-12",
    updated_at: "2024-10-01",
  },
  {
    customer_id: 2,
    username: "Siti Aminah",
    email: "siti@mail.com",
    phone_num: "082345678901",
    address: "Bandung",
    img_url: "",
    created_at: "2024-03-21",
    updated_at: "2024-09-18",
  },
  {
    customer_id: 3,
    username: "Andi Wijaya",
    email: "andi@mail.com",
    phone_num: null,
    address: "Jakarta",
    img_url: "",
    created_at: "2024-06-05",
    updated_at: "2024-11-02",
  },
];

// =========================
// GET
// =========================
export const getDummyCustomers = () => {
  return customers;
};

// =========================
// ADD
// =========================
export const addDummyCustomer = (customer) => {
  customers.push({
    ...customer,
    customer_id: Date.now(),
    created_at: new Date().toISOString().split("T")[0],
    updated_at: new Date().toISOString().split("T")[0],
  });
};

// =========================
// UPDATE
// =========================
export const updateDummyCustomer = (id, updatedCustomer) => {
  customers = customers.map((c) =>
    c.customer_id === id
      ? {
          ...c,
          ...updatedCustomer,
          updated_at: new Date().toISOString().split("T")[0],
        }
      : c
  );
};

// =========================
// DELETE
// =========================
export const deleteDummyCustomer = (id) => {
  customers = customers.filter((c) => c.customer_id !== id);
};
