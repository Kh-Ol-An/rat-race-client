import axios from 'axios';
import { notify } from "@kyvg/vue3-notification";

// export const API_URL = 'http://localhost:5000/api';
export const API_URL = 'https://rate-race.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
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
            notify({
                type: 'error',
                title: 'Авторизація',
                text: 'Користувач не авторизований.',
            });
        }
    }

    throw error;
});

export default api;
