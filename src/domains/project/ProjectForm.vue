<template>
  <NotFoundPage v-if="projectId && !project" />
  <AppLayout v-else :title="projectId ? 'Edit project' : 'Create project'">
    <v-text-field label="Title" v-model="projectTitle" />

    <AppSaveCancel :cancel-route="cancelRoute" @save="updateProject" />

    <AppTaskTable
      v-if="projectId"
      class="mt-4"
      :project-id="projectId"
      editable
    />
  </AppLayout>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed, ref } from 'vue'
import type { ProjectModel } from './store/projectModel'
import NotFoundPage from '@/components/NotFoundPage.vue'
import AppLayout from '@/components/AppLayout.vue'
import { getProjectDetailsRoute, getProjectListRoute } from '@/router'
import { useRouter } from 'vue-router'
import AppSaveCancel from '@/components/AppSaveCancel.vue'
import AppTaskTable from '../task/components/AppTaskTable.vue'

const props = defineProps<{
  projectId?: string
}>()

const store = useAppStore()
const project = computed<ProjectModel | undefined>(() =>
  store.getters['projects/getProject'](props.projectId),
)
const projectTitle = ref(project.value?.title || '')

const cancelRoute = computed(() => {
  if (props.projectId) return getProjectDetailsRoute(props.projectId)
  return getProjectListRoute()
})

const router = useRouter()
const updateProject = () => {
  if (!project.value) return

  const newProject: ProjectModel = {
    id: project.value.id,
    title: projectTitle.value,
  }
  store.commit('projects/updateProject', newProject)

  router.push(cancelRoute.value)
}
</script>
