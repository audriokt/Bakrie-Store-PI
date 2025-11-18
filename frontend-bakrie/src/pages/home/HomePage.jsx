import React, { useEffect, useState } from "react";
import Carousel from "../../components/layout/swiperComponent/Carousel";
import ItemsCard from "../../components/layout/itemsCard/ItemsCard";
import InfiniteSwiper from "../../components/core/InfiniteSwiper";
import DisclosureCard from "../../components/core/DisclosureCard";
import { aboutData } from "../about/AboutPage";
import { useProduct } from "../../hooks/useProduct.js";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { products, setProducts, loading } = useProduct()
  // const [loading, setLoading] = useState(true); ini bisa dipake kalo mau tambahin loading state

  return (
    <div className="min-h-[800px] w-full">
      {/* Carousel Section */}
      <Carousel />

      {/* Favorite Choices */}
      <div className="w-full bg-ookay mt-20 py-10 overflow-hidden">
        <div className="w-full flex justify-between items-center px-10">
          <h1 className="w-full font-extrabold text-5xl text-yes">
            Favorites Choices
          </h1>
          <div>
          <div className="self-end">
            <Link to="/products">
              <button className="bg-yes text-white text-sm w-28 h-9 rounded-full border border-yes hover:bg-transparent hover:text-yes font-medium transition duration-300">
                Shop All
              </button>
            </Link>
          </div>
        </div>
        </div>

        {/* Infinite Swiper */}
        <div className="mt-10">
          <InfiniteSwiper />
        </div>
      </div>

      {/* Product Section */}
      <div className="flex flex-col justify-center items-center mt-32 w-full">
        <h1 className="font-extrabold text-5xl text-yes mb-14">
          Checkout Our Products
        </h1>
          {products.length > 0 ? (
              products.map((product) => (
                  <ItemsCard key={product.id} product={product} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center bg-[#FFF5F5] border border-[#FFDADA] rounded-2xl shadow-md w-[80%] max-w-xl py-16 px-10 text-center">
              <h2 className="text-2xl font-semibold text-red-600 mb-3">
                There's no product right now
              </h2>
              <p className="text-gray-500">
                Please check back later or explore our favorites above!
              </p>
            </div>
          )}
      </div>

      {/* About Us Section */}
      <div className="flex justify-center items-center min-h-screen bg-white-100">
        <DisclosureCard
          title={aboutData.title}
          description={aboutData.description}
          image={aboutData.image}
          details={aboutData.details}
        />
      </div>
    </div>
  );
};

export default HomePage;
