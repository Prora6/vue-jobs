import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Vacancies from '../views/Vacancies.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/vacancies',
      name: 'vacancies',
      component: Vacancies
    },
  ]
})

export default router
