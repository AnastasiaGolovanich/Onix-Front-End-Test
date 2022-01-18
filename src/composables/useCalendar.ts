import { onMounted, ref } from 'vue'
import { IAttributes } from '@/types/IAttributes'
import { useStore } from 'vuex'
import { ITask } from '@/types/ITask'

export default function useCalendar () {
  const month = new Date().getMonth()
  const year = new Date().getFullYear()
  const day = new Date().getDate()
  const today = new Date(year, month, day)
  const masks = {
    weekdays: 'WWW'
  }
  const attributes = ref<IAttributes []>([])
  const store = useStore()
  const tasks = store.state.tasks.tasks
  const takeAttr = () => {
    tasks.forEach((task: ITask) => {
      attributes.value.push({
        id: task.id,
        customData: {
          title: task.name,
          key: task.id
        },
        dates: task.createDate
      } as IAttributes
      )
    })
  }
  onMounted(takeAttr)
  return {
    today,
    masks,
    tasks,
    attributes
  }
}
