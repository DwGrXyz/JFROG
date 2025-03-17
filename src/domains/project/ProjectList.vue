<template>
  <div>
    <h1>Project list</h1>

    <v-list>
      <v-list-item
        v-for="project in projectList"
        :key="project.id"
        link
      >
        <RouterLink
          :to="getProjectDetailsRoute(project.id)"
        >
          {{ project.title }}
        </RouterLink>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { projectListDefault } from './ProjectModel'
import { getProjectDetailsRoute } from '@/router'

const projectList = ref(projectListDefault)
</script>
