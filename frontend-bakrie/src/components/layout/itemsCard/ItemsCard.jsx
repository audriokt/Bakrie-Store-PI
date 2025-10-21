import React from 'react'

export const imageData = [   // ← penting: tambahkan "export"
  {
    src: 'product/cake.jpg',
    name: 'Birthday Cake',
    price: '$20.00',
    description: 'Delicious chocolate birthday cake with frosting.',
  },
  {
    src: 'product/cupcake.jpg',
    name: 'Chocolate Chip Cookies',
    price: '$5.00',
    description: 'Freshly baked chocolate chip cookies.',
  },
];

const ItemsCard = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-7">
      {imageData.map((item, index) => (
        <div key={index}>
          <img
            src={item.src}
            alt={item.name}
            className="card-shadow relative min-w-52 h-48 rounded-lg border border-red-500 overflow-hidden object-cover"
          />
          <h2 className="font-semibold text-sm text-yes mt-2">{item.name}</h2>
          <p className="text-yes font-semibold text-sm">{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ItemsCard;
