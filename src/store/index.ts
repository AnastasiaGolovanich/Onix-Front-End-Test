import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import tasks from './modules/tasks'
import messages from './modules/messages'

const vuexPersist = new VuexPersistence({
  key: 'my-app',
  storage: window.localStorage
})
export default createStore({
  modules: {
    tasks,
    messages
  }
  // plugins: [vuexPersist.plugin]
})
