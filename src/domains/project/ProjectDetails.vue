<template>
  <NotFoundPage v-if="!project" />
  <AppLayout v-else :title="project.title">
    <template v-slot:action>
      <v-btn :to="formRoute" :icon="mdiPencil" variant="text" />
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed } from 'vue'
import type { ProjectModel } from './store/projectModel'
import NotFoundPage from '@/components/NotFoundPage.vue'
import { getProjectFormRoute } from '@/router'
import AppLayout from '@/components/AppLayout.vue'
import { mdiPencil } from '@mdi/js'

const props = defineProps<{
  projectId: string
}>()

const store = useAppStore()
const project = computed<ProjectModel | undefined>(() =>
  store.getters['projects/getProject'](props.projectId),
)

const formRoute = computed(() => getProjectFormRoute(props.projectId))
</script>
