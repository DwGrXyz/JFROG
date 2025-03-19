import { describe, test, it, expect, beforeEach } from 'vitest'
import store from '@/store'
import type { ProjectModel } from '../projectModel'
import type { TaskModel } from '@/domains/task/store/taskModel'

const project1: ProjectModel = {
  id: '1',
  title: 'Project #1',
}
const project2: ProjectModel = {
  id: '2',
  title: 'Project #2',
}

describe('projectStore', () => {
  beforeEach(() => {
    store.commit('projects/reset')
  })

  describe('getters', () => {
    describe('getProject', () => {
      test('empty', () => {
        expect(store.getters['projects/getProject'](project1.id)).toBe(
          undefined,
        )
      })

      test('has task', () => {
        store.commit('projects/addProject', project1)
        expect(store.getters['projects/getProject'](project1.id)).toEqual(
          project1,
        )
      })
    })

    describe('getProjects', () => {
      test('empty', () => {
        expect(store.getters['projects/getProjects']).toEqual([])
      })

      test('has task', () => {
        store.commit('projects/addProject', project1)
        const result = store.getters['projects/getProjects']
        expect(result).toEqual([project1])
      })

      test('multiple projects', () => {
        store.commit('projects/addProject', project1)
        store.commit('projects/addProject', project2)
        const result = store.getters['projects/getProjects']
        expect(result).toEqual([project1, project2])
      })
    })
  })

  describe('mutations', () => {
    describe('addProject', () => {
      test('add single', () => {
        store.commit('projects/addProject', project1)
        expect(store.getters['projects/getProject'](project1.id)).toEqual(
          project1,
        )
      })

      test('add two', () => {
        store.commit('projects/addProject', project1)
        store.commit('projects/addProject', project1) // Yup, id isn't unique.
        expect(store.getters['projects/getProject'](project1.id)).toEqual(
          project1,
        )
      })
    })

    describe('updateProject', () => {
      test('fail', () => {
        store.commit('projects/updateProject', {
          id: project1.id,
          title: 'Updated!',
        })
        expect(store.getters['projects/getProject'](project1.id)).toEqual(
          undefined,
        )
      })

      test('success', () => {
        store.commit('projects/addProject', project1)
        store.commit('projects/updateProject', {
          id: project1.id,
          title: 'Updated!',
        })
        const task = store.getters['projects/getProject'](project1.id)
        expect(task.title).toEqual('Updated!')
      })
    })

    describe('removeProject', () => {
      test('success', () => {
        store.commit('projects/addProject', project1)
        expect(store.getters['projects/getProject'](project1.id)).toEqual(
          project1,
        )

        store.commit('projects/removeProject', project1.id)
        expect(store.getters['projects/getProject'](project1.id)).toEqual(
          undefined,
        )
      })
    })
  })

  describe('actions', () => {
    describe('fetchProject', () => {
      test('empty', async () => {
        expect(await store.dispatch('projects/fetchProject', 1)).toBe(undefined)
      })

      test('has task', async () => {
        store.commit('projects/addProject', project1)
        expect(
          await store.dispatch('projects/fetchProject', project1.id),
        ).toEqual(project1)
      })
    })

    describe('fetchProjects', () => {
      test('empty', async () => {
        expect(await store.dispatch('projects/fetchProjects', 1)).toEqual([])
      })

      test('has task', async () => {
        store.commit('projects/addProject', project1)
        const result = await store.dispatch('projects/fetchProjects')
        expect(result).toEqual([project1])
      })

      test('multiple tasks', async () => {
        store.commit('projects/addProject', project1)
        store.commit('projects/addProject', project2)
        const result = await store.dispatch('projects/fetchProjects')
        expect(result).toEqual([project1, project2])
      })
    })

    describe('removeProject', () => {
      test('success', async () => {
        const { id } = project1
        const task: TaskModel = {
          id: '1',
          projectId: project1.id,
          title: 'Task #1',
          priority: 'high',
          status: 'completed',
        }
        store.commit('projects/addProject', project1)
        store.commit('tasks/addTask', task)
        expect(store.getters['projects/getProjects']).toEqual([project1])
        expect(store.getters['tasks/getTasksByProjectId'](id)).toEqual([task])

        await store.dispatch('projects/removeProject', id)
        expect(store.getters['projects/getProjects']).toEqual([])
        expect(store.getters['tasks/getTasksByProjectId'](id)).toEqual([])
      })
    })

    describe('createProject', () => {
      test('success', async () => {
        const id = await store.dispatch('projects/createProject', project1)
        expect(id).toBeTypeOf('string')

        const newTask = { ...project1, id }
        expect(store.getters['projects/getProject'](id)).toEqual(newTask)
      })
    })
  })
})
