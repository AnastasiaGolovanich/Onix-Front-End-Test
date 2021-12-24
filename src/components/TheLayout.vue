<template lang="pug">
div(class="main-page")
  sideBar(:notification="notification" @index-img="changeNotification($event)")
  section(class="right-block" id="right-block")
    Header
    router-view(@index-img="changeNotification($event)" @sync-tasks="sync" :tasks="tasks" @change-status="changeStatus" @save-changes="saveChanges")/
</template>
<script lang="ts">
import sideBar from '@/components/TheSideBar.vue'
import Header from '@/components/TheHeader.vue'
import { defineComponent } from 'vue'
import { Status } from '@/constants/Status'
import { ITask } from '@/types/ITask.ts'
import { IChangeStatus } from '@/types/IChangeStatus'

export default defineComponent({
  components: {
    sideBar,
    Header
  },
  data: function () {
    return {
      notification: 3,
      tasks: [] as ITask[]
    }
  },
  created () {
    this.tasks = [
      {
        id: 1,
        name: 'Install programs',
        description: 'Install Node.js and Vue CLI on PC',
        date: '2021-12-31',
        delay: 'animation-delay:0s',
        status: Status.todo
      },
      {
        id: 2,
        name: 'Read the theory',
        description: 'Working with forms',
        delay: 'animation-delay:1s',
        date: '2021-12-31',
        status: Status.todo
      },
      {
        id: 3,
        name: 'Practice',
        description: 'On the Tasks tab, create a form to add a new task. The form must contain 2 fields: title and description of the task.',
        delay: 'animation-delay:2s',
        date: '2021-12-31',
        status: Status.done
      }
    ] as ITask[]
    this.$emit('sync-tasks', this.tasks)
  },
  methods: {
    changeNotification (e: number) : void {
      this.notification = e
    },
    sync (data: any) {
      this.tasks = data
    },
    changeStatus (data: IChangeStatus) {
      this.tasks.forEach(function (task : ITask) {
        if (task.id === data.taskId) {
          if (task.status !== Status.done) {
            task.status = data.status
          }
        }
      })
    },
    saveChanges (data: ITask) {
      this.tasks.forEach(function (task : ITask) {
        if (task.id === data.id) {
          task.name = data.name
          task.description = data.description
          task.date = data.date
          task.status = data.status
        }
      })
    }
  }
})
</script>
