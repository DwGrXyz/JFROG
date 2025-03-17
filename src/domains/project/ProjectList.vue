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
        <v-list-item-title> {{ project.title }}</v-list-item-title>

        <template v-slot:append>
          <v-btn
            :icon="mdiClose"
            variant="text"
            size="small"
            @click.prevent="removeProject(project.id)"
          />
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { projectListDefault } from './ProjectModel'
import { getProjectDetailsRoute } from '@/router'
import { mdiClose } from '@mdi/js'

const projectList = ref(projectListDefault)

const removeProject = (id: string) => {
  projectList.value = projectList.value.filter((project) => project.id !== id)
}
</script>
