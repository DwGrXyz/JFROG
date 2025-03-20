<template>
  <div>
    <h2>Tasks:</h2>

    <v-progress-circular
      v-if="taskListPending"
      indeterminate
      data-cy="tasks-loading"
    />

    <template v-else>
      <AppTasksFilter v-model:filter="filter" />

      <AppTasksTable
        :project-id="projectId"
        :task-list="filteredTasks"
        :editable="editable"
        @remove="showRemoveConfirm($event)"
      />

      <AppCreateItem v-if="editable" class="mt-2" :to="createTaskRoute" />
    </template>

    <AppConfirm v-model="removeConfirmShown" @submit="removeTask" />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed, ref } from 'vue'
import type { TaskModel } from '@/domains/task/store/taskModel'
import { getTaskCreateRoute } from '@/router'
import AppCreateItem from '@/components/AppCreateItem.vue'
import { useAsyncDataFetch } from '@/compositions/useAsyncRequest'
import { useRemoveItemConfirm } from '@/compositions/useRemoveItemConfirm'
import AppConfirm from '@/components/AppConfirm.vue'
import AppTasksTable from './AppTasksTable.vue'
import AppTasksFilter, { type TasksFilter } from './AppTasksFilter.vue'

const props = defineProps<{
  projectId: string
  editable?: boolean
}>()

const store = useAppStore()

const [taskList, taskListPending, fetchTaskList] = useAsyncDataFetch<
  TaskModel[]
>([], () => store.dispatch('tasks/fetchTasksByProjectId', props.projectId))

const filter = ref<TasksFilter>({ priority: '', status: '' })

const filteredTasks = computed(() =>
  taskList.value.filter((task) => {
    const { priority, status } = filter.value
    if (priority && priority !== task.priority) return false
    if (status && status !== task.status) return false
    return true
  }),
)

const {
  removeConfirmShown,
  showRemoveConfirm,
  remove: removeTask,
} = useRemoveItemConfirm(async (id: string) => {
  await store.commit('tasks/removeTask', id)
  await fetchTaskList()
})

const createTaskRoute = computed(() => getTaskCreateRoute(props.projectId))
</script>
