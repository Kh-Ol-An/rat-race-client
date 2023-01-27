import axios from "axios";
import AuthService from "../../services/AuthService.js";
import { API_URL } from "../../api/index.js";
import router from '../../router/index.js';

export default {
    state: {
        user: {},
        isLoading: false,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setLoading(state, bool) {
            state.isLoading = bool;
        },
    },
    actions: {
        async registration({ dispatch, commit }, { name, email, password }) {
            try {
                const userResponse = await AuthService.registration(name, email, password);
                localStorage.setItem('token', userResponse.data.accessToken);
                // document.cookie = `refreshToken=${userResponse.data.refreshToken}; max-age=${30 * 24 * 60 * 60 * 1000}; secure`;
                commit('setUser', userResponse.data.user);
                dispatch('downloadBlank');
                await router.push('/');
            } catch (err) {
                commit('setError', err.response?.data);
            }
        },
        async login({ dispatch, commit }, { email, password }) {
            try {
                const userResponse = await AuthService.login(email, password);
                localStorage.setItem('token', userResponse.data.accessToken);
                // document.cookie = `refreshToken=${userResponse.data.refreshToken}; max-age=${30 * 24 * 60 * 60 * 1000}; secure`;
                commit('setUser', userResponse.data.user);
                dispatch('downloadBlank');
                await router.push('/');
            } catch (err) {
                commit('setError', err.response?.data);
            }
        },
        async logout({ commit }) {
            try {
                await AuthService.logout();
                localStorage.removeItem('token');
                // document.cookie = `refreshToken=; max-age=-1`;
                commit('setUser', {});
                await router.push('/auth');
            } catch (err) {
                commit('setError', err.response?.data);
            }
        },
        async checkAuth({ dispatch, commit }) {
            commit('setLoading', true);
            try {
                const userResponse = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
                localStorage.setItem('token', userResponse.data.accessToken);
                // document.cookie = `refreshToken=${userResponse.data.refreshToken}; max-age=${30 * 24 * 60 * 60 * 1000}; secure`;
                commit('setUser', userResponse.data.user);
                dispatch('downloadBlank');
            } catch (err) {
                commit('setError', err.response?.data);
                localStorage.removeItem('token');
                await router.push('/auth');
            } finally {
                commit('setLoading', false);
            }
        },
    },
    getters: {
        getUser(state) {
            return state.user;
        },
        getLoading(state) {
            return state.isLoading;
        },
    },
};
