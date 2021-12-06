import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import RouteNames from '../constants/routeNames'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/', redirect: '/tasks'
  },
  {
    path: '/tasks',
    name: RouteNames.TASKS,
    component: Tasks
  },
  {
    path: '/kanban',
    name: RouteNames.KANBAN,
    component: () => import(/* webpackChunkName: "Kanban" */ '../views/ComingSoon.vue')
  },
  {
    path: '/activity',
    name: RouteNames.ACTIVITY,
    component: () => import(/* webpackChunkName: "Activity" */'../views/Activity.vue')
  },
  {
    path: '/calendar',
    name: RouteNames.CALENDAR,
    component: () => import(/* webpackChunkName: "Calendar" */ '../views/ComingSoon.vue')
  },
  {
    path: '/files',
    name: RouteNames.FILES,
    component: () => import(/* webpackChunkName: "Files" */ '../views/ComingSoon.vue')
  },
  {
    path: '/404',
    name: RouteNames.NOT_FOUND,
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
