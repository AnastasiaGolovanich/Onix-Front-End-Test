<template lang="pug">
nav(id="footer-nav")
  router-link(v-for="link in links" :key="link.navName" :to="link.navLink") {{ link.navName }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useNavigationLinks from '@/composables/useNavigationLinks'

export default defineComponent({
  name: 'TheNavigation',
  setup () {
    const { links } = useNavigationLinks()
    return {
      links
    }
  }
})
</script>

<style scoped>
header nav {
  display: flex;
  flex-direction: row;
  opacity: 0.7;
  font-family: 'Open Sans', sans-serif;
  font-size: 17px;
  color: #131313;
}
header nav a {
  text-decoration: none;
  padding: 23px 0 13px 0;
  color: #131313;
  margin-right: 30px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
.router-link-active, .router-link-exact-active {
  border-color: orange;
}
</style>
