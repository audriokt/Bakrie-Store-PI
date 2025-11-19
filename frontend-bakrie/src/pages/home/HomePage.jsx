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
        {/* Product Section – Judul di luar grid */}
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
                {/* JUDUL INI DI LUAR GRID */}
                <h1 className="font-extrabold text-4xl sm:text-5xl text-yes mb-16">
                    Checkout Our Products
                </h1>

                {/* GRID HANYA UNTUK PRODUK */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yes border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading products...</p>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                        {products.map((product) => (
                            <ItemsCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center bg-[#FFF5F5] border-2 border-dashed border-[#FFDADA] rounded-3xl shadow-lg max-w-2xl mx-auto py-20 px-10 text-center">
                        <img src="/waiting/waiting.svg" alt="No products" className="w-32 mb-6" />
                        <h2 className="text-2xl font-bold text-red-600 mb-3">
                            There's no product right now
                        </h2>
                        <p className="text-gray-500">
                            Please check back later or explore our store right away!
                        </p>
                    </div>
                )}
            </div>
        </section>

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
