import axios from 'axios';

const authConfig = {
    withCredentials: true
};

export const fetchPosition = (id) => {
    return axios.get(`/api/positions/${id}`, authConfig);
};

export const fetchAllPositions = () => {
    return axios.get('/api/positions', authConfig);
};

export const createPosition = (data) => {
    return axios.post('/api/positions', data, authConfig);
};

export const updatePosition = (id, data) => {
    return axios.put(`/api/positions/${id}`, data, authConfig);
};

export const deletePosition = (id) => {
    return axios.delete(`/api/positions/${id}`, authConfig);
};
