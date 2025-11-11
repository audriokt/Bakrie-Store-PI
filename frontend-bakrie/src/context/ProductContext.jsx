import { useState, useEffect, createContext } from "react";
import { fetchProducts } from "../services/productService.js"; // api function yang diperluin

export const ProductContext = createContext(null)

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    const fetcDataProduct = async () => {
        try {
            setLoading(true)
            const res = await fetchProducts()
            setProducts(res.data)
            setLoading(false)
        } catch (error) {
            console.log("Gagal mendapatkan data product: ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetcDataProduct()
    }, [])

    return (
        <ProductContext.Provider value={
            {
            products,
            setProducts,
                loading,
            }
        }>
            {children}
        </ProductContext.Provider>
    )
}