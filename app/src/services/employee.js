import axios from 'axios'

export const fetchAllEmployees = () => {
    return axios.get('/api/employees')
}

export const fetchEmployee = (id) => {
    return axios.get(`/api/employees/${id}`)
}

export const createEmployee = (data) => {
    return axios.post('/api/employees', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const updateEmployee = (id, data) => {
    return axios.put(`/api/employees/${id}`, data)
}

export const deleteEmployee = (id) => {
    return axios.delete(`/api/employees/${id}`)
}