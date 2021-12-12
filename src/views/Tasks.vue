<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Tasks
  div(class="current-page")
    p(class="title") Today
    form(v-on:submit.prevent="addNewTask")
      input(type="text" v-model="newTaskName" id="new-task-name" placeholder="Task Name")
      input(type="text" v-model="newTaskDescription" id="new-task-description" placeholder="Task Description")
      input(type="text" v-model="newTaskEndDate" id="new-task-end-date" placeholder="End Date")
      input(type="submit" value="Add" @click="isClickButton = true")
    p(v-if="errors.length" class="error-title") Please correct the indicated errors:
    ul(class="error-ul")
      li(v-for="error in errors" class="error-message") {{ error }}
    ul
      li(v-for="(task, index) in tasksUpdate" :key="task.id" :id="task.id" :ref="setItemRef")
        div(class="fixed-time")
          p(class="icons")
            fa(:icon="['fas', 'asterisk']")/
          div
            p(class="message" :style="task.delay") {{task.name}}
            p(class="sub-message" :style="task.delay") {{task.description}}
        button(@click="removeTask(index)" class="remove-button")
          fa(:icon="['fas', 'trash-alt']")/
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export enum Status {
  todo = 'todo',
  inprogress = 'inprogress',
  done = 'done'
}
export interface Tasks {
  id: number
  name: string
  description: string
  date: string
  delay: string
  status: Status
}
export default defineComponent({
  emits: ['sync-tasks'],
  props: ['tasks'],
  data: function () {
    return {
      errors: [] as Array<string>,
      newTaskName: '',
      newTaskDescription: '',
      newTaskEndDate: '',
      nextTaskId: 4,
      newTaskId: 3,
      itemRefs: [] as HTMLElement[],
      tasksUpdate: [] as Tasks[],
      isClickButton: false
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
    addNewTask: function () {
      if (this.newTaskName !== '' && this.newTaskDescription !== '') {
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
      this.tasksUpdate.splice(index, 1)
    },
    setItemRef (el: HTMLElement) {
      if (el) {
        this.itemRefs.push(el)
      }
    }
  }
})
</script>
