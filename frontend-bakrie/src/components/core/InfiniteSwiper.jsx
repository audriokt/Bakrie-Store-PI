import React, { useRef, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// Hapus import useProduct karena tidak digunakan lagi
// import { useProduct } from "../../hooks/useProduct.js"

// Fungsi formatPrice tetap sama
const formatPrice = (price) => {
    // Memastikan input adalah angka sebelum memanggil toLocaleString
    if (typeof price !== 'number') return '0';
    return price.toLocaleString("id-ID");
};

    const InfiniteSlider = ({ children, speed = 0.5, gap = 24 }) => {
        const sliderRef = useRef(null);
        const [isHover, setIsHover] = useState(false);
        const positionRef = useRef(0);

        useEffect(() => {
            const slider = sliderRef.current;
            if (!slider) return;

            let currentSpeed = speed;
            let animationFrame;

            const animate = () => {
                const targetSpeed = isHover ? speed * 0.25 : speed;
                currentSpeed += (targetSpeed - currentSpeed) * 0.05;

                positionRef.current -= currentSpeed;
                slider.style.transform = `translateX(${positionRef.current}px)`;

                // reset posisi ketika sudah bergeser sepanjang setengah konten
                if (Math.abs(positionRef.current) >= slider.scrollWidth / 2) {
                    positionRef.current = 0;
                }

                animationFrame = requestAnimationFrame(animate);
            };

            animate();

            return () => cancelAnimationFrame(animationFrame);
        }, [speed, isHover, children]);

        const handlePrev = () => {
            positionRef.current += 200;
            sliderRef.current.style.transform = `translateX(${positionRef.current}px)`;
        };

        const handleNext = () => {
            positionRef.current -= 200;
            sliderRef.current.style.transform = `translateX(${positionRef.current}px)`;
        };

        return (
            <div
                className="overflow-hidden relative"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-50 bg-red-600 text-white px-3 py-2 rounded-full shadow-md hover:bg-red-700 transition"
                >
                    ‹
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-50 bg-red-600 text-white px-3 py-2 rounded-full shadow-md hover:bg-red-700 transition"
                >
                    ›
                </button>

                <div
                    ref={sliderRef}
                    className="flex w-max will-change-transform transition-transform"
                    style={{ gap: `${gap}px` }}
                >
                    {children}
                    {children} {/* render ulang untuk efek seamless */}
                </div>
            </div>
        );
    };
const InfiniteSwiper = () => {
    // 1. Inisialisasi state untuk menyimpan data produk
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. useEffect untuk mengambil data dari backend
    useEffect(() => {
        const fetchTopProducts = async () => {
            setIsLoading(true);
            setError(null); // Reset error
            try {
                // Ganti URL ini dengan URL backend Anda yang sebenarnya
                const response = await fetch('http://localhost:9090/api/v1.0/public/top-products');

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                // Pastikan response.json() sesuai dengan struktur data yang diharapkan
                const data = await response.json();

                // Asumsi data adalah array of ProductResponse seperti yang Anda berikan
                setProducts(data);

            } catch (e) {
                console.error("Failed to fetch top selling products:", e);
                setError("Gagal mengambil data produk best seller.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopProducts();
    }, []); // Array kosong memastikan hanya berjalan sekali setelah render pertama

    // 3. Tampilkan pesan loading atau error
    if (isLoading) {
        return <div className="w-full bg-ookay p-10 text-center text-yes">Memuat produk best seller...</div>;
    }

    if (error) {
        return <div className="w-full bg-ookay p-10 text-center text-red-500">Error: {error}</div>;
    }

    if (products.length === 0) {
        return <div className="w-full bg-ookay p-10 text-center text-yes">Tidak ada produk best seller yang ditemukan.</div>;
    }

    // 4. Render InfiniteSlider dengan data produk
    return (
        <div className="w-full bg-ookay">
            <InfiniteSlider speed={0.6} gap={32}>
                {products.map((product) => (
                    <div
                        key={product.idProduct} // gunakan idProduct sesuai backend
                        className="min-w-[220px] h-[280px] bg-ookay rounded-l flex flex-col items-center justify-center p-2"
                    >
                        <Link to="/product-detail" state={product} className="block">
                            <img
                                src={product.image_url}
                                alt={product.product_name}
                                className="w-48 h-48 object-cover rounded-xl mb-3 shadow-md transition-transform duration-300 hover:scale-105"
                                onError={(e) => { e.target.onerror = null; e.target.src="placeholder-image-url.jpg"; }}
                            />
                        </Link>
                        <Link
                            to="/product-detail"
                            state={product}
                            className="font-semibold text-lg text-yes text-center truncate w-full px-2 hover:text-red-500 transition-colors"
                        >
                            {product.product_name}
                        </Link>
                        <p className="font-medium text-base text-yes">
                            Rp. {formatPrice(product.product_price)}
                        </p>
                    </div>
                ))}
            </InfiniteSlider>
        </div>
    );
};

export default InfiniteSwiper;