export default function useTasks (store: any) {
  const removeTask = (index : number) => {
    store.dispatch('tasks/deleteTaskFromAPI', index)
  }
  return {
    store,
    removeTask
  }
}
