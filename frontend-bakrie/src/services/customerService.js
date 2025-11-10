import axios from 'axios'

const URL_BASE = "http://localhost:9090/api/v1.0"

export const addCustomer = async (data) => {
    return await axios.post(`${URL_BASE}/public/auth/register/customer`, data, {
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
}

export const deleteUser = async (userId) => {
    return await axios.delete(`${URL_BASE}/customer/delete/${userId}`, {
        header: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
}

export const fetchCustomers = async () => {
    return await axios.get(`${URL_BASE}/admin/customers/fetchCustomers`, {
        header: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
}


