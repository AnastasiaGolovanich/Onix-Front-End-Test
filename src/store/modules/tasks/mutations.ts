import { ITask } from '@/types/ITask'
import { Status } from '@/constants/Status'
import { IChangeStatus } from '@/types/IChangeStatus'

export function addNewTask (state : any, newTask: ITask) {
  state.tasks.push({
    id: newTask.id,
    name: newTask.name,
    description: newTask.description,
    date: newTask.date,
    delay: 'animation-delay:0s',
    status: Status.todo,
    createDate: newTask.createDate
  })
}
export function removeTask (state : any, index: number) {
  state.tasks.splice(index, 1)
}
export function saveChanges (state : any, changeTask: ITask) {
  state.tasks.forEach(function (task : ITask) {
    if (task.id === changeTask.id) {
      task.name = changeTask.name
      task.description = changeTask.description
      task.date = changeTask.date
      task.status = changeTask.status
    }
  })
}
export function changeStatus (state : any, status: IChangeStatus) {
  state.tasks.forEach(function (task : ITask) {
    if (task.id === status.taskId) {
      if (task.status !== Status.done) {
        task.status = status.status
      }
    }
  })
}
