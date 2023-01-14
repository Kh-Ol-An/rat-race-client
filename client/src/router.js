import { createRouter, createWebHashHistory } from 'vue-router';
import Blank from './pages/Blank.vue';
import Game from './pages/Game.vue';
import Auth from './pages/Auth.vue';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Blank },
        { path: '/game', component: Game },
        { path: '/auth', component: Auth },
    ],
});
