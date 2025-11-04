import axios, { mergeConfig } from 'axios';

const API_BASE_URL = 'http://localhost:9090/api/v1.0';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token){
            config.headers['Authorization'] = 'Bearer ${token}';
        }
        return config;
    },
    error => Promise.reject(error)
);

export const loginService = {
    Login: () => api.get('/public/auth/login/customer')
}
export default api;