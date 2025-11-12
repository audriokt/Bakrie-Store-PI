import React, { useEffect, useState } from "react";
import Carousel from "../../components/layout/swiperComponent/Carousel";
import ItemsCard from "../../components/layout/itemsCard/ItemsCard";
import InfiniteSwiper from "../../components/core/InfiniteSwiper";
import DisclosureCard from "../../components/core/DisclosureCard";
import { aboutData } from "../about/AboutPage";
import { AppContextProvider} from "../../context/AppContext";
import { fetchProducts } from "../../services/productService";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(true); ini bisa dipake kalo mau tambahin loading state


  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        // setLoading(false); ini bisa dipake kalo mau tambahin loading state
      }
    }
    getProducts();
  }, []);

  return (
    <div className="min-h-[800px] w-full">
      {/* Carousel Section */}
      <Carousel />

      {/* Favorite Choices */}
      <div className="w-full bg-ookay mt-20 py-10">
        <div className="min-w-full flex justify-between items-center">
          <h1 className="w-auto font-extrabold text-5xl text-yes pl-10">
            Favorites Choices
          </h1>
          <div className="w-20 self-end relative right-5">
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
      <div className="flex flex-col justify-center items-center mt-32 w-full">
        <h1 className="font-extrabold text-5xl text-yes mb-14">
          Checkout Our Products
        </h1>

        <AppContextProvider>
          {products.length > 0 ? (
            products.map((product) => (
              <ItemsCard key={product.id} products={product} />
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
        </AppContextProvider>
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
