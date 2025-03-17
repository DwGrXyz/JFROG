import projectStoreModule, {
  type ProjectStoreState,
} from '@/domains/project/store'
import type { InjectionKey } from 'vue'
import { createStore, Store, useStore } from 'vuex'

export interface State {
  projects: ProjectStoreState
}

export const key: InjectionKey<Store<State>> = Symbol()

export default createStore({
  modules: {
    projects: projectStoreModule,
  },
})

export const useAppStore = () => useStore(key)
