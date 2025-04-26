import axios from 'axios'

const authHeaders = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

export const fetchPosition = (id) => {
    return axios.get(`/api/positions/${id}`, authHeaders);
}

export const fetchAllPositions = () => {
    return axios.get('/api/positions', authHeaders);
}

export const createPosition = (data) => {
    return axios.post('/api/positions', data, authHeaders);
}

export const updatePosition = (id, data) => {
    return axios.put(`/api/positions/${id}`, data, authHeaders);
}

export const deletePosition = (id) => {
    return axios.delete(`/api/positions/${id}`, authHeaders);
}
