<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Task
  div(class="current-page")
    p(class="title") Today
    button(class="show-modal-button" @click="showModal") Add New Task
    form-modal(v-show="isModalVisible" @close="closeModal" @click="isClickButton = true")
    ul
      li(v-for="(task, index) in tasks" :key="task.id" :id="task.id" :ref="setItemRef")
        div(class="fixed-time" @click="showTaskDetails(task.id)")
          p(class="icons")
            fa(:icon="['fas', 'asterisk']")/
          div
            p(class="message" :style="task.delay") {{task.name}}
            p(class="sub-message" :style="task.delay") {{task.description}}
        button(@click="removeTask(index)" class="remove-button")
          fa(:icon="['fas', 'trash-alt']")/
      task-details-modal(v-if="isModalTaskDetails" @close="closeModal" :id="taskIndex")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FormModal from '@/components/FormModal.vue'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import useTasks from '@/composables/useTasks'

export default defineComponent({
  components: { FormModal, TaskDetailsModal },
  setup () {
    const { tasks, isClickButton, itemRefs, addAnimation, addTaskFlickerAnimation, setItemRef, removeTask } = useTasks()
    const isModalVisible = ref(false) // { value: boolean }
    const isModalTaskDetails = ref(false) // { value: boolean }
    const taskIndex = ref(0) // { value: number }
    const showModal = () => {
      isModalVisible.value = true
    }
    const closeModal = () => {
      isModalVisible.value = false
      isModalTaskDetails.value = false
    }
    const showTaskDetails = (index: number) => {
      taskIndex.value = index
      isModalTaskDetails.value = true
    }
    return {
      itemRefs,
      isClickButton,
      tasks,
      addAnimation,
      addTaskFlickerAnimation,
      setItemRef,
      removeTask,
      isModalVisible,
      isModalTaskDetails,
      taskIndex,
      showModal,
      closeModal,
      showTaskDetails
    }
  }
})
</script>
<style>
@import "../assets/style/modal-form.module.css";
@import "../assets/style/task.module.css";
</style>
