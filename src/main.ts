import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import App from './App.vue'
import router from './router'
import store from './store/index'
import VCalendar from 'v-calendar'

library.add(fas)

createApp(App)
  .component('fa', FontAwesomeIcon)
  .use(router).use(store).use(VCalendar).mount('#app')
