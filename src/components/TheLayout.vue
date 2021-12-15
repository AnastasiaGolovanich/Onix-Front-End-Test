<template lang="pug">
div(class="main-page")
  sideBar(:notification="notification" @index-img="changeNotification($event)")
  section(class="right-block" id="right-block")
    Header
    router-view(@index-img="changeNotification($event)" @sync-tasks="sync" :tasks="tasks")/
</template>
<script lang="ts">
import sideBar from '@/components/TheSideBar.vue'
import Header from '@/components/TheHeader.vue'
import { defineComponent } from 'vue'
import { Status } from '@/constants/Status'
import { ITasks } from '@/types/ITasks'

export default defineComponent({
  components: {
    sideBar,
    Header
  },
  data: function () {
    return {
      notification: 3,
      tasks: [] as ITasks[]
    }
  },
  created () {
    this.tasks = [
      {
        id: 1,
        name: 'Install programs',
        description: 'Install Node.js and Vue CLI on PC',
        date: '12/31/2021',
        delay: 'animation-delay:0s',
        status: Status.done
      },
      {
        id: 2,
        name: 'Read the theory',
        description: 'Working with forms',
        delay: 'animation-delay:1s',
        date: '12/31/2021',
        status: Status.todo
      },
      {
        id: 3,
        name: 'Practice',
        description: 'On the ITasks tab, create a form to add a new task. The form must contain 2 fields: title and description of the task.',
        delay: 'animation-delay:2s',
        date: '12/31/2021',
        status: Status.todo
      }
    ] as ITasks[]
    this.$emit('sync-tasks', this.tasks)
  },
  methods: {
    changeNotification (e: number) : void {
      this.notification = e
    },
    sync (data: any) {
      this.tasks = data
    }
  }
})
</script>
