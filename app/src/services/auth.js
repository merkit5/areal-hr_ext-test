import axios from 'axios';

export const register = (data) => axios.post('/api/auth/register', data);
export const login = (data) => axios.post('/api/auth/login', data);
export const getUserData = () => {
  return axios.get('/api/users/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const updateUser = (data) => {
  return axios.put('/api/users/me', data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const logout = () => {
  return axios.post('/api/auth/logout', {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const checkAuth = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { authenticated: false };
  }

  try {
    const response = await axios.get('/api/auth/check', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    return { authenticated: false };
  }
};
