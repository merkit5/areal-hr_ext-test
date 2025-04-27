import axios from 'axios';

export const fetchUsers = () => {
    return axios.get('/api/users', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const fetchUser = (id) => {
    return axios.get(`/api/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const createUser = (data) => {
    return axios.post('/api/users', data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const updateUser = (id, data) => {
    return axios.put(`/api/users/${id}`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};