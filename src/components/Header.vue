<template lang="pug">
header
  div
    div(class="left-side")
      img(src="../assets/Shapes2x.png" alt="Logo Website Redesign")
      h2 Website Redesign
      button(class="see-more" aria-label="see-more button")
    div(class="right-side")
      img(:src="images[0]" alt="photo" class="round")
      img(:src="images[1]" alt="photo" class="round")
      img(:src="images[2]" alt="photo" class="round")
      button(class="share") Share
      button(class="chat")
        span Chat
  nav(id="footer-nav")
    ul
      li(v-for="(link, index) in links" :key="link.navName" @click="selected = index" :class="{active:selected == index}")
        router-link(:to="link.navLink") {{ link.navName }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      selected: 2,
      images: [require('@/assets/user-photo.jpg'), require('@/assets/user-photo-2.jpg'), require('@/assets/user-photo-3.jpg')],
      links: [
        {
          navName: 'Tasks',
          navLink: '/tasks'
        },
        {
          navName: 'Kanban',
          navLink: '/kanban'
        },
        {
          navName: 'Activity',
          navLink: '/'
        },
        {
          navName: 'Calendar',
          navLink: '/calendar'
        },
        {
          navName: 'Files',
          navLink: '/files'
        }
      ]
    }
  }
})
</script>
