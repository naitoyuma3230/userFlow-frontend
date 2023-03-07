import axios from 'axios';

// const mode = import.meta.env.MODE;
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  baseURL: 'http://localhost:3000/api',
  // mode === 'test' ? 'http://localhost:3000/api' : 'http://localhost:3003',
});

export default axiosInstance;
