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
import { defineComponent } from 'vue'
import FormModal from '@/components/FormModal.vue'
import TaskDetailsModal from '@/components/TaskDetailsModal.vue'
import { ITask } from '@/types/ITask'
import { mapState } from 'vuex'

export default defineComponent({
  components: { FormModal, TaskDetailsModal },
  data: function () {
    return {
      itemRefs: [] as HTMLElement[],
      isClickButton: false,
      isModalVisible: false,
      isModalTaskDetails: false,
      taskIndex: 0
    }
  },
  mounted: function () {
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
  computed: {
    ...mapState({
      tasks (state: any): any {
        return state.tasks.tasks
      }
    })
  },
  methods: {
    removeTask: function (index : number) {
      this.$store.commit('removeTask', index)
    },
    setItemRef (el: HTMLElement) {
      if (el) {
        this.itemRefs.push(el)
      }
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
      this.isModalTaskDetails = false
    },
    showTaskDetails (index: number) {
      this.taskIndex = index
      this.isModalTaskDetails = true
    }
  }
})
</script>
<style>
@import "../assets/style/modal-form.module.css";
@import "../assets/style/task.module.css";
</style>
