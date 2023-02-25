import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../pages/HomePage.vue'),
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('../pages/AuthPage.vue'),
    },
    {
        path: '/blank',
        name: 'Blank',
        component: () => import('../pages/BlankPage.vue'),
    },
    {
        path: '/game',
        name: 'Game',
        component: () => import('../pages/GamePage.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
