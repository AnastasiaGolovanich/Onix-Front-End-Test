<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Kanban
  div(class="current-page")
    p(class="title") Today
    table
      tr
        th(v-for="headline in headlines" :key="headline" ) {{headline}}
      tr(v-for="items in generateTable" :key="items.id")
        td(v-for="item in items")
           template(v-if="item" ) {{item.name}} - {{item.date}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Tasks } from '@/views/Tasks.vue'

export default defineComponent({
  name: 'Kanban',
  props: ['tasks'],
  data: function () {
    return {
      headlines: [] as Array<string>
    }
  },
  created () {
    this.headlines = ['To Do', 'In Progress', 'Done']
  },
  computed: {
    generateTable () {
      const tasksInToDo = [] as Tasks []
      const tasksInProgress = [] as Tasks []
      const tasksInDone = [] as Tasks []
      this.tasks.forEach(function (task : Tasks) {
        if (task.status === 'todo') {
          tasksInToDo.push(task)
        }
        if (task.status === 'inprogress') {
          tasksInProgress.push(task)
        }
        if (task.status === 'done') {
          tasksInDone.push(task)
        }
      })
      const maxLength = Math.max(tasksInToDo.length, tasksInProgress.length, tasksInDone.length)
      const tableData = []
      for (let i = 0; i < maxLength; i++) {
        tableData[i] = [tasksInToDo[i], tasksInProgress[i], tasksInDone[i]]
      }
      return tableData
    }
  }
})
</script>

<style scoped>
table {
  margin-top: 20px;
  border: rgba(154, 154, 154, 0.95) 1px solid;
}
th {
  background-color: #E3EFFF;
  border: #9a9a9a 1px solid;
}
td, tr, th {
  border: #d9d9d9 1px solid;
  padding: 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  color: #131313;
}
</style>
