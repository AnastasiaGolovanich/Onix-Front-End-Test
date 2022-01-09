<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Kanban
  div(class="current-page")
    p(class="title") Today
    div(class="search-box")
      input(v-model="search" placeholder="Enter Task Name")
      input(type="date" v-model="dateFrom")
      input(type="date" v-model="dateTo")
    div(class="tasks-table")
      div(class="tasks-column" v-for="col in tableCol" :key="col.id" @drop="onDrop($event,col.status)" @dragover.prevent @dragenter.prevent)
        p(class="col-headline") {{col.headline}} - {{countTasksByStatus(col.status)}}
        div(v-for="item in generateTable(col.status)" :key="item.id" @dragstart="onDragStart($event, item)" draggable="true")
          task-item(:name="item.name" :date="item.date" :status="item.status" @click="showTaskDetails(item.id)")
          task-details-modal(v-if="isModalVisible" @close="closeModal" :tasks="tasks" :id="taskIndex")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ITask } from '@/types/ITask'
import { ITableCol } from '@/types/ITableCol'
import { IChangeStatus } from '@/types/IChangeStatus'
import TaskItem from '@/components/TaskItem.vue'
import { Status } from '@/constants/Status'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'

export default defineComponent({
  name: 'Kanban',
  components: { TaskDetailsModal, TaskItem },
  data: function () {
    return {
      tableCol: [] as ITableCol[],
      itemRefs: [] as HTMLElement[],
      changeStatus: {
        taskId: 0,
        status: Status.todo
      } as IChangeStatus,
      isModalVisible: false,
      taskIndex: 0,
      count: 0 as number,
      search: '',
      dateFrom: '',
      dateTo: ''
    }
  },
  created: function () {
    this.tableCol = [
      {
        id: 1,
        headline: 'To Do',
        status: Status.todo
      },
      {
        id: 2,
        headline: 'In Progress',
        status: Status.inprogress
      },
      {
        id: 3,
        headline: 'Done',
        status: Status.done
      }
    ] as ITableCol[]
  },
  computed: {
    tasks () : any {
      return this.$store.state.tasks
    }
  },
  methods: {
    generateTable (taskStatus : Status) {
      const tasksInStatus = this.tasks.filter((task: ITask) => task.status === taskStatus) as ITask []
      return tasksInStatus.filter(task => {
        return task.name.toLowerCase().includes(this.search.toLowerCase()) && this.dateBetween(task.date)
      })
    },
    dateBetween (taskDate: string) {
      let maxDate = '2021-12-31'
      this.tasks.forEach(function (task : ITask) {
        if (task.date > maxDate) {
          maxDate = task.date
        }
      })
      if (this.dateTo) {
        return taskDate >= this.dateFrom && taskDate <= this.dateTo
      } else {
        return taskDate >= this.dateFrom && taskDate <= maxDate
      }
    },
    onDragStart (e: DragEvent, item: ITask) {
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('itemId', item.id.toString())
      }
    },
    onDrop (e: DragEvent, catedoryId: Status) {
      if (e.dataTransfer) {
        const itemId = parseInt(e.dataTransfer.getData('itemId'))
        this.changeStatus = {
          taskId: itemId,
          status: catedoryId
        }
        this.$store.commit('changeStatus', this.changeStatus)
      }
    },
    showTaskDetails (index: number) {
      this.taskIndex = index
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    countTasksByStatus (taskStatus : Status) {
      let count = 0 as number
      this.tasks.forEach(function (task : ITask) {
        if (task.status === taskStatus) {
          count++
        }
      })
      return count
    }
  }
})
</script>
<style>
@import "../assets/style/kanban.module.css";
</style>
