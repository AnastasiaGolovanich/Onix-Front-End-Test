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
      li(v-for="(task, index) in tasks" :key="task.id" :id="task.id")
        div(class="fixed-time")
          p(class="icons")
            fa(:icon="['fas', 'asterisk']")/
          div
            //p(ref="message" class="message" :style="task.delay") {{task.name}}
            p(:ref="'message'+task.id" class="message" :style="task.delay") {{task.name}}
            p(:ref="'sub-message'+task.id" class="sub-message" :style="task.delay") {{task.description}}
        button(@click="removeTask(index)" class="remove-button")
          fa(:icon="['fas', 'trash-alt']")/
</template>

<script lang="ts">
import { defineComponent } from 'vue'
interface Tasks {
  id: number
  name: string
  description: string
  delay: string
}
export default defineComponent({
  data () {
    return {
      errors: [] as Array<string>,
      newTaskName: '',
      newTaskDescription: '',
      tasks: [] as Tasks[],
      nextTaskId: 4,
      newTaskId: 3
    }
  },
  created () {
    this.tasks = [
      {
        id: 1,
        name: 'Install programs',
        description: 'Install Node.js and Vue CLI on PC',
        delay: 'animation-delay:0s'
      },
      {
        id: 2,
        name: 'Read the theory',
        description: 'Working with forms',
        delay: 'animation-delay:1s'
      },
      {
        id: 3,
        name: 'Practice',
        description: 'On the Tasks tab, create a form to add a new task. The form must contain 2 fields: title and description of the task.',
        delay: 'animation-delay:2s'
      }
    ] as Tasks[]
  },
  mounted () {
    for (let i = 0; i < this.tasks.length; i++) {
      const messageClass = this.$refs['message' + this.tasks[i].id]
      const subMessageClass = this.$refs['sub-message' + this.tasks[i].id]
      console.log('messageClass: ', messageClass)
      console.log('subMessageClass: ', typeof subMessageClass)
      if (messageClass) {
        console.log('messageClass: ', messageClass)
        this.$nextTick().then(() => messageClass.classList.add('task-font-change'))
      }
      //   this.$nextTick().then(() => subMessageClass.classList.add('task-font-change'))
    }
  },
  updated () {
    const index = this.newTaskId
    const taskFlicker = document.getElementById(index as unknown as string)
    if (taskFlicker != null && index > 3) {
      this.$nextTick().then(() => taskFlicker.classList.add('task-flicker'))
    }
  },
  methods: {
    addNewTask: function () {
      if (this.newTaskName !== '' && this.newTaskDescription !== '') {
        this.tasks.push({
          id: this.nextTaskId++,
          name: this.newTaskName,
          description: this.newTaskDescription,
          delay: 'animation-delay:0s'
        })
        this.newTaskId++
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
