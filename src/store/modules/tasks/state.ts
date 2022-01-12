import { Status } from '@/constants/Status'
import { ITask } from '@/types/ITask'
import { defineComponent } from 'vue'
export const state = {
  tasks: [
    {
      id: 1,
      name: 'Install programs',
      description: 'Install Node.js and Vue CLI on PC',
      date: '2022-01-11',
      delay: 'animation-delay:0s',
      status: Status.todo,
      createDate: '2022-01-25'
    },
    {
      id: 2,
      name: 'Read the theory',
      description: 'Working with forms',
      delay: 'animation-delay:1s',
      date: '2022-01-09',
      status: Status.todo,
      createDate: '2022-01-20'
    },
    {
      id: 3,
      name: 'Practice',
      description: 'On the Tasks tab, create a form to add a new task. The form must contain 2 fields: title and description of the task.',
      delay: 'animation-delay:2s',
      date: '2022-01-12',
      status: Status.done,
      createDate: '2022-01-15'
    }
  ] as ITask[]
}
