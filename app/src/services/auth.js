import axios from 'axios';

export const login = (data) => axios.post('/api/auth/login', data, { withCredentials: true });

export const getUserData = () => {
  return axios.get('/api/users/me', { withCredentials: true });
};

export const updateUser = (data) => {
  return axios.put('/api/users/me', data, { withCredentials: true });
};

export const logout = () => {
  return axios.post('/api/auth/logout', {}, { withCredentials: true });
};

export const checkAuth = async () => {
  try {
    const response = await axios.get('/api/auth/check', { withCredentials: true });
    return response.data;
  } catch (error) {
    return { authenticated: false };
  }
};
