<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Tasks
  div(class="current-page")
    p(class="title") Today
    form(v-on:submit.prevent="addNewTask")
      input(type="text" v-model="newTaskName" id="new-task-name" placeholder="Task Name")
      input(type="text" v-model="newTaskDescription" id="new-task-description" placeholder="Task Description")
      input(type="submit" value="Add")
    p(v-if="errors.length" class="error-title") Please correct the indicated errors:
    ul(class="error-ul")
      li(v-for="error in errors" class="error-message") {{ error }}
    ul
      li(v-for="(task, index) in tasks" v-bind:key="task.id")
        div(class="fixed-time")
          p(class="icons")
            fa(:icon="['fas', 'asterisk']")/
          div
            p(class="message") {{task.name}}
            p(class="sub-message") {{task.description}}
        buttom(v-on:click="removeTask(index)" class="icons")
          fa(:icon="['fas', 'trash-alt']")/
</template>

<script lang="ts">
import { defineComponent } from 'vue'
interface Tasks {
  id: number
  name: string
  description: string
}
export default defineComponent({
  data () {
    return {
      errors: [] as Array<string>,
      newTaskName: '',
      newTaskDescription: '',
      tasks: [
        {
          id: 1,
          name: 'Install programs',
          description: 'Install Node.js and Vue CLI on PC'
        },
        {
          id: 2,
          name: 'Read the theory',
          description: 'Working with forms'
        },
        {
          id: 3,
          name: 'Practice',
          description: 'On the Tasks tab, create a form to add a new task. The form must contain 2 fields: title and description of the task. Both fields must be required. At the bottom of the form, place the Add button, by clicking on which a new task should be added to the list. In this case, the form fields should be cleared.\n' +
            'Add a delete button next to each task. When clicked, remove the task from the array.'
        }
      ] as Tasks[],
      nextTaskId: 4
    }
  },
  methods: {
    checkForm: function (e : any) {
      console.log('checkForm')
      console.log(this.newTaskName)
      console.log(this.newTaskDescription)
      if (this.newTaskName && this.newTaskDescription) {
        console.log('here')
        return true
      }
      this.errors = []
      if (!this.newTaskName) {
        console.log('Add Task Name')
        this.errors.push('Add Task Name')
      }
      if (!this.newTaskDescription) {
        console.log('Add Task Description')
        this.errors.push('Add Task Description')
      }
      e.preventDefault()
    },
    addNewTask: function () {
      if (this.newTaskName !== '' && this.newTaskDescription !== '') {
        this.tasks.push({
          id: this.nextTaskId++,
          name: this.newTaskName,
          description: this.newTaskDescription
        })
        this.newTaskName = ''
        this.newTaskDescription = ''
        this.errors = []
      } else {
        if (this.newTaskName === '') {
          this.errors.push('Add Task Name')
        }
        if (this.newTaskDescription === '') {
          this.errors.push('Add Task Description')
        }
      }
    },
    removeTask: function (index : number) {
      this.tasks.splice(index, 1)
    }
  }
})
</script>
