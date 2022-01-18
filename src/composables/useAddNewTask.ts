import { useStore } from 'vuex'
import { ITask } from '@/types/ITask'
import { computed, Ref, ref } from 'vue'

export default function useAddNewTask (id: Ref<number>, name: Ref<string>, description: Ref<string>, date: Ref<string>, createDate: Ref<string>, { emit }: any, errors: Ref<Array<string>>) {
  const isClickButton = false
  const store = useStore()
  const tasks: ITask = store.state.tasks.tasks
  const addCreateDate = computed(() => {
    return new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
  })
  const getLastId = computed(() => {
    return store.getters['tasks/getLastId']
  })
  const addNewTask = () => {
    errors.value = []
    const newTask = {
      id: id,
      name: name,
      description: description,
      date: date,
      createDate: addCreateDate
    }
    id.value = getLastId.value + 1
    if (name.value && description.value && (new Date(date.value) > new Date())) {
      createDate = addCreateDate
      store.commit('tasks/addNewTask', newTask)
      id.value = 1 + id.value
      name = ref('')
      description = ref('')
      date = ref('')
      emit('close')
    } else {
      if (!name.value) {
        console.log(2)
        errors.value.push('Add Task Name')
      }
      if (!description.value) {
        errors.value.push('Add Task Description')
      }
      if (date.value < Date()) {
        errors.value.push('Chose correct date')
      }
    }
  }
  return {
    tasks,
    addCreateDate,
    getLastId,
    addNewTask,
    id,
    name,
    description,
    date,
    isClickButton,
    errors
  }
}
