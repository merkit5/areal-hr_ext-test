import axios from 'axios'

const authHeaders = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

export const fetchHROperation = (id) => {
    return axios.get(`/api/hr-operations/${id}`, authHeaders);
}

export const fetchAllHROperations = () => {
    return axios.get('/api/hr-operations', authHeaders);
}

export const createHROperation = (data) => {
    return axios.post('/api/hr-operations', data, authHeaders);
}

export const updateHROperation = (id, data) => {
    return axios.put(`/api/hr-operations/${id}`, data, authHeaders);
}

export const deleteHROperation = (id) => {
    return axios.delete(`/api/hr-operations/${id}`, authHeaders);
}

export const fetchEmployees = () => {
    return axios.get('/api/employees', authHeaders);
}

export const fetchDepartments = () => {
    return axios.get('/api/departments', authHeaders);
}

export const fetchPositions = () => {
    return axios.get('/api/positions', authHeaders);
}