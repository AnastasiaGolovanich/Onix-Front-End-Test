import { useStore } from 'vuex'
import { ITask } from '@/types/ITask'
import { Status } from '@/constants/Status'
import { computed, Ref } from 'vue'

export default function useFilterTable (search: Ref<string>, dateFrom: Ref<string>, dateTo: Ref<string>) {
  const store = useStore()
  store.dispatch('tasks/getTaskFromAPI')
  const tasks = computed(() => {
    return store.getters['tasks/getTasks']
  })
  const dateBetween = (taskDate: string) => {
    let maxDate = '2021-12-31'
    tasks.value.forEach(function (task : ITask) {
      if (task.date > maxDate) {
        maxDate = task.date
      }
    })
    if (dateTo.value) {
      return taskDate >= dateFrom.value && taskDate <= dateTo.value
    } else {
      return taskDate >= dateFrom.value && taskDate <= maxDate
    }
  }
  const generateTable = (taskStatus : Status) => {
    const tasksInStatus = tasks.value.filter((task: ITask) => task.status === taskStatus) as ITask []
    return tasksInStatus.filter(task => {
      return task.name.toLowerCase().includes(search.value.toLowerCase()) && dateBetween(task.date)
    })
  }
  return {
    tasks,
    generateTable
  }
}
