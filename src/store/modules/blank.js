import { notify } from '@kyvg/vue3-notification'
import BlankService from '../../services/BlankService.js'

export default {
    state: {
        blank: {},
    },
    mutations: {
        setBlank(state, blank) {
            state.blank = blank
        },
    },
    actions: {
        async uploadBlank({ commit }, blank) {
            try {
                const response = await BlankService.saveBlank(blank)
                commit('setBlank', response.data.blank)
                notify({
                    type: 'success',
                    title: 'Збереження даних',
                    text: 'Ваші дані збережені',
                    duration: 1000,
                })

                return true
            } catch (err) {
                console.log(err)
                return false
            }
        },
        async downloadBlank({ commit }) {
            try {
                const response = await BlankService.getBlank()
                commit('setBlank', response.data)
            } catch (err) {
                console.log(err)
            }
        },
    },
    getters: {
        getBlank(state) {
            return state.blank
        },
    },
}
