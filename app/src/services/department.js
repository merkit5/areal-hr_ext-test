import axios from 'axios'

export const fetchDepartment = (id) => {
    return axios.get(`/api/departments/${id}`)
}

export const fetchAllDepartments = () => {
    return axios.get(`/api/departments`)
}

export const fetchOrganizations = () => {
    return axios.get(`/api/organizations`)
}

export const fetchParentDepartments = () => {
    return axios.get(`/api/departments/parents`)
}

export const createDepartment = (data) => {
    return axios.post(`/api/departments`, data)
}

export const updateDepartment = (id, data) => {
    return axios.put(`/api/departments/${id}`, data)
}

export const deleteDepartment = (id) => {
    return axios.delete(`/api/departments/${id}`)
}