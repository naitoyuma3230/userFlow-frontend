import axios from 'axios';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  baseURL: 'http://localhost:3000/api',
});

export default axiosInstance;
