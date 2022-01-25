import { useStore } from 'vuex'
import { ITask } from '@/types/ITask'
import { onMounted } from 'vue'

export default function useTasks () {
  const store = useStore()
  const tasks: ITask = store.getters['tasks/getTasks']
  console.log('5')
  console.log(tasks)
  const removeTask = (index : number) => {
    store.commit('tasks/removeTask', index)
  }
  return {
    tasks,
    store,
    removeTask
  }
}
