import axios from 'axios';

const authConfig = {
    withCredentials: true
};

export const fetchAllChangeHistory = () => {
    return axios.get('/api/changeHistory', authConfig);
};
