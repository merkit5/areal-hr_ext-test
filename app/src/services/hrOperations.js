import axios from 'axios';

const authConfig = {
    withCredentials: true
};

export const fetchHROperation = (id) => {
    return axios.get(`/api/hr-operations/${id}`, authConfig);
};

export const fetchAllHROperations = () => {
    return axios.get('/api/hr-operations', authConfig);
};

export const createHROperation = (data) => {
    return axios.post('/api/hr-operations', data, authConfig);
};

export const updateHROperation = (id, data) => {
    return axios.put(`/api/hr-operations/${id}`, data, authConfig);
};

export const deleteHROperation = (id) => {
    return axios.delete(`/api/hr-operations/${id}`, authConfig);
};

export const fetchEmployees = () => {
    return axios.get('/api/employees', authConfig);
};

export const fetchDepartments = () => {
    return axios.get('/api/departments', authConfig);
};

export const fetchPositions = () => {
    return axios.get('/api/positions', authConfig);
};
