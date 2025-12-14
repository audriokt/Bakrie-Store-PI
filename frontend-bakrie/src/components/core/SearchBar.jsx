import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
};

const highlightText = (text, keyword) => {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    return text.split(regex).map((part, i) =>
        regex.test(part) ? (
            <span key={i} className="font-bold text-red-600">
        {part}
      </span>
        ) : (
            part
        )
    );
};

const SearchBar = () => {
    const [active, setActive] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    const fetchProducts = async (searchTerm) => {
        if (!searchTerm.trim()) {
            setResults([]);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `http://localhost:9090/api/v1.0/public/product/search?name=${encodeURIComponent(searchTerm)}`
            );
            if (!res.ok) throw new Error("Gagal mengambil data");
            const data = await res.json();
            setResults(data.slice(0, 5));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetch = useRef(debounce(fetchProducts, 300)).current;

    useEffect(() => {
        if (query) {
            debouncedFetch(query);
            setActive(true);
        } else {
            setResults([]);
        }
    }, [query, debouncedFetch]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setActive(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="relative flex items-center">
            {/* Form inline expand */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    navigate(`/products?search=${encodeURIComponent(query)}`);
                    setActive(false); // tutup setelah submit
                }}
                className={`flex items-center rounded-full transition-all duration-300 ease-in-out overflow-hidden
          ${active ? "bg-white w-80 px-3" : "w-10"}
        `}
            >
                {/* Icon Search */}
                <button
                    onClick={() => setActive(!active)}
                    type="button"
                    className="text-2xl text-red-600 hover:text-red-700 transition flex-shrink-0"
                >
                    <i className="bx bx-search"></i>
                </button>

                {/* Input + tombol Go */}
                {active && (
                    <>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari produk..."
                            className="flex-1 ml-2 py-2 text-gray-700 font-semibold focus:outline-none border-none bg-transparent"
                        />
                        <button
                            type="submit"
                            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition font-semibold ml-2"
                        >
                            Go
                        </button>
                    </>
                )}
            </form>

            {/* Dropdown hasil pencarian */}
            {active && query.trim().length > 0 && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-lg p-3 z-50">
                    {loading && <p className="text-gray-500">🔄 Loading...</p>}
                    {error && <p className="text-red-500">❌ {error}</p>}
                    {!loading && !error && results.length === 0 && (
                        <p className="text-gray-500">Produk tidak ditemukan</p>
                    )}
                    {results.map((product) => (
                        <div
                            key={product.id_product}
                            className="flex items-center gap-3 border-b py-2 last:border-none cursor-pointer hover:bg-gray-100"
                            onClick={() => {
                                navigate("/product-detail", { state: product });
                                setActive(false); // tutup setelah klik hasil
                            }}
                        >
                            <img
                                src={product.image_url}
                                alt={product.product_name}
                                className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                                <p className="font-semibold truncate max-w-[200px]">
                                    {highlightText(product.product_name, query)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Rp {product.product_price.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Tombol lihat semua hasil */}
                    {results.length > 0 && (
                        <button
                            onClick={() => {
                                navigate(`/products?search=${encodeURIComponent(query)}`);
                                setActive(false); // tutup setelah klik lihat semua
                            }}
                            className="w-full mt-3 bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition font-semibold"
                        >
                            Lihat semua hasil
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;