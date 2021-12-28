<template lang="pug">
div(class="modal-shadow" @click.self="close")
  div(class="modal")
    div(class="modal-close" @click="close") x
    div(v-show="!isClickEdit")
      slot(name="title")
        h3(class="modal-title") Task Details
      slot(name="body")
        div(class="modal-content")
          div(class="modal-row")
            p(class="task-title") Name:
            p {{currentTask.name}}
          div(class="modal-row")
            p(class="task-title") Description:
            p {{currentTask.description}}
          div(class="modal-row")
            p(class="task-title") End Date:
            p {{currentTask.date}}
          div(class="modal-row")
            p(class="task-title") Status:
            p {{currentTask.status}}
      slot(name="footer")
        div(class="modal-footer")
          button(class="modal-footer-button" @click="showTextArea" v-if="showEditButton") Edit
    div(v-show="isClickEdit")
      slot(name="title")
        h3(class="modal-title") Task Details
      slot(name="body")
        div(class="modal-content")
          p(class="task-title") Name:
          textarea(v-model="newName" @change="isChangeField")
          p(class="task-title") Description:
          textarea(v-model="newDescription" @change="isChangeField")
          p(class="task-title") End Date:
          input(class="task-details-date" type="date" v-model="newDate" @change="isChangeField")
          p(class="task-title") Status:
          select(@change="isChangeField" v-model="newStatus" )
            option(v-for="item in status" :key="item") {{item}}
      slot(name="footer")
        div(class="modal-footer")
          button(class="modal-footer-button" @click="close") Cancel
          button(class="modal-footer-button" v-show="isChange" @click="saveChanges") Save
        p(v-if="!isChangeCorrect" class="task-error") Please check the correctness of the entered data

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ITask } from '@/types/ITask'
import { Status } from '@/constants/Status'

export default defineComponent({
  name: 'TaskDetailsModal',
  props: ['tasks', 'id'],
  data: function () {
    return {
      isClickEdit: false,
      newName: '',
      newDescription: '',
      newDate: '',
      newStatus: '' as Status,
      currentTask: {} as ITask,
      isChange: false,
      showEditButton: true,
      isChangeCorrect: true,
      status: {
        todo: Status.todo,
        inprogress: Status.inprogress,
        done: Status.done
      }
    }
  },
  mounted: function () {
    const id = this.id
    let index = 0
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        index = i
      }
    }
    this.currentTask.id = this.tasks[index].id
    this.currentTask.name = this.tasks[index].name
    this.currentTask.description = this.tasks[index].description
    this.currentTask.date = this.tasks[index].date
    this.currentTask.status = this.tasks[index].status
    this.newName = this.currentTask.name
    this.newDescription = this.currentTask.description
    this.newDate = this.currentTask.date
    this.newStatus = this.currentTask.status
    if (this.newStatus === Status.done) {
      this.showEditButton = false
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.isClickEdit = false
    },
    showTextArea () {
      if (this.currentTask.status !== Status.done) {
        this.isClickEdit = true
      }
    },
    isChangeField () {
      this.isChange = true
    },
    saveChanges () {
      if (this.checkCorrectnessData) {
        const changeTask = {
          id: this.currentTask.id,
          name: this.newName,
          description: this.newDescription,
          date: this.newDate,
          status: this.newStatus
        } as ITask
        this.$emit('save-changes', changeTask)
        this.$emit('close')
      } else {
        this.isChangeCorrect = false
      }
    }
  },
  computed: {
    checkCorrectnessData () : boolean {
      const date1 = Date.now()
      const date2 = Date.parse(this.newDate)
      const difference = (date2 - date1) / 86400000
      if (this.newName !== '' && this.newDescription !== '' && (difference > -1 || this.newDate === this.currentTask.date)) {
        return true
      }
      return false
    }
  }
})
</script>

<style>
@import "../assets/style/modal.module.css";
</style>
