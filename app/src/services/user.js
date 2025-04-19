import axios from 'axios';

export const fetchUsers = () => {
    return axios.get('/api/users');
};

export const fetchUser = (id) => {
    return axios.get(`/api/users/${id}`);
};

export const createUser = (data) => {
    return axios.post('/api/users', data);
};

export const updateUser = (id, data) => {
    return axios.put(`/api/users/${id}`, data);
};

export const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`);
};