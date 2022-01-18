import { onMounted, ref } from 'vue'
import { Status } from '@/constants/Status'
import { useStore } from 'vuex'
import { ITask } from '@/types/ITask'

export default function useShowNewTask (props: any, { emit }: any) {
  const isClickEdit = ref<boolean>(false) // { value: boolean}
  const newName = ref('') // { value: ''}
  const newDescription = ref('') // { value: ''}
  const newDate = ref('') // { value: ''}
  const newStatus = ref<Status>(Status.todo) // { value: Status}
  const showEditButton = ref<boolean>(true) // { value: boolean}
  const store = useStore()
  const getTaskById = () => {
    return store.getters['tasks/getTaskById'](props.id) as ITask
  }
  const showNewTask = () => {
    newName.value = getTaskById().name
    newDescription.value = getTaskById().description
    newDate.value = getTaskById().date
    newStatus.value = getTaskById().status
  }
  const showTextArea = () => {
    if (getTaskById().status !== Status.done) {
      isClickEdit.value = true
    }
  }
  const close = () => {
    emit('close')
    isClickEdit.value = false
  }
  onMounted(() => {
    getTaskById()
    showNewTask()
    if (newStatus.value === Status.done || props.isEdit) {
      showEditButton.value = false
    }
  })
  return {
    getTaskById,
    newName,
    newDescription,
    newDate,
    newStatus,
    isClickEdit,
    showEditButton,
    showTextArea,
    close,
    Status,
    store
  }
}
