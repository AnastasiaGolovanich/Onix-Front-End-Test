<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Task
  div(class="current-page")
    p(class="title") Files
    p(v-for="item in attachments" :key="item" class="attachments-file") {{item}}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Files',
  setup () {
    const store = useStore()
    const attachments = computed(() => {
      return store.getters['activity/getAttachments']
    })
    return {
      attachments
    }
  }
})
</script>

<style scoped>
@import "../assets/style/task.module.css";
.attachments-file {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #131313;
  line-height: 20px;
}
</style>
