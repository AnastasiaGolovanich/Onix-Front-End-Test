<template lang="pug">
div(class="main-page")
  sideBar(:notification="notification" @index-img="changeNotification($event)")
  section(class="right-block" id="right-block")
    Header
    router-view(@index-img="changeNotification($event)")/
</template>
<script lang="ts">
import sideBar from '@/components/SideBar.vue'
import Header from '@/components/Header.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    sideBar,
    Header
  },
  data () {
    return {
      notification: 3
    }
  },
  methods: {
    changeNotification (e: number) : void {
      this.notification = e
    }
  }
})
</script>
