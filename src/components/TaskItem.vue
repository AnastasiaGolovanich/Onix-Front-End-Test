<template lang="pug">
div(class="task-item" ref="task")
  p(class="task-name") {{name}}
  p(class="task-date") {{date}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useTaskItem from '@/composables/useTaskItem'

export default defineComponent({
  name: 'TaskItem',
  props: ['name', 'date', 'status'],
  setup (props) {
    const { task, addClassByStatus } = useTaskItem(props)
    return {
      task,
      addClassByStatus
    }
  }
}
)
</script>
<style>
@import "../assets/style/task-item.module.css";
</style>
