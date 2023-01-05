import { createRouter, createWebHashHistory } from 'vue-router';
import Blank from './pages/Blank.vue';
import Game from './pages/Game.vue';

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: Blank },
        { path: '/game', component: Game },
    ],
});
