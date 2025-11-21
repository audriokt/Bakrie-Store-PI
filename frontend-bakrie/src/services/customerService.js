import axios from '../utils/axiosConfig'

const URL_BASE = "http://localhost:9090/api/v1.0"

export const addCustomer = async (data) => {
    return await axios.post(`${URL_BASE}/public/auth/register/customer`, data)
}

export const deleteUser = async (userId) => {
    return await axios.delete(`${URL_BASE}/customer/delete/${userId}`)
}

export const fetchCustomers = async () => {
    return await axios.get(`${URL_BASE}/admin/customers/fetchCustomers`)
}

export const fetchCustomerById = async (userId) => {
    return await axios.get(`${URL_BASE}/admin/customers/fetchCustomerById/${userId}`)
}
export const profileCustomer = async () => {
    return await axios.get(`${URL_BASE}/customer/myprofile`)
}

export const updateCustomerProfile = async (customer_id, formData) => {
    return await axios.put(`/customer/update/${customer_id}`, formData);
};

export const changeCustomerPassword = async (payload) => {
    return await axios.post("/customer/change-password", payload);
};


