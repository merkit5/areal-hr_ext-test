import axios from 'axios';

const authHeaders = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
};

export const fetchAllChangeHistory = () => {
    return axios.get('/api/changeHistory', authHeaders);
};
