import NotFoundPage from '@/NotFoundPage.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const projectFormRoute: RouteRecordRaw = {
  path: '/:projectId/form',
  name: 'projectFormRoute',
  component: () => import('../domains/project/ProjectForm.vue'),
  props: true,
}

const taskFormRoute: RouteRecordRaw = {
  path: '/:projectId/:taskId/form',
  name: 'taskFormRoute',
  component: () => import('../domains/task/TaskForm.vue'),
  props: true,
}

const projectDetailsRoute: RouteRecordRaw = {
  path: '/:projectId',
  name: 'projectDetailsRoute',
  component: () => import('../domains/project/ProjectDetails.vue'),
  props: true,
}

const projectListRoute: RouteRecordRaw = {
  path: '/',
  name: 'projectListRoute',
  component: () => import('../domains/project/ProjectList.vue'),
}

const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  component: NotFoundPage,
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [projectListRoute, projectDetailsRoute, projectFormRoute, taskFormRoute, notFoundRoute],
})

export default router
