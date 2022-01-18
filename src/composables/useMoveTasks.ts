import { Status } from '@/constants/Status'
import { IChangeStatus } from '@/types/IChangeStatus'
import { ITask } from '@/types/ITask'

export default function useMoveTasks (store: any) {
  let changeStatus = {
    taskId: 0,
    status: Status.todo
  } as IChangeStatus
  const onDragStart = (e: DragEvent, item: ITask) => {
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id.toString())
    }
  }
  const onDrop = (e: DragEvent, categoryId: Status) => {
    if (e.dataTransfer) {
      const itemId = parseInt(e.dataTransfer.getData('itemId'))
      changeStatus = {
        taskId: itemId,
        status: categoryId
      }
      store.commit('tasks/changeStatus', changeStatus)
    }
  }
  return {
    onDragStart,
    onDrop
  }
}
