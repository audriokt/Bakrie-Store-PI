import axios from "axios";

const URL_BASE = "http://localhost:9090/api/v1.0";

//add employee
export const addEmployee = (formData) => {
  return axios.post(`${API_URL}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update employee
export const updateEmployee = (id, formData) => {
  return axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// ambil semua employee
export const getEmployees = () => {
  return axios.get(API_URL);
};

// ambil detail employee
export const getEmployeeById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

//delete employee
export const deleteEmployee = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
