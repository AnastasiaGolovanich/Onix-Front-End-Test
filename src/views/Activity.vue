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
            img(v-for="(attachment, index) in message.attachments" :key="attachment" :src="attachment" @click="$emit('notification', index)")
        p(class="time") {{message.time}}
</template>

<script lang="ts">

interface Messages {
  type: string
  icon: string
  description: string
  attachments: Array<string>
  comment: string | null
  time: string
}
export default ({
  data () {
    return {
      messages: [
        {
          type: 'mark',
          icon: 'check',
          description: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
          attachments: [],
          comment: null,
          time: '8:40 PM'
        } as Messages,
        {
          type: 'comment',
          icon: 'comment-alt',
          description: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
          attachments: [],
          comment: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
          time: '7:32 PM'
        } as Messages,
        {
          type: 'upload',
          icon: 'download',
          description: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
          attachments: [require('@/assets/comment-1.jpg'), require('@/assets/comment-2.jpg'), require('@/assets/comment-3.jpg'), require('@/assets/comment-4.jpg')],
          comment: null,
          time: '6:02 PM'
        } as Messages
      ]
    }
  }
  // props: ['notification']
  // methods: {
  //   addNotification (index: number) {
  //     this.$emit('notification', index)
  //   }
  // }
})
</script>
