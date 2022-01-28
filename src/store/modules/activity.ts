import { Module } from 'vuex'
import { IMessages } from '@/types/IMessages'
import { IChangeStatus } from '@/types/IChangeStatus'
import { ITask } from '@/types/ITask'
import { Status } from '@/constants/Status'
import axios from 'axios'

const store: Module<any, any> = {
  namespaced: true,
  state: {
    notification: 3,
    messages: [] as IMessages[]
  },
  getters: {
    getMessages (state) {
      state.messages[2].attachments = [require('@/assets/comment-1.jpg'), require('@/assets/comment-2.jpg'), require('@/assets/comment-3.jpg'), require('@/assets/comment-4.jpg')]
      return state.messages
    },
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
    setMessagesToState: (state, messages) => {
      state.messages = messages.messages
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
  actions: {
    getMessagesFromAPI ({ commit }) {
      axios.get('https://bubenchik.getsandbox.com:443/messages')
        .then((messages) => {
          commit('setMessagesToState', messages.data)
        }).catch((error) => {
          console.log(error)
        })
    }
  }
}

export default store
