<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Kanban
  div(class="current-page")
    p(class="title") Today
    div(class="tasks-table")
      div(class="tasks-column" v-for="col in tableCol" :key="col.id" @drop="onDrop($event,col.status)" @dragover.prevent @dragenter.prevent)
        p(class="col-headline") {{col.headline}}
        div(v-for="item in generateTable(col.status)" :key="item.id" @dragstart="onDragStart($event, item)" draggable="true")
          task-item(:name="item.name" :date="item.date" @click="showTaskDetails(item.id)")
          task-details-modal(v-if="isModalVisible" @close="closeModal" :tasks="tasks" :id="taskIndex" @save-changes="saveChanges($event)")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ITask } from '@/types/ITask.ts'
import { ITableCol } from '@/types/ITableCol'
import { IChangeStatus } from '@/types/IChangeStatus'
import TaskItem from '@/components/TaskItem.vue'
import { Status } from '@/constants/Status'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'

export default defineComponent({
  name: 'Kanban',
  components: { TaskDetailsModal, TaskItem },
  emits: ['change-status', 'save-changes'],
  props: ['tasks'],
  data: function () {
    return {
      tableCol: [] as ITableCol[],
      changeStatus: {
        taskId: 0,
        status: Status.todo
      } as IChangeStatus,
      isModalVisible: false,
      taskIndex: 0
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
  methods: {
    generateTable (taskStatus : Status) {
      const tasksInStatus = [] as ITask []
      this.tasks.forEach(function (task : ITask) {
        if (task.status === taskStatus) {
          tasksInStatus.push(task)
        }
      })
      return tasksInStatus
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
        this.$emit('change-status', this.changeStatus)
      }
    },
    showTaskDetails (index: number) {
      // this.taskIndex = index - 1
      this.taskIndex = index
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    },
    saveChanges (data: ITask) {
      this.$emit('save-changes', data)
    }
  }
})
</script>
<style>
@import "../assets/style/kanban.module.css";
</style>
