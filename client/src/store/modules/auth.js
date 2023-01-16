import axios from "axios";
import AuthService from "../../services/AuthService.js";
import { API_URL } from "../../api/index.js";

export default {
    state: {
        user: {},
        isAuth: false,
        isLoading: false,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setAuth(state, bool) {
            state.isAuth = bool;
        },
        setLoading(state, bool) {
            state.isLoading = bool;
        },
    },
    actions: {
        async registration({ commit }, { name, email, password }) {
            try {
                const response = await AuthService.registration(name, email, password);
                localStorage.setItem('token', response.data.accessToken);
                commit('setUser', response.data.user);
                commit('setAuth', true);
            } catch (err) {
                commit('setError', err.response?.data?.message);
            }
        },
        async login({ commit }, { email, password }) {
            try {
                const response = await AuthService.login(email, password);
                localStorage.setItem('token', response.data.accessToken);
                commit('setUser', response.data.user);
                commit('setAuth', true);
            } catch (err) {
                commit('setError', err.response?.data?.message);
            }
        },
        async logout({ commit }) {
            try {
                await AuthService.logout();
                localStorage.removeItem('token');
                commit('setUser', {});
                commit('setAuth', false);
            } catch (err) {
                commit('setError', err.response?.data?.message);
            }
        },
        async checkAuth({ commit }) {
            commit('setLoading', true);
            try {
                const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
                localStorage.setItem('token', response.data.accessToken);
                commit('setUser', response.data.user);
                commit('setAuth', true);
            } catch (err) {
                commit('setError', err.response?.data?.message);
            } finally {
                commit('setLoading', false);
            }
        },
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getAuth(state) {
            return state.isAuth;
        },
        getLoading(state) {
            return state.isLoading;
        },
    },
};
