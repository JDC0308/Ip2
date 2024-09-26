import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Fighters from '../pages/Fighters.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/fighters',
    name: 'Fighters',
    component: Fighters,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
