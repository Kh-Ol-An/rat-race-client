import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', name: 'Home', component: () => import('../pages/Home.vue') },
    { path: '/blank', name: 'Blank', component: () => import('../pages/Blank.vue') },
    { path: '/game', name: 'Game', component: () => import('../pages/Game.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
