<template>
  <div>
    <h1 class="d-flex align-center ga-1">
      <div class="text-truncate">{{ title }}</div>
      <slot name="action" />
    </h1>

    <div class="mt-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
