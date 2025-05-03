import axios from 'axios';

const authConfig = {
    withCredentials: true
};

export const fetchOrganization = (id) => {
    return axios.get(`/api/organizations/${id}`, authConfig);
};

export const fetchAllOrganizations = () => {
    return axios.get('/api/organizations', authConfig);
};

export const createOrganization = (data) => {
    return axios.post('/api/organizations', data, authConfig);
};

export const updateOrganization = (id, data) => {
    return axios.put(`/api/organizations/${id}`, data, authConfig);
};

export const deleteOrganization = (id) => {
    return axios.delete(`/api/organizations/${id}`, authConfig);
};
