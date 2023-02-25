import { computed } from 'vue'
import { useStore } from 'vuex'

export const mapState = () => {
    const store = useStore()
    return Object.fromEntries(
        Object.keys(store.state).map((state) => [
            state,
            computed(() => store.state[state]),
        ])
    )
}

export const mapGetters = () => {
    const store = useStore()
    return Object.fromEntries(
        Object.keys(store.getters).map((getter) => [
            getter,
            computed(() => store.getters[getter]),
        ])
    )
}

export const mapMutations = () => {
    const store = useStore()
    return Object.fromEntries(
        Object.keys(store._mutations).map((mutation) => [
            mutation,
            (value) => store.commit(mutation, value),
        ])
    )
}

export const mapActions = () => {
    const store = useStore()
    return Object.fromEntries(
        Object.keys(store._actions).map((action) => [
            action,
            (value) => store.dispatch(action, value),
        ])
    )
}
