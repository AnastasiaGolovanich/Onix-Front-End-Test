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
enum Status {
  todo = 'todo',
  inprogress = 'inprogress',
  done = 'done'
}
interface Tasks {
  id: number
  name: string
  description: string
  date: string
  delay: string
  status: Status
}
export default defineComponent({
  components: {
    sideBar,
    Header
  },
  data: function () {
    return {
      notification: 3,
      tasks: [] as Tasks[]
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
        status: 'done'
      },
      {
        id: 2,
        name: 'Read the theory',
        description: 'Working with forms',
        delay: 'animation-delay:1s',
        date: '12/31/2021',
        status: 'todo'
      },
      {
        id: 3,
        name: 'Practice',
        description: 'On the Tasks tab, create a form to add a new task. The form must contain 2 fields: title and description of the task.',
        delay: 'animation-delay:2s',
        date: '12/31/2021',
        status: 'todo'
      }
    ] as Tasks[]
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
