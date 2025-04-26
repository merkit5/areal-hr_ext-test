import axios from 'axios'

const authHeaders = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

export const fetchAllEmployees = () => {
    return axios.get('/api/employees', authHeaders);
}

export const fetchEmployee = (id) => {
    return axios.get(`/api/employees/${id}`, authHeaders);
}

export const createEmployee = (data) => {
    return axios.post('/api/employees', data, {
        ...authHeaders,
        headers: {
            ...authHeaders.headers,
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const updateEmployee = (id, data) => {
    return axios.put(`/api/employees/${id}`, data, authHeaders);
}

export const deleteEmployee = (id) => {
    return axios.delete(`/api/employees/${id}`, authHeaders);
}