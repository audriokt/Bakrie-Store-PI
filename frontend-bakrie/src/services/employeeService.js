import axios from '../utils/axiosConfig'

const URL_BASE = "http://localhost:9090/api/v1.0"

// defaultnya kasir
export const addEmployee = async (data) => {
    return await axios.post(`${URL_BASE}/admin/auth/register/employee`, data)
}

export const fetchEmployees = async () => {
    return await axios.get(`${URL_BASE}/admin/employees/fetchEmployees`)
}

export const deleteEmployee = async (employeeId) => {
    return await axios.delete(`${URL_BASE}/admin/employees/delete/${employeeId}`)
}

export const fetchEmployeeById = async (employeeId) => { return await axios.get(`${URL_BASE}/admin/employees/fetchEmployeeById/${employeeId}`) }

export const updateEmployeeProfile = async (employeeId, formData) => {
    // formData harus berupa FormData (karena ada file)
    return await axios.put(`${API_BASE}/admin/employee/update/${employeeId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};