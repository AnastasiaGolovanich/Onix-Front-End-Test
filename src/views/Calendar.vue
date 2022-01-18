<template lang="pug">
section(class="news")
  h2(class="visually-hidden") ITask
  div(class="current-page")
    p(class="title") Today
    v-calendar(class="custom-calendar max-w-full" :masks="masks" :attributes="attributes" disable-page-swipe)
      template(v-slot:day-content="{ day, attributes }" class="flex flex-col h-full z-10 overflow-hidden" :class="day.year")
        span(class="day-label text-sm text-gray-900" :class="[day.dateTime === today ? 'today rounded-sm' : '' ]") {{ day.day }}
        div(class="flex-grow overflow-y-scroll overflow-x-auto")
          p(v-for="attr in attributes" :key="attr.id" class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1 bg-blue-500 text-white" @click='showTaskDetails(attr.customData.key)') {{ attr.customData.title }}
  task-details-modal(v-if="isModalVisible" @close="closeModal" :tasks="tasks" :id="taskIndex" :is-edit="true")
</template>

<script lang="ts">
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import { defineComponent } from 'vue'
import useCalendar from '@/composables/useCalendar'
import useShowTaskDetails from '@/composables/useShowTaskDetails'
export default defineComponent({
  name: 'Calendar',
  components: { TaskDetailsModal },
  setup () {
    const { today, masks, tasks, attributes } = useCalendar()
    const { isModalVisible, taskIndex, showTaskDetails, closeModal } = useShowTaskDetails()
    return {
      today,
      masks,
      tasks,
      attributes,
      isModalVisible,
      taskIndex,
      showTaskDetails,
      closeModal
    }
  }
})
</script>

<style>
@import "../assets/style/task.module.css";
@import "../assets/style/calendar.module.css";
</style>
