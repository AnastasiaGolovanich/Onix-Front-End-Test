<template lang="pug">
img(:src="image" alt="photo" class="round")
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['image'],
  name: 'Avatar'
})
</script>
