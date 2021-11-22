import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Tasks from '../views/Tasks.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', redirect: '/tasks'
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks
  },
  {
    path: '/kanban',
    name: 'Kanban',
    component: () => import(/* webpackChunkName: "Kanban" */ '../views/ComingSoon.vue')
  },
  {
    path: '/activity',
    name: 'Activity',
    component: () => import(/* webpackChunkName: "Activity" */ '../views/Activity.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import(/* webpackChunkName: "Calendar" */ '../views/ComingSoon.vue')
  },
  {
    path: '/files',
    name: 'Files',
    component: () => import(/* webpackChunkName: "Files" */ '../views/ComingSoon.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
