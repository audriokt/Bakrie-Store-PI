import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:9090/api/v1.0",
});

const PUBLIC_ENDPOINTS = [
    "/public/auth/login",
    "/public/auth/signup",
    "/public/auth/forgot-password",
    "/public/auth/reset-password",
    "/req/signup/verify",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/public/**"
];

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    const isPublicEndpoint = PUBLIC_ENDPOINTS.some(pattern => {
        if (pattern.endsWith("/**")) {
            const base = pattern.replace("/**", "");
            return config.url?.includes(base);
        }
        return config.url?.includes(pattern);
    });

    if (token && !isPublicEndpoint) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
    delete config.headers.Authorization;
}
    return config;
});

export default instance;