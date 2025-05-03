import axios from 'axios';

const authConfig = {
    withCredentials: true
};

export const fetchDepartment = (id) => {
    return axios.get(`/api/departments/${id}`, authConfig);
};

export const fetchAllDepartments = () => {
    return axios.get(`/api/departments`, authConfig);
};

export const fetchOrganizations = () => {
    return axios.get(`/api/organizations`, authConfig);
};

export const fetchParentDepartments = () => {
    return axios.get(`/api/departments/parents`, authConfig);
};

export const createDepartment = (data) => {
    return axios.post(`/api/departments`, data, authConfig);
};

export const updateDepartment = (id, data) => {
    return axios.put(`/api/departments/${id}`, data, authConfig);
};

export const deleteDepartment = (id) => {
    return axios.delete(`/api/departments/${id}`, authConfig);
};
