import { computed, onMounted, ref } from 'vue'
import { Status } from '@/constants/Status'
import { useStore } from 'vuex'

export default function useShowNewTask (props: any, { emit }: any) {
  const isClickEdit = ref<boolean>(false) // { value: boolean}
  const newName = ref('') // { value: ''}
  const newDescription = ref('') // { value: ''}
  const newDate = ref('') // { value: ''}
  const newStatus = ref<Status>(Status.todo) // { value: Status}
  const showEditButton = ref<boolean>(true) // { value: boolean}
  const store = useStore()
  store.dispatch('tasks/getTaskByIdFromAPI', props.id).then(() => {
    getTaskById()
    showNewTask()
  })
  const getTaskById = () => {
    return store.getters['tasks/getTaskById'](props.id)
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
    isClickEdit.value = false
    return emit('close')
  }
  onMounted(() => {
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
    store,
    tasks: computed(() => {
      return store.getters['tasks/getTasks']
    })
  }
}
