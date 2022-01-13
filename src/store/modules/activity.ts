import { Module } from 'vuex'
import { IMessages } from '@/types/IMessages'
import { IChangeStatus } from '@/types/IChangeStatus'
import { ITask } from '@/types/ITask'
import { Status } from '@/constants/Status'

const store: Module<any, any> = {
  namespaced: true,
  state: {
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
    ] as IMessages[]
  },
  getters: {
    getAttachments (state) {
      const attachments = [] as Array<string>
      state.messages.forEach((message:IMessages) => {
        if (message.attachments) {
          message.attachments.forEach(file => {
            attachments.push(file)
          })
        }
      })
      return attachments
    }
  },
  mutations: {
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
  actions: {
  }
}

export default store
