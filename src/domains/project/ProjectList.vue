<template>
  <AppLayout title="Project list">
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
            :icon="mdiClose"
            variant="text"
            size="small"
            @click.prevent="removeProject(project.id)"
          />
        </template>
      </v-list-item>

      <v-list-item link @click="createProject">
        <v-list-item-title>
          <div class="d-flex align-center ga-1">
            <v-icon :icon="mdiPlus" size="small" />
            Create
          </div>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getProjectDetailsRoute } from '@/router'
import { mdiClose, mdiPlus } from '@mdi/js'
import { useAppStore } from '@/store'
import AppLayout from '../../components/AppLayout.vue'

const store = useAppStore()
const projectList = computed(() => store.getters['projects/getProjects'])
const removeProject = (id: string) => store.commit('projects/removeProject', id)
const createProject = () => store.dispatch('projects/createProject')
</script>
