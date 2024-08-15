import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://192.168.3.114:5000',
});

export default apiClient;