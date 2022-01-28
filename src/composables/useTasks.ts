import { useStore } from 'vuex'
import { computed } from 'vue'

export default function useTasks () {
  const store = useStore()
  const removeTask = (index : number) => {
    store.dispatch('tasks/deleteTaskFromAPI', index)
  }
  return {
    store,
    tasks: computed(() => {
      return store.getters['tasks/getTasks']
    }),
    removeTask
  }
}
