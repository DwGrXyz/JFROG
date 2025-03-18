import type { Module } from 'vuex/types/index.js'
import { type ProjectModel } from './projectModel'
import { genUniqueId } from '@/utils/genUniqueId'
import { mockApi } from '@/utils/mockApi'
import type { CreatePayload } from '@/store/types'

export type ProjectStoreState = {
  projects: ProjectModel[]
}

const projectStoreModule: Module<ProjectStoreState, unknown> = {
  namespaced: true,
  state: () => ({
    projects: [],
  }),
  getters: {
    getProjects: (state) => state.projects,
    getProject: (state) => (id: string) =>
      state.projects.find((project) => project.id === id),
  },
  mutations: {
    addProject: (state, project: ProjectModel) => {
      state.projects = [...state.projects, project]
    },
    updateProject: (state, project: ProjectModel) => {
      state.projects = state.projects.map((projectI) =>
        projectI.id === project.id ? project : projectI,
      )
    },
    removeProject: (state, id: string) => {
      state.projects = state.projects.filter((project) => project.id !== id)
    },
  },
  actions: {
    fetchProjects: async ({ getters }) => {
      await mockApi()
      return getters.getProjects
    },
    fetchProject: async ({ getters }, id: string) => {
      await mockApi()
      return getters.getProject(id)
    },
    createUniqueId: ({ getters }) => {
      let id: string

      // Check for duplicates!
      do {
        id = genUniqueId()
      } while (getters.getProject(id))

      return id
    },
    createProject: async (
      { commit, dispatch },
      projectForm: CreatePayload<ProjectModel>,
    ) => {
      await mockApi()
      const id = await dispatch('createUniqueId')
      const project = { ...projectForm, id }
      commit('addProject', project)
      return id
    },
  },
}

export default projectStoreModule
