import React from "react";
import { Link } from "react-router-dom";

export const imageData = [
  {
    src: "product/cake.jpg",
    name: "Birthday Cake",
    price: "$20.00",
    description: "Delicious chocolate birthday cake with frosting.",
  },
  {
    src: "product/cupcake.jpg",
    name: "Chocolate Chip Cookies",
    price: "$5.00",
    description: "Freshly baked chocolate chip cookies.",
  },
  {
    src: "product/bread.jpg",
    name: "Soft Bread Loaf",
    price: "$8.00",
    description: "Fluffy homemade bread with a golden crust.",
  },
];

const ItemsCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {imageData.map((item, index) => (
        <Link
          key={index}
          to="/product-detail"
          state={item}
          className="flex flex-col border border-ookay rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full max-w-[340px] h-[420px] mx-auto overflow-hidden group"
        >
          {/* Bagian gambar — full dan responsif */}
          <div className="w-full h-[260px]">
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Bagian teks */}
          <div className="flex flex-col justify-center text-center px-6 py-4 flex-grow">
            <h2 className="font-semibold text-lg text-yes mb-1">
              {item.name}
            </h2>
            <p className="text-sm mt-1 bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent italic">
              {item.description}
            </p>
            <p className="font-medium text-base text-yes mt-4">
              {item.price}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ItemsCard;
