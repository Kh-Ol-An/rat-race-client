import { createStore } from 'vuex';
import auth from './modules/auth.js';
import error from './modules/error.js';

export default createStore({
    modules: {
        auth,
        error,
    },
});
