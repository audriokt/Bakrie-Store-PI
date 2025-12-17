// src/data/dummyProducts.js

let dummyProducts = [
  {
    id: 1,
    product_name: "Chocolate Croissant",
    product_price: 28000,
    description: "Delicious chocolate croissant",
    product_stock: 12,
    image_url:
      "https://sallysbakingaddiction.com/wp-content/uploads/2018/03/chocolate-croissants-2.jpg",
  },
  {
    id: 2,
    product_name: "Chocolate Donut",
    product_price: 45000,
    description: "Soft & creamy chocolate donut",
    product_stock: 6,
    image_url:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800",
  },
];

// ===== GET =====
export const getDummyProducts = () => dummyProducts;

// ===== GET BY ID =====
export const getDummyProductById = (id) =>
  dummyProducts.find((p) => p.id === Number(id));

// ===== ADD =====
export const addDummyProduct = (product) => {
  dummyProducts.push({
    id: Date.now(),
    ...product,
  });
};

// ===== UPDATE =====
export const updateDummyProduct = (id, updatedData) => {
  dummyProducts = dummyProducts.map((p) =>
    p.id === Number(id) ? { ...p, ...updatedData } : p
  );
};

// ===== DELETE =====
export const deleteDummyProduct = (id) => {
  dummyProducts = dummyProducts.filter((p) => p.id !== Number(id));
};
