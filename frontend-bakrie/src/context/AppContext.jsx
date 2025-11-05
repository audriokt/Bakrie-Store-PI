import { createContext, useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";

export const AppContext = createContext(null);

export const AppContextProvider =(props) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchData(){
            const res = await fetchProducts()
            setProducts(res.data)
        }
        fetchData()
    },[])

    const contextValue = {
        products,
        setProducts
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}
