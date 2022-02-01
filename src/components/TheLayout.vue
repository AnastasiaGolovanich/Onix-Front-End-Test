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

export default defineComponent({
  components: {
    sideBar,
    Header
  }
})
</script>
