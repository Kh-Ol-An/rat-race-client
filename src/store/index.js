import { createStore } from 'vuex'
import auth from './modules/auth.js'
import blank from './modules/blank.js'

export default createStore({
    modules: {
        auth,
        blank,
    },
})
