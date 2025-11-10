import { createContext, useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";

export const AppContext = createContext(null);

export const AppContextProvider =(props) => {
    const [products, setProducts] = useState([])
    const [auth, setAuth] = useState({
        token : null,
        role : null
    })

    useEffect(() => {
        async function fetchData(){
            const res = await fetchProducts()
            setProducts(res.data)
        }
        fetchData()
    },[])

    const setAuthData = (token, role) => {
        setAuth({token, role })
    }

    const contextValue = {
        products,
        setProducts,
        auth,
        setAuthData
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}
