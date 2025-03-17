<template>
  <div>
    <h1>Project list</h1>

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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { projectListDefault } from './ProjectModel'
import { getProjectDetailsRoute, getProjectFormRoute } from '@/router'
import { mdiClose, mdiPlus } from '@mdi/js'
import { useRouter } from 'vue-router'

const projectList = ref(projectListDefault)

const removeProject = (id: string) => {
  projectList.value = projectList.value.filter((project) => project.id !== id)
}

const router = useRouter()
const createProject = () => {
  const id = '3'
  const route = getProjectFormRoute(id)
  router.push(route)
}
</script>
