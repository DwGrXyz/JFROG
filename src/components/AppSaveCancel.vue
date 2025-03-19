<template>
  <div class="d-flex ga-2">
    <v-btn text="Cancel" :to="cancelRoute" data-cy="cancel" />
    <v-btn
      text="Save"
      color="primary"
      type="submit"
      data-cy="submit"
      @click="$emit('save')"
    />
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  cancelRoute: RouteLocationRaw
}>()

defineEmits<{
  save: []
}>()
</script>
