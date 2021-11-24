import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Tasks from '../views/Tasks.vue'
import RouteNames from '../constants/routeNames'

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
    component: RouteNames.KANBAN
  },
  {
    path: '/activity',
    name: 'Activity',
    component: RouteNames.ACTIVITY
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: RouteNames.CALENDAR
  },
  {
    path: '/files',
    name: 'Files',
    component: RouteNames.FILES
  },
  {
    path: '/404',
    name: 'NotFound',
    component: RouteNames.NOT_FOUND
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
