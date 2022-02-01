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
            p {{getTaskById().name}}
          div(class="modal-row")
            p(class="task-title") Description:
            p {{getTaskById().description}}
          div(class="modal-row")
            p(class="task-title") End Date:
            p {{getTaskById().date}}
          div(class="modal-row")
            p(class="task-title") Status:
            p {{getTaskById().status}}
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
        p(v-if="errors.length" class="error-title") Please correct the indicated errors:
        ul(class="error-ul")
          li(v-for="error in errors" class="error-message") {{ error }}

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useShowNewTask from '@/composables/useShowNewTask'
import useSaveChanges from '@/composables/useSaveChanges'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'TaskDetailsModal',
  props: ['id', 'isEdit'],
  setup (props, { emit }) {
    const store = useStore()
    store.dispatch('tasks/getTaskFromAPI')
    const { newName, newDescription, newDate, newStatus, isClickEdit, showEditButton, showTextArea, close, getTaskById, Status } = useShowNewTask(props, { emit })
    const { errors, isChange, isChangeField, saveChanges } = useSaveChanges(getTaskById, newName, newDescription, newDate, newStatus, store, { emit })
    return {
      emit,
      errors,
      getTaskById,
      newName,
      newDescription,
      newDate,
      newStatus,
      isClickEdit,
      showEditButton,
      isChange,
      showTextArea,
      close,
      isChangeField,
      saveChanges,
      Status
    }
  }
})
</script>

<style>
@import "../assets/style/modal.module.css";
</style>
