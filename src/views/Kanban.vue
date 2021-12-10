<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Kanban
  div(class="current-page")
    p(class="title") Today
    table
      tr
        th(v-for="headline in headlines" :key="headline" ) {{headline}}
      template(v-for="task in tasks" :key="task.id")
        tr(v-if="task.status === 'todo'")
           td {{task.name}} - {{task.date}}
           td
           td
        tr(v-if="task.status === 'inprogress'")
          td
          td {{task.name}} - {{task.date}}
          td
        tr(v-if="task.status === 'done'")
          td
          td
          td {{task.name}} - {{task.date}}

</template>

<script lang="ts">
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
  name: 'Kanban',
  data: function () {
    return {
      headlines: [] as Array<string>,
      tasks: [] as Tasks[]
    }
  },
  created () {
    this.headlines = ['To Do', 'In Progress', 'Done']
    this.tasks = [
      {
        id: 1,
        name: 'Install programs',
        description: 'Install Node.js and Vue CLI on PC',
        date: '12/31/2021',
        delay: 'animation-delay:0s',
        status: 'todo'
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
        status: 'done'
      }
    ] as Tasks[]
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
