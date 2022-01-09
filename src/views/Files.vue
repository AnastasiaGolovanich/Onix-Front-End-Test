<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Task
  div(class="current-page")
    p(class="title") Files
    p(v-for="item in attachments" :key="item" class="attachments-file") {{item}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Files',
  computed: {
    attachments () {
      return this.$store.getters.getAttachments
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
