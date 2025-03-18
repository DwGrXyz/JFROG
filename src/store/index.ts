import projectStoreModule, {
  type ProjectStoreState,
} from '@/domains/project/store'
import taskStoreModule, { type TaskStoreState } from '@/domains/task/taskStore'
import { createStore, useStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

export interface State {
  projects: ProjectStoreState
  tasks: TaskStoreState
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
})

export default createStore<State>({
  modules: {
    projects: projectStoreModule,
    tasks: taskStoreModule,
  },
  plugins: [vuexLocal.plugin],
})

export const useAppStore = () => useStore()
