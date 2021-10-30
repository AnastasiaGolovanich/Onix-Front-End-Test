<template>
  <section class="news">
    <h2 class="visually-hidden">Tasks</h2>
    <div class="current-page">
      <p class="title">Today</p>
      <ul>
        <li v-for="message in messages" :key="message.description">
          <div class="fixed-time">
          <p class="icons" :class="message.type">
            <fa :icon="['fas', message.icon]"/>
          </p>
            <p class="message">{{ message.description }}</p>
          </div>
            <p class="time">{{ message.time }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>

export default ({
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
          description: 'Read the theory at the link',
          time: '1:00 PM'
        },
        {
          type: 'practice',
          icon: 'magic',
          description: 'Translate the current project to Vue. Add Task page',
          time: '7:00 PM'
        }
      ]
    }
  },
  props: ['notification'],
  methods: {
    addNotification (index) {
      this.$emit('notification', index)
      console.log('emit')
    }
  }
})
</script>
