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
import { IAttributes } from '@/types/IAttributes'
import { defineComponent } from 'vue'
import { ITask } from '@/types/ITask'
export default defineComponent({
  name: 'Calendar',
  components: { TaskDetailsModal },
  data () {
    const month = new Date().getMonth()
    const year = new Date().getFullYear()
    const day = new Date().getDate()
    return {
      today: new Date(year, month, day),
      masks: {
        weekdays: 'WWW'
      },
      attributes: [{
        id: 0,
        customData: {
          title: ''
        },
        dates: ''
      }] as IAttributes [],
      isModalVisible: false,
      taskIndex: 0
    }
  },
  mounted () {
    this.takeAttr()
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  },
  methods: {
    takeAttr () {
      this.tasks.forEach((task: ITask) => {
        this.attributes.push({
          id: task.id,
          customData: {
            title: task.name,
            key: task.id
          },
          dates: task.createDate
        } as IAttributes
        )
      })
    },
    showTaskDetails (index: number) {
      this.taskIndex = index
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
})
</script>

<style>
@import "../assets/style/task.module.css";
@import "../assets/style/calendar.module.css";
</style>
