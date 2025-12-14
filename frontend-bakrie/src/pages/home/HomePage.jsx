import React from 'react';
import Carousel from "../../components/layout/swiperComponent/Carousel";
import ItemsCard from "../../components/layout/itemsCard/ItemsCard";
import InfiniteSwiper from "../../components/core/InfiniteSwiper";
import DisclosureCard from '../../components/core/DisclosureCard';
import { useProduct } from "../../hooks/useProduct.js";
import { Link } from "react-router-dom";
import { aboutData } from "../about/AboutPage";

const HomePage = () => {
    const { products, loading, currentPage, totalPages, fetchDataProduct } = useProduct();

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
                    <div className="self-end">
                        <Link to="/products">
                            <button className="bg-yes text-white text-sm w-28 h-9 rounded-full border border-yes hover:bg-transparent hover:text-yes font-medium transition duration-300">
                                Shop All
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Infinite Swiper */}
                <div className="mt-10">
                    <InfiniteSwiper />
                </div>
            </div>

            {/* Product Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
                    <h1 className="font-extrabold text-4xl sm:text-5xl text-yes mb-16">
                        Checkout Our Products
                    </h1>

                    {loading ? (
                        <p>Loading...</p>
                    ) : products && products.length > 0 ? (
                        <>
                            <div className="grid grid-cols-4 gap-4">
                                {products.map((p) => (
                                    <ItemsCard key={p.id} product={p} />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-10 space-x-2">
                                <button
                                    disabled={currentPage === 0}
                                    onClick={() => fetchDataProduct(currentPage - 1)}
                                    className={`px-4 py-2 rounded-full border font-medium transition duration-300 ${
                                        currentPage === 0
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-yes text-white border-yes hover:bg-transparent hover:text-yes"
                                    }`}
                                >
                                    Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => fetchDataProduct(i)}
                                        className={`px-4 py-2 rounded-full border font-medium transition duration-300 ${
                                            currentPage === i
                                                ? "bg-yes text-white border-yes"
                                                : "bg-transparent text-yes border-yes hover:bg-yes hover:text-white"
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    disabled={currentPage === totalPages - 1}
                                    onClick={() => fetchDataProduct(currentPage + 1)}
                                    className={`px-4 py-2 rounded-full border font-medium transition duration-300 ${
                                        currentPage === totalPages - 1
                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                            : "bg-yes text-white border-yes hover:bg-transparent hover:text-yes"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
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

            {/* About Section */}
            <div className="bg-white pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Left - About Card */}
                    <div className="transition-transform duration-300 hover:scale-105 hover:shadow-xl rounded-2xl">
                        <DisclosureCard
                            title={aboutData[0].title}
                            description={aboutData[0].desc}
                            image={aboutData[0].image}
                            details={aboutData[0].details}
                        />
                    </div>

                    {/* Right - Text Beautiful */}
                    <div className="space-y-6 text-center lg:text-left">
                        <h2 className="text-5xl font-extrabold text-yes leading-tight">
                            We Bake Happiness,<br />One Bite at a Time 🍰
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Every pastry we make is crafted with passion — combining fine ingredients,
                            handcrafted dough, and the warmth of home baking.
                        </p>
                        <p className="text-gray-700 text-xl italic font-medium">
                            “Every bite tells a story — crafted with passion, served with love.”
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;