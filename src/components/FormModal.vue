<template lang="pug">
div(class="modal-shadow" @click.self="close")
  div(class="modal")
    div(class="modal-close" @click="close") x
    slot(name="title")
      h3(class="modal-title") Add New Task
    slot(name="body")
      div(class="modal-content")
        form(v-on:submit.prevent="addNewTask")
          input(type="text" v-model="newTaskName" id="new-task-name" placeholder="Task Name")
          input(type="text" v-model="newTaskDescription" id="new-task-description" placeholder="Task Description")
          input(class="input-date" type="date" v-model="newTaskEndDate" id="new-task-end-date" placeholder="End Date")
          input(type="submit" value="Add" @click="isClickButton = true")
        p(v-if="errors.length" class="error-title") Please correct the indicated errors:
        ul(class="error-ul")
          li(v-for="error in errors" class="error-message") {{ error }}
    slot(name="footer")
      div(class="modal-footer")
        button(class="modal-footer-button" @click="close") Cancel
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Status } from '@/constants/Status'
import { ITask } from '@/types/ITask'

export default defineComponent({
  name: 'FormModal',
  props: ['tasks'],
  data: function () {
    return {
      errors: [] as Array<string>,
      newTaskName: '',
      newTaskDescription: '',
      newTaskEndDate: '',
      nextTaskId: 4,
      newTaskId: 3,
      tasksUpdate: [] as ITask[],
      isClickButton: false
    }
  },
  methods: {
    addNewTask: function () {
      this.tasksUpdate = this.tasks
      if (this.newTaskName && this.newTaskDescription && new Date(this.newTaskEndDate) >= new Date()) {
        this.tasksUpdate.push({
          id: this.nextTaskId++,
          name: this.newTaskName,
          description: this.newTaskDescription,
          date: this.newTaskEndDate,
          delay: 'animation-delay:0s',
          status: Status.todo
        })
        this.newTaskId++
        this.newTaskName = ''
        this.newTaskDescription = ''
        this.newTaskEndDate = ''
        this.errors = []
        this.$emit('close')
      } else {
        if (this.newTaskName === '') {
          this.errors.push('Add Task Name')
        }
        if (this.newTaskDescription === '') {
          this.errors.push('Add Task Description')
        }
        if (this.newTaskEndDate < Date()) {
          this.errors.push('Chose correct date')
        }
      }
    },
    close () {
      this.$emit('close')
      this.errors = []
    },
    isCorrectDate: function () {
      if (this.newTaskEndDate < Date()) {
        return false
      }
      return true
    }
  }
})
</script>

<style>
@import "../assets/style/modal.module.css";
</style>
