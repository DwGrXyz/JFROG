<template>
  <div>
    <h1 class="d-flex align-center ga-1">
      <div class="text-truncate">{{ title }}</div>
      <slot name="action" />
    </h1>

    <div class="mt-6">
      <v-progress-circular v-if="fetching" indeterminate />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  fetching?: boolean
}>()
</script>
