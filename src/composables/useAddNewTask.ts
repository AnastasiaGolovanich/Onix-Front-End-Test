import { useStore } from 'vuex'
import { ITask } from '@/types/ITask'
import { computed, Ref, ref } from 'vue'
import { Status } from '@/constants/Status'

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
    id.value = getLastId.value + 1
    const newTask = {
      id: id.value,
      name: name.value,
      description: description.value,
      date: date.value,
      createDate: addCreateDate.value,
      status: Status.todo,
      delay: 'animation-delay:0s'
    }
    if (name.value && description.value && (new Date(date.value) > new Date())) {
      store.dispatch('tasks/addNewTaskToAPI', newTask)
      id.value = 1 + id.value
      name = ref('')
      description = ref('')
      date = ref('')
      emit('close')
    } else {
      if (!name.value) {
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
