<template>
  <div>
    <h2>Tasks:</h2>

    <v-progress-circular
      v-if="taskListPending"
      indeterminate
      data-cy="tasks-loading"
    />

    <template v-else>
      <AppTasksTable
        :project-id="projectId"
        :task-list="taskList"
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
import { computed } from 'vue'
import type { TaskModel } from '@/domains/task/store/taskModel'
import { getTaskCreateRoute } from '@/router'
import AppCreateItem from '@/components/AppCreateItem.vue'
import { useAsyncDataFetch } from '@/compositions/useAsyncRequest'
import { useRemoveItemConfirm } from '@/compositions/useRemoveItemConfirm'
import AppConfirm from '@/components/AppConfirm.vue'
import AppTasksTable from './AppTasksTable.vue'

const props = defineProps<{
  projectId: string
  editable?: boolean
}>()

const store = useAppStore()

const [taskList, taskListPending, fetchTaskList] = useAsyncDataFetch<
  TaskModel[]
>([], () => store.dispatch('tasks/fetchTasksByProjectId', props.projectId))

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
