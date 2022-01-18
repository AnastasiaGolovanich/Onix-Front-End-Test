import { useStore } from 'vuex'
import { ITask } from '@/types/ITask'
import { Status } from '@/constants/Status'
import { Ref } from 'vue'

export default function useFilterTable (search: Ref<string>, dateFrom: Ref<string>, dateTo: Ref<string>) {
  const store = useStore()
  const tasks = store.state.tasks.tasks
  const dateBetween = (taskDate: string) => {
    let maxDate = '2021-12-31'
    tasks.forEach(function (task : ITask) {
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
    const tasksInStatus = tasks.filter((task: ITask) => task.status === taskStatus) as ITask []
    return tasksInStatus.filter(task => {
      return task.name.toLowerCase().includes(search.value.toLowerCase()) && dateBetween(task.date)
    })
  }
  return {
    store,
    tasks,
    generateTable
  }
}
