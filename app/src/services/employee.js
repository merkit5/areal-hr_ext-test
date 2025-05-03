import axios from 'axios';

const authConfig = {
    withCredentials: true
};

export const fetchAllEmployees = () => {
    return axios.get('/api/employees', authConfig);
};

export const fetchEmployee = (id) => {
    return axios.get(`/api/employees/${id}`, authConfig);
};

export const createEmployee = (data) => {
    return axios.post('/api/employees', data, {
        ...authConfig,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateEmployee = (id, data) => {
    return axios.put(`/api/employees/${id}`, data, authConfig);
};

export const deleteEmployee = (id) => {
    return axios.delete(`/api/employees/${id}`, authConfig);
};