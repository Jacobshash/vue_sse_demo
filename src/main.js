import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import SimpleSse from './views/SimpleSse.vue';
import Home from './views/HomePage.vue'; // 新增主页组件

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/simple_sse',
    name: 'SimpleSse',
    component: SimpleSse,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
