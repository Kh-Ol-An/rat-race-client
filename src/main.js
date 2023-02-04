import { createApp } from 'vue';
import App from './App.vue';
import store from './store/index.js';
import router from './router/index.js';
import Notifications from '@kyvg/vue3-notification'
import './style.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.use(Notifications);
app.mount('#app');
