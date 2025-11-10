import axios from 'axios';

const URL_BASE = "http://localhost:9090/api/v1.0";

export const addProduct = async (productData) => {
    return await axios.post(`${URL_BASE}/admin/product/add`, productData)
}

export const fetchProducts = async () => {
    return await axios.get(`${URL_BASE}/public/products/fetchProducts`)
}

export const deleteProduct = async (productId) => {
    return await axios.delete(`${URL_BASE}/admin/product/${productId}`)
}