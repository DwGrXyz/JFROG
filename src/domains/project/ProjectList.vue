<template>
  <AppLayout title="Project list" :fetching="projectListPending">
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
            @click.prevent="showRemoveConfirm(project.id)"
          />
        </template>
      </v-list-item>
    </v-list>

    <AppCreateItem class="mt-2" :to="createProjectRoute" />
  </AppLayout>

  <AppConfirm v-model="removeConfirmShown" @submit="removeProject" />
</template>

<script setup lang="ts">
import { getProjectCreateRoute, getProjectDetailsRoute } from '@/router'
import { mdiTrashCan } from '@mdi/js'
import { useAppStore } from '@/store'
import AppLayout from '@/components/AppLayout.vue'
import AppCreateItem from '@/components/AppCreateItem.vue'
import type { ProjectModel } from './store/projectModel'
import { useAsyncDataFetch } from '@/compositions/useAsyncRequest'
import { computed } from 'vue'
import AppConfirm from '@/components/AppConfirm.vue'
import { useRemoveItemConfirm } from '@/compositions/useRemoveItemConfirm'

const store = useAppStore()

const [projectList, projectListPending, fetchProjectList] = useAsyncDataFetch<
  ProjectModel[]
>([], () => store.dispatch('projects/fetchProjects'))

const {
  removeConfirmShown,
  showRemoveConfirm,
  remove: removeProject,
} = useRemoveItemConfirm(async (id: string) => {
  await store.commit('projects/removeProject', id)
  await fetchProjectList()
})

const createProjectRoute = computed(() => getProjectCreateRoute())
</script>
