import type { Module } from 'vuex/types/index.js'
import { type ProjectModel } from './projectModel'
import { genUniqueId } from '@/utils/genUniqueId'
import { mockApi } from '@/utils/mockApi'

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
      return getters['getProjects']
    },
    createUniqueId: ({ getters }) => {
      let id: string

      // Check for duplicates!
      do {
        id = genUniqueId()
      } while (getters.getProject(id))

      return id
    },
    createProject: async ({ commit, dispatch }) => {
      await mockApi()
      const id = await dispatch('createUniqueId')
      const project = { id, title: `Project ${id}` }
      commit('addProject', project)
      return project
    },
  },
}

export default projectStoreModule
