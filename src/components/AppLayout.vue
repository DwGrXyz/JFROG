<template>
  <div>
    <h1>{{ title }}</h1>

    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
