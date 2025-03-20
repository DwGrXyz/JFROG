<template>
  <AppLayout v-if="projectPending" :title="`Project: #${projectId}`" fetching />
  <NotFoundPage v-else-if="projectId && !project" />
  <AppLayout v-else :title="projectId ? 'Edit project' : 'Create project'">
    <v-form ref="form" @submit.prevent="saveProject">
      <v-text-field
        label="Title"
        v-model="projectTitle"
        :rules="[requiredRule]"
        data-cy="title"
      />

      <AppSaveCancel :cancel-route="cancelRoute" />
    </v-form>

    <AppTasks v-if="projectId" class="mt-4" :project-id="projectId" editable />
  </AppLayout>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed, ref, watch } from 'vue'
import type { ProjectModel } from './store/projectModel'
import NotFoundPage from '@/components/NotFoundPage.vue'
import AppLayout from '@/components/AppLayout.vue'
import { getProjectDetailsRoute, getProjectListRoute } from '@/router'
import { useRouter } from 'vue-router'
import AppSaveCancel from '@/components/AppSaveCancel.vue'
import AppTasks from '@/domains/task/components/AppTasks.vue'
import { useAsyncDataFetch } from '@/compositions/useAsyncRequest'
import { useForm } from '@/compositions/useForm'
import { requiredRule } from '@/utils/requiredRule'

const props = defineProps<{
  projectId?: string
}>()

const store = useAppStore()
const [project, projectPending] = useAsyncDataFetch<ProjectModel | undefined>(
  undefined,
  async () => {
    if (!props.projectId) return undefined
    return store.dispatch('projects/fetchProject', props.projectId)
  },
)

const projectTitle = ref('')
watch(project, () => {
  projectTitle.value = project.value?.title || ''
})

const cancelRoute = computed(() => {
  if (props.projectId) return getProjectDetailsRoute(props.projectId)
  return getProjectListRoute()
})

const router = useRouter()
const { form, submit: saveProject } = useForm(async () => {
  if (!props.projectId) {
    await store.dispatch('projects/createProject', {
      title: projectTitle.value,
    })
  } else {
    const newProject: ProjectModel = {
      id: props.projectId,
      title: projectTitle.value,
    }
    await store.commit('projects/updateProject', newProject)
  }

  router.push(cancelRoute.value)
})
</script>
