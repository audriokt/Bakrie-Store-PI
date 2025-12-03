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

export const forgotPassword = async (data) => {
    return await axios.post(`${URL_BASE}/public/auth/forgot-password`, data)
}

export const resetPassword = async ({ token, password, confirmPassword }) => {
    return await axios.post(`${URL_BASE}/public/auth/reset-password`, {
        token,
        password,
        confirmPassword,
    }
    )
}

export const verifyEmailToken = async (token) => {
    if (!token) throw new Error("Token kosong");

    const response = await axios.post(
        "/req/signup/verify",
        null,
        {
            params: { token }
        }
    );

    return response.data;
};

// export const validateResetToken = (token) => {
//     return axios.get(`${URL_BASE}/public/auth/reset-password`, {
//         params: { token }
//     });
// };
