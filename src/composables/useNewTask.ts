import { reactive, ToRefs, toRefs } from 'vue'
import { ITask } from '@/types/ITask'

export default function useNewTask (): ToRefs<ITask> {
  const newTask = reactive({
    id: 0,
    name: '',
    description: '',
    date: '',
    createDate: '',
    delay: '',
    status: ''
  }) as unknown as ITask
  return toRefs(newTask)
}
