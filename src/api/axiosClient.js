import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://dess-directors-backend.onrender.com/api', // Your backend's base URL
});

// Interceptor to attach token from localStorage to each request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
