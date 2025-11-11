import { createContext, useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import { profileCustomer } from "../services/customerService";

export const AppContext = createContext(null);

export const AppContextProvider =(props) => {
    const [products, setProducts] = useState([])
    const [auth, setAuth] = useState({
        token : null,
        role : null
    })
    const [user, setUser] = useState({
        id : null,
        username : null,
        address : null,
        email : null,
        phone_num : null,
        img_url : null,
        updatedAt : null,
        createdAt : null,
    })

    useEffect(() => {
        async function fetchData() {
            try {
                const resProd = await fetchProducts();
                const custData = await profileCustomer();
                setAuthData(localStorage.getItem('token'), localStorage.getItem('role'));

                setProducts(resProd.data);
                setUser(custData.data);
            } catch (error) {
                console.error("Gagal mengambil data:", error);
            }
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
        setAuthData,
        user
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}
