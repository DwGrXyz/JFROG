<template>
  <AppLayout title="Project list">
    <v-progress-circular v-if="projectListPending" indeterminate />
    <template v-else>
      <v-list>
        <v-list-item
          v-for="project in projectList"
          :key="project.id"
          link
          :to="getProjectDetailsRoute(project.id)"
        >
          <v-list-item-title>{{ project.title }}</v-list-item-title>

          <template v-slot:append>
            <v-btn
              :icon="mdiTrashCan"
              variant="text"
              size="small"
              @click.prevent="removeProject(project.id)"
            />
          </template>
        </v-list-item>
      </v-list>

      <AppCreateItem class="mt-2" :to="createProjectRoute" />
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import { getProjectCreateRoute, getProjectDetailsRoute } from '@/router'
import { mdiTrashCan } from '@mdi/js'
import { useAppStore } from '@/store'
import AppLayout from '@/components/AppLayout.vue'
import AppCreateItem from '@/components/AppCreateItem.vue'
import type { ProjectModel } from './store/projectModel'
import { useAsyncRequest } from '@/compositions/useAsyncRequest'
import { computed, ref } from 'vue'

const store = useAppStore()
const projectList = ref<ProjectModel[]>([])
const [projectListPending, loadProjectList] = useAsyncRequest(async () => {
  const result = await store.dispatch('projects/fetchProjects')
  projectList.value = result
})
loadProjectList()
const removeProject = (id: string) => store.commit('projects/removeProject', id)

const createProjectRoute = computed(() => getProjectCreateRoute())
</script>
