import { computed, onMounted, onUpdated, ref } from 'vue'
import { Status } from '@/constants/Status'

export default function useTaskItem (props: any) {
  const task = ref<HTMLElement | null>(null)
  const addClassByStatus = () => {
    if (task.value) {
      task.value.classList.remove('overdue-task-item', 'one-day-overdue-task-item')
      if (props.status === Status.todo) {
        task.value.classList.add('toDo-task-item')
      }
      if (props.status === Status.inprogress) {
        task.value.classList.add('inProgress-task-item')
      }
      if (props.status === Status.done) {
        task.value.classList.add('done-task-item')
      }
      if (checkOverdue.value) {
        task.value.classList.add('overdue-task-item')
      } else if (checkDaysBeforeOverdue.value) {
        task.value.classList.add('one-day-overdue-task-item')
      }
    }
  }
  const checkOverdue = computed(() => {
    const date1 = Date.now()
    const date2 = Date.parse(props.date)
    const difference = (date2 - date1) / 86400000
    return difference < 0
  })
  const checkDaysBeforeOverdue = computed(() => {
    const date1 = Date.now()
    const date2 = Date.parse(props.date)
    const difference = (date2 - date1) / 86400000
    return difference < 1 && difference > -1
  })
  onMounted(() => {
    addClassByStatus()
  })
  onUpdated(() => {
    addClassByStatus()
  })
  return {
    task,
    addClassByStatus
  }
}
