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
      router-link(to="" class="title") Completed ITask
    div
      p(class="count") {{ openTaskCount }}
      router-link(to="/tasks" class="title") Open ITask
  nav
    p(class="menu") Menu
    ul
      li Home
      li My Task
      li(id="notification" v-bind:data-after="notification") Notifications
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import UserProfile from '@/components/UserProfile.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: { UserProfile },
  setup () {
    const userName = 'Jean Gonzales'
    const userWork = 'Product Owner'
    const completedTaskCount = ref(372)
    const openTaskCount = ref(11)
    const store = useStore()
    const notification = computed(() => {
      return store.state.activity.notification
    })
    const addTask = () => {
      if (confirm('Are you sure you want to change the number of tasks?')) {
        if (openTaskCount.value > 0) {
          completedTaskCount.value++
          openTaskCount.value--
        } else {
          alert('You have no open tasks.')
        }
      }
    }
    return {
      userImage: require('@/assets/user-photo.jpg'),
      userName,
      userWork,
      completedTaskCount,
      openTaskCount,
      addTask,
      notification
    }
  }
})
</script>
