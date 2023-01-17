import BlankService from "../../services/BlankService.js";

export default {
    state: {
        blank: {},
    },
    mutations: {
        setBlank(state, blank) {
            state.blank = blank;
        },
    },
    actions: {
        async saveBlank({ commit }, blank) {
            try {
                const response = await BlankService.saveBlank(blank);
                commit('setBlank', response.data.blank);
            } catch (err) {
                console.log(err)
            }
        },
        async getBlank({ commit }) {
            try {
                const response = await BlankService.getBlank();
                commit('setBlank', response.data.blank);
            } catch (err) {
                console.log(err)
            }
        },
    },
    getters: {
        getBlank(state) {
            return state.blank;
        },
    },
};
