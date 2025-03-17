import NotFoundPage from '@/components/NotFoundPage.vue'
import {
  createRouter,
  createWebHistory,
  type RouteLocationRaw,
  type RouteRecordRaw,
} from 'vue-router'

const projectFormRoute: RouteRecordRaw = {
  path: '/:projectId/form',
  name: 'projectFormRoute',
  component: () => import('../domains/project/ProjectForm.vue'),
  props: true,
}
export const getProjectFormRoute = (projectId: string): RouteLocationRaw => ({
  name: projectFormRoute.name,
  params: { projectId },
})

const taskFormRoute: RouteRecordRaw = {
  path: '/:projectId/:taskId/form',
  name: 'taskFormRoute',
  component: () => import('../domains/task/TaskForm.vue'),
  props: true,
}
export const getTaskFormRoute = (
  projectId: string,
  taskId: string,
): RouteLocationRaw => ({
  name: taskFormRoute.name,
  params: { projectId, taskId },
})

const projectDetailsRoute: RouteRecordRaw = {
  path: '/:projectId',
  name: 'projectDetailsRoute',
  component: () => import('../domains/project/ProjectDetails.vue'),
  props: true,
}
export const getProjectDetailsRoute = (
  projectId: string,
): RouteLocationRaw => ({
  name: projectDetailsRoute.name,
  params: { projectId },
})

const projectListRoute: RouteRecordRaw = {
  path: '/',
  name: 'projectListRoute',
  component: () => import('../domains/project/ProjectList.vue'),
}
export const getProjectListRoute = (): RouteLocationRaw => ({
  name: projectListRoute.name,
})

const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  component: NotFoundPage,
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    projectListRoute,
    projectDetailsRoute,
    projectFormRoute,
    taskFormRoute,
    notFoundRoute,
  ],
})

export default router
