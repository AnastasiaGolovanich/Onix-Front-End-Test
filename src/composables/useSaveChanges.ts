import { computed, Ref, ref } from 'vue'
import { ITask } from '@/types/ITask'
import { Status } from '@/constants/Status'

export default function useSaveChanges (getTaskById: any, newName: Ref<string>, newDescription: Ref<string>, newDate: Ref<string>, newStatus: Ref<Status>, store: any, { emit }: any) {
  const errors = ref<Array<string>>([])
  const isChange = ref<boolean>(false) // { value: boolean}
  const isChangeField = () => {
    errors.value = []
    isChange.value = true
  }
  const saveChanges = () => {
    if (checkCorrectness()) {
      const changeTask = {
        id: getTaskById().id,
        name: newName.value,
        description: newDescription.value,
        date: newDate.value,
        status: newStatus.value,
        createDate: getTaskById().createDate
      } as ITask
      store.dispatch('tasks/updateTaskInAPI', changeTask)
        .then(() => {
          emit('close')
        })
    }
    isChange.value = false
  }
  const checkCorrectness = () => {
    if (!checkCorrectnessDate.value) {
      errors.value.push('Chose correct date')
    }
    if (!checkCorrectnessName.value) {
      errors.value.push('Add Task Name')
    }
    if (!checkCorrectnessDescription.value) {
      errors.value.push('Add Task Description')
    }
    return errors.value.length === 0
  }
  const checkCorrectnessDate = computed(() => {
    const date1 = Date.now()
    const date2 = Date.parse(newDate.value)
    const difference = (date2 - date1) / 86400000
    return difference > -1 || newDate.value === getTaskById().date
  })
  const checkCorrectnessName = computed(() => {
    return newName.value !== ''
  })
  const checkCorrectnessDescription = computed(() => {
    return newDescription.value !== ''
  })
  return {
    errors,
    isChange,
    isChangeField,
    saveChanges
  }
}
