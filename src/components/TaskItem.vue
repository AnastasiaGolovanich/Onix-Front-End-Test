<template lang="pug">
div(class="task-item")
  p(class="task-name") {{name}}
  p(class="task-date") {{date}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TaskItem',
  props: ['name', 'date']
})
</script>
