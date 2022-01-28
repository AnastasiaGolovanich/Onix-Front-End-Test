<template lang="pug">
section(class="news")
  h2(class="visually-hidden") Task
  div(class="current-page")
    p(class="title") Today
    button(class="show-modal-button" @click="showModal") Add New Task
    form-modal(v-show="isModalFormVisible" @close="closeModalForm" @click="isClickButton = true")
    ul
      li(v-for="(task, index) in tasks" :key="task.id" :id="task.id" :ref="setItemRef")
        div(class="fixed-time" @click="showTaskDetails(task.id)")
          p(class="icons")
            fa(:icon="['fas', 'asterisk']")/
          div
            p(class="message" :style="task.delay") {{task.name}}
            p(class="sub-message" :style="task.delay") {{task.description}}
        button(@click="removeTask(task.id)" class="remove-button")
          fa(:icon="['fas', 'trash-alt']")/
      task-details-modal(v-if="isModalVisible" @close="closeModal" :id="taskIndex")
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import FormModal from '@/components/FormModal.vue'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import useTasks from '@/composables/useTasks'
import useModalForm from '@/composables/useModalForm'
import useShowTaskDetails from '@/composables/useShowTaskDetails'
import useTasksAnimation from '@/composables/useTasksAnimation'
import { useStore } from 'vuex'

export default defineComponent({
  components: { FormModal, TaskDetailsModal },
  setup () {
    const isClickButton = ref(false) // { value: boolean }
    const { tasks, removeTask } = useTasks()
    const { itemRefs, addAnimation, addTaskFlickerAnimation, setItemRef } = useTasksAnimation(isClickButton)
    const { showModal, closeModalForm, isModalFormVisible } = useModalForm()
    const { showTaskDetails, closeModal, taskIndex, isModalVisible } = useShowTaskDetails()
    return {
      itemRefs,
      isClickButton,
      tasks,
      addAnimation,
      addTaskFlickerAnimation,
      setItemRef,
      removeTask,
      isModalVisible,
      isModalFormVisible,
      taskIndex,
      showModal,
      closeModal,
      closeModalForm,
      showTaskDetails
    }
  }
})
</script>
<style>
@import "../assets/style/modal-form.module.css";
@import "../assets/style/task.module.css";
</style>
