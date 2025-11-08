import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext.jsx";

const ProductsCard = () => {
  const { products } = useContext(AppContext);

  if (products.length === 0) {
    console.log("produk kosong");
  }

  const formatPrice = (price) => {
    return price.toLocaleString("id-ID");
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <Link
          key={index}
          to="/product-detail"
          state={product}
          className="flex flex-col border border-ookay rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 w-full max-w-[340px] h-[430px] mx-auto overflow-hidden group bg-white"
        >
          {/* Bagian gambar */}
          <div className="relative w-full h-[260px] overflow-hidden">
            <img
              src={product.image_url}
              alt={product.product_name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Badge stock di pojok kanan atas */}
            <div
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                product.product_stock > 0
                  ? "bg-ookay text-yes"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.product_stock > 0
                ? `${product.product_stock} in stock`
                : "Out of stock"}
            </div>
          </div>

          {/* Bagian teks */}
          <div className="flex flex-col justify-center text-center px-6 py-4 flex-grow">
            <h2 className="font-semibold text-lg text-yes mb-1">
              {product.product_name}
            </h2>

            <p className="text-sm mt-1 bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent italic line-clamp-2">
              {product.description}
            </p>

            <p className="font-medium text-base text-yes mt-4">
              Rp. {formatPrice(product.product_price)}
            </p>

            {/* Garis kecil biar rapi */}
            <div className="border-t border-red-100 my-3"></div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsCard;
