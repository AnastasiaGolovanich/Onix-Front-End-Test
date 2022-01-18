<template lang="pug">
section(class="user-info")
  h2(class="visually-hidden") User Info
  img(:src="userImage" alt="user photo")
  div
    h2 {{ userName }}
    p {{ userWork }}
  button(aria-label="see-more button")
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UserProfile',
  setup () {
    const userName = 'Jean Gonzales'
    const userWork = 'Product Owner'
    return {
      userImage: require('@/assets/user-photo.jpg'),
      userName,
      userWork
    }
  }
})
</script>

<style scoped>

</style>
