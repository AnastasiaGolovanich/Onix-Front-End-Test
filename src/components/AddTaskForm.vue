<template lang="pug">
form(v-on:submit.prevent="addNewTask")
  label(for="new-task-name") Task Name
  input(v-model="newTaskName" id="new-task-name" placeholder="Task Name")
  label(for="new-task-description") Task Description
  input(v-model="newTaskDescription" id="new-task-description" placeholder="Task Description")
  button Add
ul
  li(v-for="(task, index) in tasks" v-bind:key="task.id") {{task.id}}: {{task.name}}: {{task.description}}
    buttom(v-on:click="removeTask(index)") Remove
</template>

<script>
export default {
  name: 'AddTaskForm',
  data () {
    return {
      newTaskName: '',
      newTaskDescription: '',
      tasks: [
        {
          id: 1,
          name: '',
          description: ''
        }
      ],
      nextTaskId: 2
    }
  },
  methods: {
    addNewTask: function () {
      console.log('Hello')
      this.tasks.push({
        id: this.nextTaskId++,
        name: this.newTaskName,
        description: this.newTaskDescription
      })
      this.newTaskName = ''
      this.newTaskDescription = ''
    },
    removeTask: function (index) {
      this.tasks.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>
