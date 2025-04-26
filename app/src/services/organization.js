import axios from 'axios'

const authHeaders = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

export const fetchOrganization = (id) => {
    return axios.get(`/api/organizations/${id}`, authHeaders);
};

export const fetchAllOrganizations = () => {
    return axios.get('/api/organizations', authHeaders);
};

export const createOrganization = (data) => {
    return axios.post('/api/organizations', data, authHeaders);
};

export const updateOrganization = (id, data) => {
    return axios.put(`/api/organizations/${id}`, data, authHeaders);
};

export const deleteOrganization = (id) => {
    return axios.delete(`/api/organizations/${id}`, authHeaders);
};
