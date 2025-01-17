import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import SimpleSseEmitter from './views/SimpleSseEmitter.vue';
import SimpleFlux from './views/SimpleFlux.vue';
import Home from './views/HomePage.vue'; // 新增主页组件

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/simple_sse_emitter',
    name: 'SimpleSseEmitter',
    component: SimpleSseEmitter,
  },{
    path: '/simple_flux',
    name: 'SimpleFlux',
    component: SimpleFlux,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
