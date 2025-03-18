import projectStoreModule, {
  type ProjectStoreState,
} from '@/domains/project/store'
import { createStore, useStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

export interface State {
  projects: ProjectStoreState
}

const vuexLocal = new VuexPersistence<State>({
  storage: window.localStorage,
})

export default createStore<State>({
  modules: {
    projects: projectStoreModule,
  },
  plugins: [vuexLocal.plugin],
})

export const useAppStore = () => useStore()
