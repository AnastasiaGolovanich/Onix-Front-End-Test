<template lang="pug">
section(class="news")
  div(class="current-page")
    h1(class="not-found") Not Found
    p(class="not-found") Oops we couldn't find that page. Try going
      |
      |
      router-link(:to="{name: 'Tasks'}") home
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound'
})
</script>
<style scoped>
.not-found {
  opacity: 0.5;
  font-family: 'Open Sans', sans-serif;
  font-size: 20px;
  line-height: 60px;
  color: #131313;
  text-align: center;
}
</style>
