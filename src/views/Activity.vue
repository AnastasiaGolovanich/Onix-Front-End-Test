<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Activity
  div(class="current-page")
    p(class="title") Today
    ul
      li(v-for="message in messages" :key="message.description")
        div(class="fixed-time")
          p(class="icons"  :class="message.type")
            fa(:icon="['fas', message.icon]")/
          div
            p(class="message") {{message.description}}
            p(class="sub-message" v-if="message.comment") {{message.comment}}
            div(class="sub-image" v-if="message.attachments.length")
              img(v-for="(attachment, index) in message.attachments" :key="attachment" :src="attachment" @click="addNotification(index)")
        p(class="time") {{message.time}}
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    messages () {
      return this.$store.state.messages
    }
  },
  methods: {
    addNotification (index: number) {
      this.$store.commit('addNotification', index)
    }
  }
})
</script>
