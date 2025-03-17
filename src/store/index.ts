import projectStoreModule, {
  type ProjectStoreState,
} from '@/domains/project/store'
import { createStore, useStore } from 'vuex'

export interface State {
  projects: ProjectStoreState
}

export default createStore<State>({
  modules: {
    projects: projectStoreModule,
  },
})

export const useAppStore = () => useStore()
