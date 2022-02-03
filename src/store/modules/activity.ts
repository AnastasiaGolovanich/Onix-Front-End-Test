import { Module } from 'vuex'
import { IMessages } from '@/types/IMessages'
import { MessagesApi } from '@/service/messagesApi'

const store: Module<any, any> = {
  namespaced: true,
  state: {
    notification: 3,
    messages: [] as IMessages[]
  },
  getters: {
    getMessages (state) {
      if (state.messages.length > 1) {
        state.messages[2].attachments = [require('@/assets/comment-1.jpg'), require('@/assets/comment-2.jpg'), require('@/assets/comment-3.jpg'), require('@/assets/comment-4.jpg')]
      }
      return state.messages
    },
    getAttachments (state) {
      if (state.messages.length > 1) {
        state.messages[2].attachments = [require('@/assets/comment-1.jpg'), require('@/assets/comment-2.jpg'), require('@/assets/comment-3.jpg'), require('@/assets/comment-4.jpg')]
      }
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
