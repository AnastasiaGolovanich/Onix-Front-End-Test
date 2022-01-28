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
import { computed, defineComponent, ref } from 'vue'
import TaskItem from '@/components/TaskItem.vue'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import useFilterTable from '@/composables/useFilterTable'
import useShowTable from '@/composables/useShowTable'
import useMoveTasks from '@/composables/useMoveTasks'
import useShowTaskDetails from '@/composables/useShowTaskDetails'

export default defineComponent({
  name: 'Kanban',
  components: { TaskDetailsModal, TaskItem },
  setup () {
    const search = ref('')
    const dateFrom = ref('')
    const dateTo = ref('')
    const { store, tasks, generateTable } = useFilterTable(search, dateFrom, dateTo)
    const { countTasksByStatus, tableCol } = useShowTable(tasks.value)
    const { onDragStart, onDrop } = useMoveTasks(store)
    const { showTaskDetails, closeModal, taskIndex, isModalVisible } = useShowTaskDetails()
    return {
      tableCol,
      tasks: computed(() => {
        return store.getters['tasks/getTasks']
      }),
      search,
      dateTo,
      dateFrom,
      isModalVisible,
      generateTable,
      taskIndex,
      onDragStart,
      onDrop,
      showTaskDetails,
      closeModal,
      countTasksByStatus
    }
  }
})
</script>
<style>
@import "../assets/style/kanban.module.css";
</style>
