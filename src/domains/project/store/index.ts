import type { Module } from 'vuex/types/index.js'
import { type ProjectModel } from './projectModel'
import { genUniqueId } from '@/utils/genUniqueId'

type ProjectStoreState = {
  projects: ProjectModel[]
}

const projectStoreModule: Module<ProjectStoreState, any> = {
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
    removeProject: (state, id: string) => {
      state.projects = state.projects.filter((project) => project.id !== id)
    },
    addProject: (state, project: ProjectModel) => {
      state.projects = [...state.projects, project]
    },
  },
  actions: {
    createUniqueId: ({ getters }) => {
      let id: string

      // Check for duplicates!
      do {
        id = genUniqueId()
      } while (getters.getProject(id))

      return id
    },
    createProject: async ({ getters, commit, dispatch }) => {
      const id = await dispatch('createUniqueId')
      const project = { id, title: `Project ${id}` }
      commit('addProject', project)
      return project
    },
  },
}

export default projectStoreModule
