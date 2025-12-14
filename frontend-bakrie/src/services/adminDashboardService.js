// src/services/api.js
const API_BASE = "http://localhost:9090/api/v1.0/admin";

const api = {
    get: async (endpoint) => {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
    },

    post: async (endpoint, data) => {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: "POST",
            credentials: "include",
            body: data,
        });
        if (!res.ok) throw new Error("Failed to post");
        return res.json();
    },

    patch: async (endpoint, data) => {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Failed to patch");
        return res.json();
    },

    delete: async (endpoint) => {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            method: "DELETE",
            credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to delete");
        return res;
    },
};

export default api;