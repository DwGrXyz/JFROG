<template>
  <NotFoundPage v-if="!project" />
  <AppLayout v-else title="Edit project">
    <v-text-field label="Title" v-model="projectTitle" />

    <div class="d-flex ga-2">
      <v-btn :to="detailsRoute" text="Cancel" />
      <v-btn text="Save" color="primary" @click="updateProject" />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed, ref } from 'vue'
import type { ProjectModel } from './store/projectModel'
import NotFoundPage from '@/components/NotFoundPage.vue'
import AppLayout from '@/components/AppLayout.vue'
import { getProjectDetailsRoute } from '@/router'
import { useRouter } from 'vue-router'

const props = defineProps<{
  projectId: string
}>()

const store = useAppStore()
const project = computed<ProjectModel | undefined>(() =>
  store.getters['projects/getProject'](props.projectId),
)
const projectTitle = ref(project.value?.title || '')

const detailsRoute = computed(() => getProjectDetailsRoute(props.projectId))

const router = useRouter()
const updateProject = () => {
  if (!project.value) return

  const newProject: ProjectModel = {
    id: project.value.id,
    title: projectTitle.value,
  }
  store.commit('projects/updateProject', newProject)

  router.push(detailsRoute.value)
}
</script>
