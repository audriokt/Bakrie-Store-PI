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
];

const ItemsCard = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-7">
      {imageData.map((item, index) => (
        <Link
          key={index}
          to="/product-detail"
          state={item} // ← kirim data produk ke ProductDetailPage
          className="block"
        >
          <img
            src={item.src}
            alt={item.name}
            className="card-shadow relative min-w-52 h-48 rounded-lg border border-red-500 overflow-hidden object-cover"
          />
          <h2 className="font-semibold text-sm text-yes mt-2">{item.name}</h2>
          <p className="text-yes font-semibold text-sm">{item.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default ItemsCard;
