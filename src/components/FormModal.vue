<template lang="pug">
div(class="modal-shadow" @click.self="close")
  div(class="modal")
    div(class="modal-close" @click="close") x
    slot(name="title")
      h3(class="modal-title") Add New Task
    slot(name="body")
      div(class="modal-content")
        form(v-on:submit.prevent="addNewTask")
          input(type="text" v-model="newTask.name" id="new-task-name" placeholder="Task Name")
          input(type="text" v-model="newTask.description" id="new-task-description" placeholder="Task Description")
          input(class="input-date" type="date" v-model="newTask.date" id="new-task-end-date" placeholder="End Date")
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
import { ITask } from '@/types/ITask'

export default defineComponent({
  name: 'FormModal',
  data: function () {
    return {
      errors: [] as Array<string>,
      nextTaskId: 4,
      isClickButton: false,
      newTask: {
        id: 4,
        name: '',
        description: '',
        date: ''
      } as ITask
    }
  },
  computed: {
    tasks () : any {
      return this.$store.state.tasks
    },
    addCreateDate () {
      console.log(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate())
      return new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
    }
  },
  methods: {
    addNewTask: function () {
      if (this.newTask.name && this.newTask.description && new Date(this.newTask.date) >= new Date()) {
        this.newTask.createDate = this.addCreateDate
        this.$store.commit('addNewTask', this.newTask)
        this.newTask.id++
        this.newTask.name = ''
        this.newTask.description = ''
        this.newTask.date = ''
        this.errors = []
        this.$emit('close')
      } else {
        if (!this.newTask.name) {
          this.errors.push('Add Task Name')
        }
        if (!this.newTask.description) {
          this.errors.push('Add Task Description')
        }
        if (this.newTask.date < Date()) {
          this.errors.push('Chose correct date')
        }
      }
    },
    close () {
      this.$emit('close')
      this.errors = []
    },
    isCorrectDate: function () {
      if (this.newTask.date < Date()) {
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
