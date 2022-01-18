<template lang="pug">
div(class="modal-shadow" @click.self="close")
  div(class="modal")
    div(class="modal-close" @click="close") x
    slot(name="title")
      h3(class="modal-title") Add New Task
    slot(name="body")
      div(class="modal-content")
        form(v-on:submit.prevent="addNewTask")
          input(type="text" v-model="name" id="new-task-name" placeholder="Task Name")
          input(type="text" v-model="description" id="new-task-description" placeholder="Task Description")
          input(class="input-date" type="date" v-model="date" id="new-task-end-date" placeholder="End Date")
          input(type="submit" value="Add" @click="isClickButton = true")
        p(v-if="errors.length" class="error-title") Please correct the indicated errors:
        ul(class="error-ul")
          li(v-for="error in errors" class="error-message") {{ error }}
    slot(name="footer")
      div(class="modal-footer")
        button(class="modal-footer-button" @click="close") Cancel
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useNewTask from '@/composables/useNewTask'
import useAddNewTask from '@/composables/useAddNewTask'

export default defineComponent({
  name: 'FormModal',
  setup: function (props, { emit }) {
    const errors = ref<Array<string>>([])
    const { id, name, description, date, createDate } = useNewTask()
    const { tasks, isClickButton, addNewTask } = useAddNewTask(id, name, description, date, createDate, { emit }, errors)
    const close = () => {
      emit('close')
      errors.value = []
    }
    return {
      tasks,
      addNewTask,
      id,
      name,
      description,
      date,
      close,
      isClickButton,
      errors
    }
  }
})
</script>

<style>
@import "../assets/style/modal.module.css";
</style>
