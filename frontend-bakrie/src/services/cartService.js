import axios from '../utils/axiosConfig'

const URL_BASE = "http://localhost:9090/api/v1.0/customer/cart";

export const fetchMyCart = async (customerId) => {
  return await axios.get(`${URL_BASE}/mycart/${customerId}`)
}

export const addToCart = async (customerId, productId, quantity) => {
  const data = {
    customerId: customerId,
    productId: productId,
    quantity: quantity
  }
  return await axios.post(`${URL_BASE}/add/itemCart`, data)
}

export const updateItemQuantity = async (itemCartId, quantity) => {
  const data = {
    itemCartId: itemCartId,
    quantity: quantity
  }
  return await axios.put(`${URL_BASE}/update/itemCart`, data)
}

export const deleteItemFromCart = async (itemCardId) => {
  return await axios.delete(`${URL_BASE}/delete/itemCart/${itemCardId}`)
}
