<template>
  <NotFoundPage v-if="!projectPending && !project" />
  <AppLayout
    v-else
    :title="taskId ? 'Edit task' : 'Create task'"
    :fetching="projectPending || taskPending"
  >
    <v-form
      ref="form"
      class="d-flex flex-column ga-2"
      @submit.prevent="saveTask"
    >
      <v-text-field
        v-model="taskForm.title"
        label="Title"
        required
        :rules="[requiredRule]"
        data-cy="title"
      />

      <v-textarea
        v-model="taskForm.description"
        label="Description"
        data-cy="description"
      />

      <v-select
        v-model="taskForm.priority"
        label="Priority"
        :items="taskPriorityVariant"
        data-cy="priority"
      />

      <v-select
        v-model="taskForm.status"
        label="Status"
        :items="taskStatusVariant"
        data-cy="status"
      />

      <v-text-field
        v-model="taskForm.dueDate"
        label="Due date"
        type="date"
        data-cy="dueDate"
      />

      <AppSaveCancel :cancel-route="projectRoute" />
    </v-form>
  </AppLayout>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed, ref, watch } from 'vue'
import {
  taskPriorityVariant,
  taskStatusVariant,
  type TaskModel,
} from './store/taskModel'
import AppSaveCancel from '@/components/AppSaveCancel.vue'
import { getProjectEditRoute } from '@/router'
import AppLayout from '@/components/AppLayout.vue'
import type { CreatePayload } from '@/store/types'
import { useRouter } from 'vue-router'
import { requiredRule } from '@/utils/requiredRule'
import { useAsyncDataFetch } from '@/compositions/useAsyncRequest'
import { useForm } from '@/compositions/useForm'
import type { ProjectModel } from '../project/store/projectModel'
import NotFoundPage from '@/components/NotFoundPage.vue'

const props = defineProps<{
  projectId: string
  taskId?: string
}>()

const store = useAppStore()

const [project, projectPending] = useAsyncDataFetch<ProjectModel | undefined>(
  undefined,
  async () => store.dispatch('projects/fetchProject', props.projectId),
)

const [task, taskPending] = useAsyncDataFetch<TaskModel | undefined>(
  undefined,
  async () => {
    if (!props.taskId) return null
    const item = await store.dispatch('tasks/fetchTask', props.taskId)
    if (!item || item.projectId !== props.projectId) return null
    return item
  },
)

const getDefaultFormValues = (): CreatePayload<TaskModel> => ({
  projectId: props.projectId,
  title: '',
  description: '',
  priority: 'low',
  status: 'pending',
  dueDate: '',
})
const taskForm = ref<CreatePayload<TaskModel>>(getDefaultFormValues())
watch(task, () => {
  taskForm.value = task.value ? { ...task.value } : getDefaultFormValues()
})

const router = useRouter()
const { form, submit: saveTask } = useForm(async () => {
  if (props.taskId) {
    await store.commit('tasks/updateTask', taskForm.value)
  } else {
    await store.dispatch('tasks/createTask', taskForm.value)
  }
  router.push(projectRoute.value)
})

const projectRoute = computed(() => getProjectEditRoute(props.projectId))
</script>
