import { Module } from 'vuex'
import { Status } from '@/constants/Status'
import { ITask } from '@/types/ITask'
import { IChangeStatus } from '@/types/IChangeStatus'
import axios from 'axios'

const store: Module<any, any> = {
  namespaced: true,
  state: {
    tasks: [
      // {
      //   id: 1,
      //   name: 'Install programs',
      //   description: 'Install Node.js and Vue CLI on PC',
      //   date: '2022-01-19',
      //   delay: 'animation-delay:0s',
      //   status: Status.todo,
      //   createDate: '2022-01-25'
      // },
      // {
      //   id: 2,
      //   name: 'Read the theory',
      //   description: 'Working with forms',
      //   delay: 'animation-delay:1s',
      //   date: '2022-01-18',
      //   status: Status.todo,
      //   createDate: '2022-01-20'
      // },
      // {
      //   id: 3,
      //   name: 'Practice',
      //   description: 'On the Tasks tab, create a form to add a new task. The form must contain 2 fields: title and description of the task.',
      //   delay: 'animation-delay:2s',
      //   date: '2022-01-17',
      //   status: Status.done,
      //   createDate: '2022-01-15'
      // }
    ] as ITask[]
  },
  getters: {
    getTasks: (state: any) => {
      console.log('4')
      axios('https://bubenchik.getsandbox.com:443/tasks', {
        method: 'GET'
      }).then((value) => {
        console.log(value.data)
        return value.data
      })
    },
    getTaskById: (state: any) => (id: number) => {
      return state.tasks.find((task:ITask) => task.id === id)
    },
    getLastId (state: any) : number {
      return state.tasks[state.tasks.length - 1].id
    }
  },
  mutations: {
    setTasksToState: (state, tasks) => {
      console.log('3')
      state.tasks = tasks
    },
    addNewTask (state, newTask: ITask) {
      const addaddtask = {
        id: newTask.id,
        name: newTask.name,
        description: newTask.description,
        date: newTask.date,
        delay: 'animation-delay:0s',
        status: Status.todo,
        createDate: newTask.createDate
      }
      state.tasks.push(addaddtask)
      // axios.post("https://bubenchik.getsandbox.com:443/tasks", addaddtask)
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
    getTaskFromAPI ({ commit }) {
      console.log('1')
      axios.get('https://bubenchik.getsandbox.com:443/tasks')
        .then((tasks) => {
          console.log('2')
          commit('setTasksToState', tasks.data)
          return tasks
        }).catch((error) => {
          console.log(error)
          return error
        })
    }
  }
}

export default store
