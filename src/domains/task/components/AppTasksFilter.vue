<template>
  <div>
    <h3>Filter</h3>

    <div class="d-sm-flex ga-4">
      <v-select
        class="flex-1-0-0"
        :model-value="filter.priority"
        label="Priority"
        :items="priorityOptions"
        data-cy="filter-priority"
        @update:model-value="updatePriority($event)"
      />

      <v-select
        class="flex-1-0-0"
        :model-value="filter.status"
        label="Status"
        :items="statusOptions"
        data-cy="filter-status"
        @update:model-value="updateStatus($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  taskPriorityVariant,
  taskStatusVariant,
  type TaskPriority,
  type TaskStatus,
} from '../store/taskModel'

export type TasksFilter = {
  priority: TaskPriority | ''
  status: TaskStatus | ''
}

const props = defineProps<{
  filter: TasksFilter
}>()

const emit = defineEmits<{
  'update:filter': [TasksFilter]
}>()

const priorityOptions = ['', ...taskPriorityVariant]
const statusOptions = ['', ...taskStatusVariant]

const updatePriority = (value: string) => {
  emit('update:filter', { ...props.filter, priority: value as TaskPriority })
}
const updateStatus = (value: string) => {
  emit('update:filter', { ...props.filter, status: value as TaskStatus })
}
</script>
