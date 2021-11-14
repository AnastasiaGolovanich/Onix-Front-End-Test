<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Tasks
  div(class="current-page")
    p(class="title") Today
    ul
      li(v-for="message in messages" :key="message.description")
        div(class="fixed-time")
          p(class="icons" :class="message.type")
            fa(:icon="['fas', message.icon]")/
          p(class="message") {{ message.description }}
        p(class="time") {{ message.time }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Messages {
  type: string
  icon: string
  description: string
  attachments: Array<string>
  comment: string
  time: string
}
export default defineComponent({
  data () {
    return {
      messages: [
        {
          type: 'install',
          icon: 'file-upload',
          description: 'Install Node.js and Vue CLI on PC',
          time: '10:00 AM'
        },
        {
          type: 'theory',
          icon: 'book-open',
          description: 'Read the theory',
          time: '1:00 PM'
        },
        {
          type: 'practice',
          icon: 'magic',
          description: 'Translate the current project to Vue. Add Task page',
          time: '7:00 PM'
        }
      ] as Messages[]
    }
  }
})
</script>
