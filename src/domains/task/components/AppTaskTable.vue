<template>
  <div>
    <h2>Tasks:</h2>

    <v-progress-circular
      v-if="taskListPending"
      indeterminate
      data-cy="tasks-loading"
    />

    <template v-else>
      <v-table data-cy="tasks">
        <thead>
          <tr>
            <th class="app-task-table__title">Title</th>
            <th class="w-100">Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th class="app-task-table__due-date text-no-wrap">Due date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in taskList" :key="task.id">
            <td class="text-truncate" data-cy="title">
              {{ task.title }}
            </td>

            <td class="text-break" data-cy="description">
              {{ task.description || '-' }}
            </td>

            <td data-cy="priority">
              <AppTaskPriority :priority="task.priority" />
            </td>

            <td data-cy="status"><AppTaskStatus :status="task.status" /></td>

            <td data-cy="dueDate">{{ task.dueDate || '-' }}</td>

            <td>
              <div v-if="editable" class="d-flex ga-2">
                <v-btn
                  :to="getTaskEditRoute(projectId, task.id)"
                  :icon="mdiPencil"
                  variant="text"
                  size="small"
                  data-cy="task-edit"
                />

                <v-btn
                  v-if="editable"
                  :icon="mdiTrashCan"
                  variant="text"
                  size="small"
                  data-cy="task-remove"
                  @click.prevent="showRemoveConfirm(task.id)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </v-table>

      <AppCreateItem v-if="editable" class="mt-2" :to="createTaskRoute" />
    </template>

    <AppConfirm v-model="removeConfirmShown" @submit="removeTask" />
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed } from 'vue'
import { mdiPencil, mdiTrashCan } from '@mdi/js'
import type { TaskModel } from '@/domains/task/store/taskModel'
import AppTaskPriority from '@/domains/task/components/AppTaskPriority.vue'
import AppTaskStatus from '@/domains/task/components/AppTaskStatus.vue'
import { getTaskCreateRoute, getTaskEditRoute } from '@/router'
import AppCreateItem from '@/components/AppCreateItem.vue'
import { useAsyncDataFetch } from '@/compositions/useAsyncRequest'
import { useRemoveItemConfirm } from '@/compositions/useRemoveItemConfirm'
import AppConfirm from '@/components/AppConfirm.vue'

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

<style lang="css" scoped>
.app-task-table__title {
  max-width: 1px;
  width: 35%;
}

.app-task-table__due-date {
  min-width: 120px;
}
</style>
