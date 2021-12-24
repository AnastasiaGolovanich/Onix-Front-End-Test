<template lang="pug">
section(class="news")
  h2(class="visually-hidden") ITask
  div(class="current-page")
    p(class="title") Today
    button(class="show-modal-button" @click="showModal") Add New Task
    form-modal(v-show="isModalVisible" @close="closeModal" :tasks="tasks" @click="isClickButton = true")
    ul
      li(v-for="(task, index) in tasksUpdate" :key="task.id" :id="task.id" :ref="setItemRef")
        div(class="fixed-time" @click="showTaskDetails(task.id)")
          p(class="icons")
            fa(:icon="['fas', 'asterisk']")/
          div
            p(class="message" :style="task.delay") {{task.name}}
            p(class="sub-message" :style="task.delay") {{task.description}}
        button(@click="removeTask(index)" class="remove-button")
          fa(:icon="['fas', 'trash-alt']")/
      task-details-modal(v-if="isModalTaskDetails" @close="closeModal" :tasks="tasks" :id="taskIndex" @save-changes="saveChanges($event)")
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FormModal from '@/components/FormModal.vue'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import { ITask } from '@/types/ITask.ts'

export default defineComponent({
  components: { FormModal, TaskDetailsModal },
  emits: ['sync-tasks', 'save-changes'],
  props: ['tasks'],
  data: function () {
    return {
      itemRefs: [] as HTMLElement[],
      tasksUpdate: [] as ITask[],
      isClickButton: false,
      isModalVisible: false,
      isModalTaskDetails: false,
      taskIndex: 0
    }
  },
  mounted: function () {
    this.tasksUpdate = this.tasks
    for (let i = 0; i < this.itemRefs.length; i++) {
      const taskBlock = this.itemRefs[i].firstElementChild
      if (taskBlock) {
        const taskBlockChildren = taskBlock.children
        for (let j = 0; j < taskBlockChildren.length; j++) {
          taskBlockChildren[1].children[j].classList.add('task-font-change')
        }
      }
    }
  },
  beforeUpdate () {
    this.itemRefs = []
  },
  updated () {
    const index = this.itemRefs.length - 1
    if (this.isClickButton) {
      const taskBlock = this.itemRefs[index]
      if (taskBlock) {
        taskBlock.classList.add('task-flicker')
      }
      this.isClickButton = false
    }
  },
  methods: {
    removeTask: function (index : number) {
      this.tasksUpdate.splice(index, 1)
      this.$emit('sync-tasks', this.tasksUpdate)
    },
    setItemRef (el: HTMLElement) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
      this.isModalTaskDetails = false
    },
    showTaskDetails (index: number) {
      this.taskIndex = index
      this.isModalTaskDetails = true
    },
    saveChanges (data: ITask) {
      this.$emit('save-changes', data)
    }
  }
})
</script>
<style>
@import "../assets/style/modal-form.module.css";
@import "../assets/style/task.module.css";
</style>
