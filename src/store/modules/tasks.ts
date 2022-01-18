import { Module } from 'vuex'
import { Status } from '@/constants/Status'
import { ITask } from '@/types/ITask'
import { IChangeStatus } from '@/types/IChangeStatus'

const store: Module<any, any> = {
  namespaced: true,
  state: {
    tasks: [
      {
        id: 1,
        name: 'Install programs',
        description: 'Install Node.js and Vue CLI on PC',
        date: '2022-01-19',
        delay: 'animation-delay:0s',
        status: Status.todo,
        createDate: '2022-01-25'
      },
      {
        id: 2,
        name: 'Read the theory',
        description: 'Working with forms',
        delay: 'animation-delay:1s',
        date: '2022-01-18',
        status: Status.todo,
        createDate: '2022-01-20'
      },
      {
        id: 3,
        name: 'Practice',
        description: 'On the Tasks tab, create a form to add a new task. The form must contain 2 fields: title and description of the task.',
        delay: 'animation-delay:2s',
        date: '2022-01-17',
        status: Status.done,
        createDate: '2022-01-15'
      }
    ] as ITask[]
  },
  getters: {
    getTaskById: (state: any) => (id: number) => {
      return state.tasks.find((task:ITask) => task.id === id)
    },
    getLastId (state: any) : number {
      return state.tasks[state.tasks.length - 1].id
    }
  },
  mutations: {
    addNewTask (state, newTask: ITask) {
      state.tasks.push({
        id: newTask.id,
        name: newTask.name,
        description: newTask.description,
        date: newTask.date,
        delay: 'animation-delay:0s',
        status: Status.todo,
        createDate: newTask.createDate
      })
    },
    removeTask (state, index: number) {
      state.tasks.splice(index, 1)
    },
    saveChanges (state, changeTask: ITask) {
      state.tasks.forEach(function (task : ITask) {
        if (task.id === changeTask.id) {
          task.name = changeTask.name
          task.description = changeTask.description
          task.date = changeTask.date
          task.status = changeTask.status
        }
      })
    },
    changeStatus (state, status: IChangeStatus) {
      state.tasks.forEach(function (task : ITask) {
        if (task.id === status.taskId) {
          if (task.status !== Status.done) {
            task.status = status.status
          }
        }
      })
    }
  },
  actions: {
  }
}

export default store
