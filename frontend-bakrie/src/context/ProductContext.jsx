import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);       // default array kosong
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 8;

    const fetchDataProduct = async (page = 0) => {
        setLoading(true);
        try {
            const res = await axios.get(
                `http://localhost:9090/api/v1.0/public/products/fetchProducts?page=${page}&size=${pageSize}`
            );

            // fallback aman kalau field tidak ada
            setProducts(res.data?.content || []);
            setTotalPages(res.data?.totalPages || 0);
            setCurrentPage(res.data?.number || page);
        } catch (error) {
            console.error("Gagal mendapatkan data product: ", error);
            setProducts([]); // fallback ke array kosong
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataProduct();
    }, []);

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                currentPage,
                totalPages,
                fetchDataProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};