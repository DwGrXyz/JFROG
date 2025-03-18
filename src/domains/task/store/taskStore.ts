import type { Module } from 'vuex/types/index.js'
import type { TaskModel } from './taskModel'
import { genUniqueId } from '@/utils/genUniqueId'
import type { CreatePayload } from '@/store/types'

export type TaskStoreState = {
  tasks: TaskModel[]
}

const taskStoreModule: Module<TaskStoreState, unknown> = {
  namespaced: true,
  state: () => ({
    tasks: [],
  }),
  getters: {
    getTask: (state) => (id: string) =>
      state.tasks.find((task) => task.id === id),
    getTasksByProjectId: (state) => (projectId: string) =>
      state.tasks.filter((task) => task.projectId === projectId),
  },
  mutations: {
    addTask: (state, task: TaskModel) => {
      state.tasks = [...state.tasks, task]
    },
    removeTask: (state, id: string) => {
      state.tasks = state.tasks.filter((task) => task.id !== id)
    },
  },
  actions: {
    createUniqueId: ({ getters }) => {
      let id: string

      // Check for duplicates!
      do {
        id = genUniqueId()
      } while (getters.getTask(id))

      return id
    },
    createTask: async (
      { commit, dispatch },
      taskForm: CreatePayload<TaskModel>,
    ) => {
      const id = await dispatch('createUniqueId')
      const task = { ...taskForm, id }
      commit('addTask', task)
      return id
    },
  },
}

export default taskStoreModule
