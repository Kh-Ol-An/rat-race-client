import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Game',
        component: () => import('../pages/Game.vue'),
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../pages/Auth.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
