const TASKS = () => import(/* webpackChunkName: "Tasks" */'../views/Tasks.vue')
const KANBAN = () => import(/* webpackChunkName: "Kanban" */ '../views/ComingSoon.vue')
const ACTIVITY = () => import(/* webpackChunkName: "Activity" */'../views/Activity.vue')
const CALENDAR = () => import(/* webpackChunkName: "Calendar" */ '../views/ComingSoon.vue')
const FILES = () => import(/* webpackChunkName: "Files" */ '../views/ComingSoon.vue')
const NOT_FOUND = () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
export default Object.freeze({
  TASKS,
  KANBAN,
  ACTIVITY,
  CALENDAR,
  FILES,
  NOT_FOUND
})
