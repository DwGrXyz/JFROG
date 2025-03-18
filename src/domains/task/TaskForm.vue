<template>
  <AppLayout
    :title="taskId ? 'Edit task' : 'Create task'"
    :fetching="taskPending"
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
      />

      <v-textarea v-model="taskForm.description" label="Description" />

      <v-select
        v-model="taskForm.priority"
        label="Priority"
        :items="taskPriorityVariant"
        required
      />

      <v-select
        v-model="taskForm.status"
        label="Status"
        :items="taskStatusVariant"
        required
      />

      <v-text-field v-model="taskForm.dueDate" label="Due date" type="date" />

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

const props = defineProps<{
  projectId: string
  taskId?: string
}>()

const form = ref()

const store = useAppStore()

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
const saveTask = async () => {
  if (!form.value.isValid) return
  if (props.taskId) {
    await store.dispatch('tasks/updateTask', taskForm)
  } else {
    await store.dispatch('tasks/createTask', taskForm)
  }
  router.push(projectRoute.value)
}

const projectRoute = computed(() => getProjectEditRoute(props.projectId))
</script>
