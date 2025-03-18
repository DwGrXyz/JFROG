<template>
  <AppLayout v-if="projectPending" :title="`Project: #${projectId}`" fetching />
  <NotFoundPage v-else-if="!project" />
  <AppLayout v-else :title="`Project: ${project.title}`">
    <template v-slot:action>
      <v-btn :to="formRoute" :icon="mdiPencil" variant="text" />
    </template>

    <AppTaskTable :project-id="projectId" />
  </AppLayout>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed } from 'vue'
import type { ProjectModel } from './store/projectModel'
import NotFoundPage from '@/components/NotFoundPage.vue'
import { getProjectEditRoute } from '@/router'
import AppLayout from '@/components/AppLayout.vue'
import { mdiPencil } from '@mdi/js'
import AppTaskTable from '@/domains/task/components/AppTaskTable.vue'
import { useAsyncDataFetch } from '@/compositions/useAsyncRequest'

const props = defineProps<{
  projectId: string
}>()

const store = useAppStore()

const [project, projectPending] = useAsyncDataFetch<ProjectModel | undefined>(
  undefined,
  () => store.dispatch('projects/fetchProject', props.projectId),
)

const formRoute = computed(() => getProjectEditRoute(props.projectId))
</script>
