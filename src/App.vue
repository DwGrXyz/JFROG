<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getProjectListRoute } from './router'
</script>

<template>
  <v-app class="pa-4">
    <header class="d-flex ga-2 align-center">
      <RouterLink :to="getProjectListRoute()">
        <img alt="Vue logo" src="@/assets/logo.svg" width="50" height="50" />
      </RouterLink>
      <span>JFROG test task</span>
    </header>
    <hr />

    <RouterView />
  </v-app>
</template>
