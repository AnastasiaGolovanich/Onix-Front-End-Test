<template lang="pug">
div(class="main-page")
  sideBar
  section(class="right-block" id="right-block")
    Header
    router-view/
</template>
<script lang="ts">
import sideBar from '@/components/TheSideBar.vue'
import Header from '@/components/TheHeader.vue'
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    sideBar,
    Header
  },
  setup () {
    const store = useStore()
    store.dispatch('tasks/getTaskFromAPI')
    store.dispatch('activity/getMessagesFromAPI')
  }
})
</script>
