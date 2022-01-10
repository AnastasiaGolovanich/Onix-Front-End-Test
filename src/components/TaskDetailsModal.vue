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
            p {{this.taskById().name}}
          div(class="modal-row")
            p(class="task-title") Description:
            p {{this.taskById().description}}
          div(class="modal-row")
            p(class="task-title") End Date:
            p {{this.taskById().date}}
          div(class="modal-row")
            p(class="task-title") Status:
            p {{this.taskById().status}}
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
            option(v-for="item in Status" :key="item") {{item}}
      slot(name="footer")
        div(class="modal-footer")
          button(class="modal-footer-button" @click="close") Cancel
          button(class="modal-footer-button" v-show="isChange" @click="saveChanges") Save
        //p(v-if="!isChangeCorrect" class="task-error") Please check the correctness of the entered data
        p(v-if="errors.length" class="error-title") Please correct the indicated errors:
        ul(class="error-ul")
          li(v-for="error in errors" class="error-message") {{ error }}

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ITask } from '@/types/ITask'
import { Status } from '@/constants/Status'

export default defineComponent({
  name: 'TaskDetailsModal',
  props: ['id', 'isEdit'],
  data: function () {
    return {
      errors: [] as Array<string>,
      isClickEdit: false,
      newName: '' as string,
      newDescription: '' as string,
      newDate: '',
      newStatus: '' as Status,
      isChange: false,
      showEditButton: true,
      isChangeCorrect: true,
      Status: Status
    }
  },
  mounted: function () {
    this.newName = this.taskById().name
    this.newDescription = this.taskById().description
    this.newDate = this.taskById().date
    this.newStatus = this.taskById().status
    if (this.newStatus === Status.done || this.isEdit) {
      this.showEditButton = false
    }
  },
  methods: {
    close () {
      this.$emit('close')
      this.isClickEdit = false
    },
    showTextArea () {
      if (this.taskById().status !== Status.done) {
        this.isClickEdit = true
      }
    },
    isChangeField () {
      this.errors = []
      this.isChange = true
    },
    saveChanges () {
      if (this.checkCorrectness()) {
        const changeTask = {
          id: this.taskById().id,
          name: this.newName,
          description: this.newDescription,
          date: this.newDate,
          status: this.newStatus
        } as ITask
        this.$store.commit('saveChanges', changeTask)
        this.$emit('close')
      }
      this.isChange = false
    },
    taskById (): ITask {
      return this.$store.getters.getTaskById(this.id)
    },
    checkCorrectness: function () : boolean {
      if (!this.checkCorrectnessDate) {
        this.errors.push('Chose correct date')
      }
      if (!this.checkCorrectnessName) {
        this.errors.push('Add Task Name')
      }
      if (!this.checkCorrectnessDescription) {
        this.errors.push('Add Task Description')
      }
      return this.errors.length === 0
    }
  },
  computed: {
    checkCorrectnessDate () : boolean {
      const date1 = Date.now()
      const date2 = Date.parse(this.newDate)
      const difference = (date2 - date1) / 86400000
      if (difference > -1 || this.newDate === this.taskById().date) {
        return true
      }
      return false
    },
    checkCorrectnessName () : boolean {
      return this.newName !== ''
    },
    checkCorrectnessDescription () : boolean {
      return this.newDescription !== ''
    },
    tasks () : ITask[] {
      return this.$store.state.tasks
    }
  }
})
</script>

<style>
@import "../assets/style/modal.module.css";
</style>
