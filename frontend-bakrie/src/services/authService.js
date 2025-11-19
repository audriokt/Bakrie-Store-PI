import axios from '../utils/axiosConfig'

const URL_BASE = "http://localhost:9090/api/v1.0"

export const loginCustomer = async (data) => {
    return await axios.post(`${URL_BASE}/public/auth/login/customer`, data)
}

export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login"; // atau navigate pake useNavigate kalau di komponen
};

export const loginAdmin = async (data) => { return await axios.post(`${URL_BASE}/public/auth/login/admin`, data) }