import projectStoreModule from '@/domains/project/store'
import { createStore } from 'vuex'

export default createStore({
  modules: {
    projects: projectStoreModule,
  },
})
