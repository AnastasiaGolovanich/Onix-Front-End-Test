import { useStore } from 'vuex'
import { ITask } from '@/types/ITask'
import { onBeforeUnmount, onMounted, onUpdated, ref } from 'vue'

export default function useTasks () {
  const store = useStore()
  const tasks: ITask = store.state.tasks.tasks
  const itemRefs: any = ref([]) // { value: [] }
  const isClickButton = ref(false) // { value: boolean }
  const addAnimation = () => {
    for (let i = 0; i < itemRefs.value.length; i++) {
      const taskBlock = itemRefs.value[i].firstElementChild
      if (taskBlock) {
        const taskBlockChildren = taskBlock.children
        for (let j = 0; j < taskBlockChildren.length; j++) {
          taskBlockChildren[1].children[j].classList.add('task-font-change')
        }
      }
    }
  }
  const addTaskFlickerAnimation = () => {
    const index = itemRefs.value.length - 1
    if (isClickButton.value) {
      const taskBlock = itemRefs.value[index]
      if (taskBlock) {
        taskBlock.classList.add('task-flicker')
      }
      isClickButton.value = false
    }
  }
  const setItemRef = (el: HTMLElement) => {
    if (el) {
      itemRefs.value.push(el)
    }
  }
  const removeTask = (index : number) => {
    store.commit('tasks/removeTask', index)
  }
  onMounted(addAnimation)
  onBeforeUnmount(() => {
    itemRefs.value = []
  })
  onUpdated(addTaskFlickerAnimation)
  return {
    itemRefs,
    isClickButton,
    tasks,
    addAnimation,
    addTaskFlickerAnimation,
    setItemRef,
    removeTask
  }
}
