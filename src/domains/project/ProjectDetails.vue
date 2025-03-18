<template>
  <NotFoundPage v-if="!project" />
  <AppLayout v-else :title="`Project: ${project.title}`">
    <template v-slot:action>
      <v-btn :to="formRoute" :icon="mdiPencil" variant="text" />
    </template>

    <div>
      <h2>Tasks:</h2>

      <v-table>
        <thead>
          <tr>
            <th>Title</th>
            <th class="w-100">Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th class="text-no-wrap">Due date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td>{{ task.title }}</td>

            <td>{{ task.description || '-' }}</td>

            <td><AppProjectPriority :priority="task.priority" /></td>

            <td><AppProjectStatus :status="task.status" /></td>

            <td>{{ task.dueDate || '-' }}</td>
          </tr>
        </tbody>
      </v-table>

      <v-btn :to="createTaskRoute">
        <AppCreateItem />
      </v-btn>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store'
import { computed } from 'vue'
import type { ProjectModel } from './store/projectModel'
import NotFoundPage from '@/components/NotFoundPage.vue'
import { getProjectFormRoute, getTaskCreateRoute } from '@/router'
import AppLayout from '@/components/AppLayout.vue'
import { mdiPencil } from '@mdi/js'
import type { TaskModel } from '../task/store/taskModel'
import AppCreateItem from '@/components/AppCreateItem.vue'
import AppProjectPriority from './components/AppProjectPriority.vue'
import AppProjectStatus from './components/AppProjectStatus.vue'

const props = defineProps<{
  projectId: string
}>()

const store = useAppStore()
const project = computed<ProjectModel | undefined>(() =>
  store.getters['projects/getProject'](props.projectId),
)
const tasks = computed<TaskModel[]>(() =>
  store.getters['tasks/getTasksByProjectId'](props.projectId),
)
const createTaskRoute = computed(() => getTaskCreateRoute(props.projectId))

const formRoute = computed(() => getProjectFormRoute(props.projectId))
</script>
