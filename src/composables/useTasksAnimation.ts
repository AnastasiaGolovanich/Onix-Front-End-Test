import { onBeforeUnmount, onMounted, Ref, ref } from 'vue'

export default function useTasksAnimation (isClickButton: Ref<boolean>) {
  const itemRefs = ref<Array<HTMLElement>>([]) // { value: [] }
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
  const setItemRef = (el: HTMLElement) => {
    if (el) {
      itemRefs.value.push(el)
    }
  }
  onMounted(addAnimation)
  onBeforeUnmount(() => {
    itemRefs.value = []
  })
  return {
    itemRefs,
    addAnimation,
    setItemRef
  }
}
