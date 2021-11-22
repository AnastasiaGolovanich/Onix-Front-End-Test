<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Tasks
  div(class="current-page")
    p(class="title") Today
    form(v-on:submit.prevent="addNewTask")
      p(v-if="errors.length" class="error-title") Please correct the indicated errors:
      ul
        li(v-for="error in errors" class="error-message") {{ error }}
      div(class="row")
        div(class="col-left")
          label(for="new-task-name") Name
        div(class="col-right")
          input(v-model="newTaskName" id="new-task-name" placeholder="Task Name" type="text")
      div(class="row")
        div(class="col-left")
          label(for="new-task-description") Description
        div(class="col-right")
          input(v-model="newTaskDescription" id="new-task-description" placeholder="Task Description" type="text")
      div(class="row-add")
        input(type="submit" value="Add")
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
<style scoped>
.error-title {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #da0707;
  line-height: 21px;
  margin-top: 10px;
  font-weight: bold;
}
.right-block .news .current-page .error-message {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #da0707;
  line-height: 21px;
  margin-bottom: 5px;
}
.right-block .news .current-page form ul {
  margin-top: 5px;
}
.row {
  display: flex;
  flex-direction: row;
}
.row-add {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: -70px;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #131313;
  line-height: 21px;
}

input[type=text] {
  background-color: #E3EFFF;
  padding: 12px 20px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  min-width: 75vh;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #131313;
  line-height: 21px;
}

input:hover, input[type=submit]:hover{
  border: 2px solid #9a9a9a;
}

.col-left {
  width: 25%;
  margin-top: 6px;
}

.col-right {
  width: 75%;
  margin-top: 6px;
}
input[type=submit] {
  background-color: #E3EFFF;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  color: #131313;
  padding: 12px 20px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}
</style>
