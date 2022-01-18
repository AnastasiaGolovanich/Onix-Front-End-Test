import { ref } from 'vue'

export default function useModalForm () {
  const isModalFormVisible = ref(false) // { value: boolean }
  const showModal = () => {
    isModalFormVisible.value = true
  }
  const closeModalForm = () => {
    isModalFormVisible.value = false
  }
  return {
    isModalFormVisible,
    showModal,
    closeModalForm
  }
}
