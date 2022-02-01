import { Module } from 'vuex'
import { IMessages } from '@/types/IMessages'
import { IChangeStatus } from '@/types/IChangeStatus'
import { ITask } from '@/types/ITask'
import { Status } from '@/constants/Status'
import axios from 'axios'
import { MessagesApi } from '@/service/messagesApi'

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
      state.messages[2].attachments = [require('@/assets/comment-1.jpg'), require('@/assets/comment-2.jpg'), require('@/assets/comment-3.jpg'), require('@/assets/comment-4.jpg')]
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
    addNotification (state, index: number) {
      state.notification = index
    }
  },
  actions: {
    getMessagesFromAPI ({ commit }) {
      return MessagesApi.getMessages().then((messages) => {
        commit('setMessagesToState', messages)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}

export default store
