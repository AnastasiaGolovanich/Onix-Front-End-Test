<template lang="pug">
div(class="task-item" ref="task")
  p(class="task-name") {{name}}
  p(class="task-date") {{date}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Status } from '@/constants/Status'

export default defineComponent({
  name: 'TaskItem',
  props: ['name', 'date', 'status'],
  data: function () {
    return {
      isOverdue: false,
      taskDate: ''
    }
  },
  mounted () {
    this.addClassByStatus()
    this.taskDate = this.date
  },
  updated () {
    this.addClassByStatus()
  },
  methods: {
    addClassByStatus: function () {
      const taskItem = this.$refs.task as HTMLElement
      if (this.status === Status.todo) {
        taskItem.classList.add('toDo-task-item')
      }
      if (this.status === Status.inprogress) {
        taskItem.classList.add('inProgress-task-item')
      }
      if (this.status === Status.done) {
        taskItem.classList.add('done-task-item')
      }
      if (this.checkOverdue) {
        taskItem.classList.add('overdue-task-item')
      } else if (this.checkDaysBeforeOverdue) {
        taskItem.classList.add('one-day-overdue-task-item')
      }
    }
  },
  computed: {
    checkOverdue () : boolean {
      const date1 = Date.now()
      const date2 = Date.parse(this.date)
      const difference = (date2 - date1) / 86400000
      if (difference < -1) {
        return true
      }
      return false
    },
    checkDaysBeforeOverdue () : boolean {
      const date1 = Date.now()
      const date2 = Date.parse(this.date)
      const difference = (date2 - date1) / 86400000
      if (difference < 0 && difference > -1) {
        return true
      }
      return false
    }
  }
}
)
</script>
<style>
@import "../assets/style/task-item.module.css";
</style>
