import QuizView from '@/views/QuizView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'QuizView',
      component: QuizView
    },
  ]
})

export default router
