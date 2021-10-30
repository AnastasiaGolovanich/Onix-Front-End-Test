<template>
  <div class="main-page">
    <sideBar :notification="notification" @notification="test($event)"></sideBar>
    <section class="right-block" id="right-block">
      <Header></Header>
      <router-view :notification="notification" @notification="test($event)"/>
    </section>
  </div>
</template>
<script>
import sideBar from '@/components/sideBar.vue'
import Header from '@/components/Header.vue'

export default ({
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
    test (e) {
      this.notification = e
    }
  }
})
</script>
