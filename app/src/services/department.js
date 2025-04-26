import axios from 'axios'

const authHeaders = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

export const fetchDepartment = (id) => {
    return axios.get(`/api/departments/${id}`, authHeaders);
};

export const fetchAllDepartments = () => {
    return axios.get(`/api/departments`, authHeaders);
};

export const fetchOrganizations = () => {
    return axios.get(`/api/organizations`, authHeaders);
};

export const fetchParentDepartments = () => {
    return axios.get(`/api/departments/parents`, authHeaders);
};

export const createDepartment = (data) => {
    return axios.post(`/api/departments`, data, authHeaders);
};

export const updateDepartment = (id, data) => {
    return axios.put(`/api/departments/${id}`, data, authHeaders);
};

export const deleteDepartment = (id) => {
    return axios.delete(`/api/departments/${id}`, authHeaders);
};
