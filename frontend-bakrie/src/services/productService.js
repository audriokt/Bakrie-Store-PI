import axios from '../utils/axiosConfig';

const URL_BASE = "http://localhost:9090/api/v1.0";

// add products
export const addProduct = async (formData) => {
  return await axios.post(`${URL_BASE}/admin/product/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//  get all product
export const fetchProducts = async () => {
  return await axios.get(`${URL_BASE}/public/products/fetchProducts`);
};

// delete product
export const deleteProduct = async (productId) => {
  return await axios.delete(`${URL_BASE}/admin/product/${productId}`);
};
