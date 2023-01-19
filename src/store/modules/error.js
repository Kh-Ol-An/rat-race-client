export default {
    state: {
        error: '',
    },
    mutations: {
        setError(state, error) {
            state.error = error;
        },
    },
    getters: {
        getError(state) {
            return state.error;
        },
    },
};
