import { createApp } from 'vue';
import { createStore } from 'vuex';
import App from './App.vue';

const store = createStore({
  state() {
    return {
      property: value,
    };
  },
  mutations: {
    mutate(state) {
      // perform operation on
      // state.property
    },
  },
});

const app = createApp(App);

app.use(store);
app.mount('#app');
