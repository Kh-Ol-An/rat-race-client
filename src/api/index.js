import axios from 'axios';
import { useStore } from 'vuex'

// export const API_URL = 'http://localhost:5000/api';
export const API_URL = 'https://rate-race.onrender.com/api';

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    headers: {
        'Access-Control-Allow-Origin': API_URL,
        'Access-Control-Allow-Methods': 'DELETE, PUT, GET, POST',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    },
    credentials: 'include',
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
});

api.interceptors.response.use((config) => config, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            return api.request(originalRequest);
        } catch (err) {
            useStore().commit('setError', {
                message: 'Користувач не авторизований...',
                type: 'auth',
            });
        }
    }

    throw error;
});

export default api;
