<template>
  <v-chip :color="color">{{ priority }}</v-chip>
</template>

<script setup lang="ts">
import type { TaskPriority } from '@/domains/task/taskModel'
import { computed } from 'vue'

const props = defineProps<{
  priority: TaskPriority
}>()

const color = computed<string>(() => {
  switch (props.priority) {
    case 'medium':
      return 'yellow'
    case 'high':
      return 'red'
  }
  return ''
})
</script>
