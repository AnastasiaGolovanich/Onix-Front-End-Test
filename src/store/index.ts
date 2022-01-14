import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import activityStore from './modules/activity'
import tasksStore from './modules/tasks'

const vuexPersist = new VuexPersistence({
  key: 'my-app',
  storage: window.localStorage
})
export default createStore({
  modules: {
    activity: activityStore,
    tasks: tasksStore
  },
  plugins: [vuexPersist.plugin]
})
