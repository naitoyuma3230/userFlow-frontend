import { createApp } from 'vue';
// import './style.css';
import './tritrus_style.styl';
import './assets/registration.styl';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { store, key } from './store';

createApp(App).use(vuetify).use(router).use(store, key).mount('#app');
