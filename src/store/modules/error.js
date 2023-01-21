export default {
    state: {
        error: {
            message: '',
            type: '',
        },
    },
    mutations: {
        setError(state, error) {
            state.error.message = error.message;
            state.error.type = error.errors;
        },
    },
    getters: {
        getError(state) {
            return state.error;
        },
    },
};
