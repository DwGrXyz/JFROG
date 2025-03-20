<template>
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
              @click.prevent="$emit('remove', task.id)"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { mdiPencil, mdiTrashCan } from '@mdi/js'
import type { TaskModel } from '@/domains/task/store/taskModel'
import AppTaskPriority from '@/domains/task/components/AppTaskPriority.vue'
import AppTaskStatus from '@/domains/task/components/AppTaskStatus.vue'
import { getTaskEditRoute } from '@/router'

defineProps<{
  projectId: string
  taskList: TaskModel[]
  editable?: boolean
}>()

defineEmits<{
  remove: [string]
}>()
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
