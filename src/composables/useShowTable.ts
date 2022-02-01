import { Status } from '@/constants/Status'
import { ITableCol } from '@/types/ITableCol'
import { ITask } from '@/types/ITask'

export default function useShowTable (tasks: any) {
  const tableCol = [
    {
      id: 1,
      headline: 'To Do',
      status: Status.todo
    },
    {
      id: 2,
      headline: 'In Progress',
      status: Status.inprogress
    },
    {
      id: 3,
      headline: 'Done',
      status: Status.done
    }
  ] as ITableCol[]
  const countTasksByStatus = (taskStatus : Status) => {
    let count = 0 as number
    tasks.value.forEach(function (task : ITask) {
      if (task.status === taskStatus) {
        count++
      }
    })
    return count as number
  }
  return {
    countTasksByStatus,
    tableCol
  }
}
