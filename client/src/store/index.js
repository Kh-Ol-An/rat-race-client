import { createStore } from 'vuex';
import auth from './modules/auth.js';
import blank from './modules/blank.js';
import error from './modules/error.js';

export default createStore({
    modules: {
        auth,
        blank,
        error,
    },
});
