<template>
  <section class="news">
    <h2 class="visually-hidden">News</h2>
    <div class="current-page">
      <p class="title">Today</p>
      <ul>
        <li v-for="message in messages" :key="message.description">
          <p class="icons"  :class="message.type">
            <fa :icon="['fas', message.icon]"/>
          </p>
          <div>
            <p class="message">{{message.description}}</p>
            <p class="sub-message" v-if="message.comment">{{message.comment}}</p>
            <div class="sub-image" v-if="message.attachments.length">
              <img v-for="(attachment, index) in message.attachments"
                   :key="attachment"
                   :src="attachment"
                   @click="addNotification(index)"
              >
            </div>
          </div>
          <p class="time">{{message.time}}</p>
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
          type: 'mark',
          icon: 'check',
          description: 'Darika Samak mark as done Listing on Product Hunt so that we can reach as many potential users',
          attachments: [],
          comment: null,
          time: '8:40 PM'
        },
        {
          type: 'comment',
          icon: 'comment-alt',
          description: 'Emilee Simchenko commented on Account for teams and personal in bottom style',
          attachments: [],
          comment: 'During a project build, it is necessary to evaluate the product design and development against project requirements and outcomes',
          time: '7:32 PM'
        },
        {
          type: 'upload',
          icon: 'download',
          description: 'Darika Samak uploaded 4 files on An option to search in current projects or in all projects',
          attachments: [require('@/assets/comment-1.jpg'), require('@/assets/comment-2.jpg'), require('@/assets/comment-3.jpg'), require('@/assets/comment-4.jpg')],
          comment: null,
          time: '6:02 PM'
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
