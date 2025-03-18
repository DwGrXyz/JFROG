import NotFoundPage from '@/components/NotFoundPage.vue'
import {
  createRouter,
  createWebHistory,
  type RouteLocationRaw,
  type RouteRecordRaw,
} from 'vue-router'

const projectListRoute: RouteRecordRaw = {
  path: '/',
  name: 'projectListRoute',
  component: () => import('@/domains/project/ProjectList.vue'),
}
export const getProjectListRoute = (): RouteLocationRaw => ({
  name: projectListRoute.name,
})

const projectCreateRoute: RouteRecordRaw = {
  path: '/new',
  name: 'projectCreateRoute',
  component: () => import('@/domains/project/ProjectForm.vue'),
}
export const getProjectCreateRoute = (): RouteLocationRaw => ({
  name: projectCreateRoute.name,
})

const projectDetailsRoute: RouteRecordRaw = {
  path: '/:projectId',
  name: 'projectDetailsRoute',
  component: () => import('@/domains/project/ProjectDetails.vue'),
  props: true,
}
export const getProjectDetailsRoute = (
  projectId: string,
): RouteLocationRaw => ({
  name: projectDetailsRoute.name,
  params: { projectId },
})

const projectEditRoute: RouteRecordRaw = {
  path: '/:projectId/edit',
  name: 'projectEditRoute',
  component: () => import('@/domains/project/ProjectForm.vue'),
  props: true,
}
export const getProjectEditRoute = (projectId: string): RouteLocationRaw => ({
  name: projectEditRoute.name,
  params: { projectId },
})

const taskCreateRoute: RouteRecordRaw = {
  path: '/:projectId/tasks/new',
  name: 'taskCreateRoute',
  component: () => import('@/domains/task/TaskForm.vue'),
  props: true,
}
export const getTaskCreateRoute = (projectId: string): RouteLocationRaw => ({
  name: taskCreateRoute.name,
  params: { projectId },
})

const taskEditRoute: RouteRecordRaw = {
  path: '/:projectId/tasks/:taskId/edit',
  name: 'taskEditRoute',
  component: () => import('@/domains/task/TaskForm.vue'),
  props: true,
}
export const getTaskEditRoute = (
  projectId: string,
  taskId: string,
): RouteLocationRaw => ({
  name: taskEditRoute.name,
  params: { projectId, taskId },
})

const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  component: NotFoundPage,
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    projectListRoute,
    projectCreateRoute,
    projectDetailsRoute,
    projectEditRoute,
    taskCreateRoute,
    taskEditRoute,
    notFoundRoute,
  ],
})

export default router
