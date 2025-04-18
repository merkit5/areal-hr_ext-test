import axios from 'axios'

export const fetchPosition = (id) => {
    return axios.get(`/api/positions/${id}`)
}

export const fetchAllPositions = () => {
    return axios.get('/api/positions')
}

export const createPosition = (data) => {
    return axios.post('/api/positions', data)
}

export const updatePosition = (id, data) => {
    return axios.put(`/api/positions/${id}`, data)
}

export const deletePosition = (id) => {
    return axios.delete(`/api/positions/${id}`)
}
