<template>
  <NotFoundPage v-if="!project" />
  <AppLayout v-else :title="project.title" />
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed } from 'vue'
import type { ProjectModel } from './store/projectModel'
import NotFoundPage from '@/components/NotFoundPage.vue'

const props = defineProps<{
  projectId: string
}>()

const store = useAppStore()
const project = computed<ProjectModel | undefined>(() =>
  store.getters['projects/getProject'](props.projectId),
)
</script>
