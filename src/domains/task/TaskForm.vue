<template>Task form: {{ projectId }}/{{ taskId }}</template>

<script setup lang="ts">
defineProps<{
  projectId: string
  taskId?: string
}>()
</script>
