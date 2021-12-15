<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Kanban
  div(class="current-page")
    p(class="title") Today
    div(class="tasks-table")
      div(class="tasks-column" v-for="col in tableCol" :key="col.status")
        p(class="col-headline") {{col.headline}}
        div(v-for="item in generateTable(col.status)")
          task-item(:name="item.name" :date="item.date")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ITasks } from '@/types/ITasks'
import { ITableCol } from '@/types/ITableCol'
import TaskItem from '@/components/TaskItem.vue'
import { Status } from '@/constants/Status'

export default defineComponent({
  name: 'Kanban',
  components: { TaskItem },
  props: ['tasks'],
  data: function () {
    return {
      tableCol: [] as unknown as ITableCol
    }
  },
  created () {
    this.tableCol = [
      {
        headline: 'To Do',
        status: Status.todo
      },
      {
        headline: 'In Progress',
        status: Status.inprogress
      },
      {
        headline: 'Done',
        status: Status.done
      }
    ] as unknown as ITableCol
  },
  methods: {
    generateTable (taskStatus : Status) {
      const tasksInStatus = [] as ITasks []
      this.tasks.forEach(function (task : ITasks) {
        if (task.status === taskStatus) {
          tasksInStatus.push(task)
        }
      })
      return tasksInStatus
    }
  }
})
</script>
