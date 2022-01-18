import { ref } from 'vue'

export default function useShowTaskDetails () {
  const isModalVisible = ref<boolean>(false)
  const taskIndex = ref(0)
  const showTaskDetails = (index: number) => {
    taskIndex.value = index
    isModalVisible.value = true
  }
  const closeModal = () => {
    isModalVisible.value = false
  }
  return {
    isModalVisible,
    taskIndex,
    showTaskDetails,
    closeModal
  }
}
