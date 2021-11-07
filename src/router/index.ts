import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Activity from '../views/Content.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Activity',
    component: Activity
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tasks.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
