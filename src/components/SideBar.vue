<template lang="pug">
aside
  section(class="top-side-panel")
    router-link(to="/" class="logo")
    h2 Projectus
    button(aria-label="Search button")
  user-profile
  section(class="user-statistic")
    h2(class="visually-hidden") User Statistic
    div
      p(class="count" v-on:click="addTask") {{ completedTaskCount }}
      router-link(to="" class="title") Completed Tasks
    div
      p(class="count") {{ openTaskCount }}
      router-link(to="/tasks" class="title" @click="addActiveClass(0)") Open Tasks
  nav
    p(class="menu") Menu
    ul
      li Home
      li My Tasks
      li(id="notification" v-bind:data-after="notification") Notifications
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import UserProfile from '@/components/UserProfile.vue'

export default defineComponent({
  components: { UserProfile },
  props: {
    notification: { type: Object as PropType<number>, required: true }
  },
  data () {
    let completedTaskCount: number
    let openTaskCount: number
    return {
      userImage: require('@/assets/user-photo.jpg'),
      userName: 'Jean Gonzales',
      userWork: 'Product Owner',
      completedTaskCount: 372,
      openTaskCount: 11,
      imageId: 3
    }
  },
  methods: {
    addTask () {
      if (confirm('Are you sure you want to change the number of tasks?')) {
        if (this.openTaskCount > 0) {
          this.completedTaskCount++
          this.openTaskCount--
        } else {
          alert('You have no open tasks.')
        }
      }
    },
    addActiveClass (index: number) {
      this.$emit('activeClassIndex', index)
    }
  }
})
</script>
