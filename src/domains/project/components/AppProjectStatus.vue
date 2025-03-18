<template>
  <v-chip :color="color">{{ status }}</v-chip>
</template>

<script setup lang="ts">
import type { TaskStatus } from '@/domains/task/store/taskModel'
import { computed } from 'vue'

const props = defineProps<{
  status: TaskStatus
}>()

const color = computed<string>(() => {
  switch (props.status) {
    case 'pending':
    case 'in-progress':
      return 'blue'
    case 'completed':
      return 'green'
    default:
      return ''
  }
})
</script>
