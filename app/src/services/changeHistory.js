import axios from 'axios';

export const fetchAllChangeHistory = () => {
    return axios.get('/api/changeHistory');
};
