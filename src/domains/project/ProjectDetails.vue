<template>
  <template v-if="project">
    <h1>{{ project?.title }}</h1>
  </template>
  <NotFoundPage v-else />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed } from 'vue'
import type { ProjectModel } from './store/projectModel'
import NotFoundPage from '@/NotFoundPage.vue'

const props = defineProps<{
  projectId: string
}>()

const store = useAppStore()
const project = computed<ProjectModel | undefined>(() =>
  store.getters['projects/getProject'](props.projectId),
)
</script>
