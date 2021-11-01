<template lang="pug">
div(class="main-page")
  sideBar(:notification="notification" @notification="test($event)")
  section(class="right-block" id="right-block")
    Header
    router-view(:notification="notification" @notification="test($event)")/
</template>
<script lang="ts">
import sideBar from '@/components/sideBar.vue'
import Header from '@/components/Header.vue'

export default ({
  components: {
    sideBar,
    Header
  },
  data () {
    let notification: number
    return {
      notification: 3
    }
  },
  methods: {
    test (e: number) : void{
      console.log(e)
      this.notification = e
    }
  }
})
</script>
