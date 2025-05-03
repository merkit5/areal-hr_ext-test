import axios from 'axios';

const authConfig = {
    withCredentials: true
};

export const fetchUsers = () => {
    return axios.get('/api/users', authConfig);
};

export const fetchUser = (id) => {
    return axios.get(`/api/users/${id}`, authConfig);
};

export const createUser = (data) => {
    return axios.post('/api/users', data, authConfig);
};

export const updateUser = (id, data) => {
    return axios.put(`/api/users/${id}`, data, authConfig);
};

export const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`, authConfig);
};
