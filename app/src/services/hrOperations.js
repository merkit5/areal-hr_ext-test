import axios from 'axios'

export const fetchHROperation = (id) => {
    return axios.get(`/api/hr-operations/${id}`)
}

export const fetchAllHROperations = () => {
    return axios.get('/api/hr-operations')
}

export const createHROperation = (data) => {
    return axios.post('/api/hr-operations', data)
}

export const updateHROperation = (id, data) => {
    return axios.put(`/api/hr-operations/${id}`, data)
}

export const deleteHROperation = (id) => {
    return axios.delete(`/api/hr-operations/${id}`)
}

export const fetchEmployees = () => {
    return axios.get('/api/employees')
}

export const fetchDepartments = () => {
    return axios.get('/api/departments')
}

export const fetchPositions = () => {
    return axios.get('/api/positions')
}