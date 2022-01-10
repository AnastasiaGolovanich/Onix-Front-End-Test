import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { Status } from '@/constants/Status'
import { ITask } from '@/types/ITask'
import { IChangeStatus } from '@/types/IChangeStatus'
import { Messages } from '@/types/IMessages'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default createStore({
  state: {
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
    ] as ITask[],
    notification: 3,
    messages: [
      {
        type: 'mark',
        icon: 'check',
        description: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
        attachments: [],
        comment: null,
        time: '8:40 PM'
      },
      {
        type: 'comment',
        icon: 'comment-alt',
        description: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
        attachments: [],
        comment: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
        time: '7:32 PM'
      },
      {
        type: 'upload',
        icon: 'download',
        description: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
        attachments: [require('@/assets/comment-1.jpg'), require('@/assets/comment-2.jpg'), require('@/assets/comment-3.jpg'), require('@/assets/comment-4.jpg')],
        comment: null,
        time: '6:02 PM'
      }
    ] as Messages[]
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
    },
    addNotification (state, index: number) {
      state.notification = index
    }
  },
  getters: {
    getAttachments (state) {
      const attachments = [] as Array<string>
      state.messages.forEach(message => {
        if (message.attachments) {
          message.attachments.forEach(file => {
            attachments.push(file)
          })
        }
      })
      return attachments
    },
    getTaskById: state => (id: number) => {
      return state.tasks.find(task => task.id === id)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
