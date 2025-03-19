<template>
  <v-btn :to="to" data-cy="create">
    <div class="d-flex align-center ga-1">
      <v-icon :icon="mdiPlus" size="small" />
      Create
    </div>
  </v-btn>
</template>

<script setup lang="ts">
import { mdiPlus } from '@mdi/js'
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  to: RouteLocationRaw
}>()
</script>
