import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext.jsx";
import App from "../../../App";


const ItemsCard = () => {
  const {products} = useContext(AppContext)
  if(products.length === 0){
    console.log("produk kosong");
  }
  
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-7">
      {products.map((product, index) => (
        <Link
          key={index}
          to="/product-detail"
          state={product} // ← kirim data produk ke ProductDetailPage
          className="block"
        >
          <img
            src={product.image_url}
            alt={product.product_name}
            className="card-shadow relative min-w-52 h-48 rounded-lg border border-red-500 overflow-hidden object-cover"
          />
          <h2 className="font-semibold text-sm text-yes mt-2">{product.product_name}</h2>
          <p className="text-yes font-semibold text-sm">{product.product_price}</p>
        </Link>
      ))}
    </div>
  );
};

export default ItemsCard;
