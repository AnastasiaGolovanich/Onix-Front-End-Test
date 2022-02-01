import { ApiService } from '@/service/api'
const url = {
  messages: 'messages'
}
export const MessagesApi = {
  getMessages () {
    return ApiService.get(url.messages)
  }
}
