import { state } from '@/store/modules/tasks/state'
import * as getters from './getters'
import * as mutations from './mutations'
import { createStore } from 'vuex'

export default createStore({
  state,
  getters,
  mutations
})
