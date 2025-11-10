import axios from 'axios'

const URL_BASE = "http://localhost:9090/api/v1.0"

export const loginCustomer = async (data) => {
    return await axios.post(`${URL_BASE}/public/auth/login/customer`, data, {
        header: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
    })
}