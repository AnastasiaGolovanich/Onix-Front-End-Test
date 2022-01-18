import { useStore } from 'vuex'
import { ITask } from '@/types/ITask'

export default function useTasks () {
  const store = useStore()
  const tasks: ITask = store.state.tasks.tasks
  const removeTask = (index : number) => {
    store.commit('tasks/removeTask', index)
  }
  return {
    tasks,
    removeTask
  }
}
