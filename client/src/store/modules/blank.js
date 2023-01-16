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
            console.log('actions blank: ', blank);
            try {
                const response = await BlankService.saveBlank(blank);
                console.log('save: ', response);
                commit('setBlank', response.data.blank);
            } catch (err) {
                console.log(err)
            }
        },
        async getBlank({ commit }) {
            try {
                const response = await BlankService.getBlank();
                console.log('get: ', response);
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
