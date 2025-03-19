import { describe, test, it, expect, beforeEach } from 'vitest'
import store from '@/store'
import type { TaskModel } from '../taskModel'

const task1: TaskModel = {
  id: '1',
  projectId: '1',
  title: 'Task #1',
  description: 'Description for task#1',
  priority: 'low',
  status: 'completed',
}
const task2: TaskModel = {
  id: '2',
  projectId: '2',
  title: 'Task #2',
  description: 'Description for task#2',
  priority: 'high',
  status: 'pending',
}
const task3: TaskModel = {
  id: '3',
  projectId: '1',
  title: 'Task #3',
  description: 'Description for task#3',
  priority: 'medium',
  status: 'pending',
}

describe('taskStore', () => {
  beforeEach(() => {
    store.commit('tasks/reset')
  })

  describe('getters', () => {
    describe('getTask', () => {
      test('empty', () => {
        expect(store.getters['tasks/getTask'](1)).toBe(undefined)
      })

      test('has task', () => {
        store.commit('tasks/addTask', task1)
        expect(store.getters['tasks/getTask'](task1.id)).toEqual(task1)
      })
    })

    describe('getTasksByProjectId', () => {
      test('empty', () => {
        expect(store.getters['tasks/getTasksByProjectId'](1)).toEqual([])
      })

      test('has task', () => {
        store.commit('tasks/addTask', task1)
        const { projectId } = task1
        const result = store.getters['tasks/getTasksByProjectId'](projectId)
        expect(result).toEqual([task1])
      })

      test('multiple tasks', () => {
        store.commit('tasks/addTask', task1)
        store.commit('tasks/addTask', task2)
        store.commit('tasks/addTask', task3)
        const { projectId } = task1
        const result = store.getters['tasks/getTasksByProjectId'](projectId)
        expect(result).toEqual([task1, task3])
      })
    })
  })

  describe('mutations', () => {
    describe('addTask', () => {
      test('add single', () => {
        store.commit('tasks/addTask', task1)
        expect(store.getters['tasks/getTask'](task1.id)).toEqual(task1)
      })

      test('add two', () => {
        store.commit('tasks/addTask', task1)
        store.commit('tasks/addTask', task1) // Yup, id isn't unique.
        expect(store.getters['tasks/getTask'](task1.id)).toEqual(task1)
      })
    })

    describe('updateTask', () => {
      test('fail', () => {
        store.commit('tasks/updateTask', { id: task1.id, title: 'Updated!' })
        expect(store.getters['tasks/getTask'](task1.id)).toEqual(undefined)
      })

      test('success', () => {
        store.commit('tasks/addTask', task1)
        store.commit('tasks/updateTask', { id: task1.id, title: 'Updated!' })
        const task = store.getters['tasks/getTask'](task1.id)
        expect(task.title).toEqual('Updated!')
      })
    })

    describe('removeTask', () => {
      test('success', () => {
        store.commit('tasks/addTask', task1)
        expect(store.getters['tasks/getTask'](task1.id)).toEqual(task1)

        store.commit('tasks/removeTask', task1.id)
        expect(store.getters['tasks/getTask'](task1.id)).toEqual(undefined)
      })
    })
  })

  describe('actions', () => {
    describe('fetchTask', () => {
      test('empty', async () => {
        expect(await store.dispatch('tasks/fetchTask', 1)).toBe(undefined)
      })

      test('has task', async () => {
        store.commit('tasks/addTask', task1)
        expect(await store.dispatch('tasks/fetchTask', task1.id)).toEqual(task1)
      })
    })

    describe('fetchTasksByProjectId', () => {
      test('empty', async () => {
        expect(await store.dispatch('tasks/fetchTasksByProjectId', 1)).toEqual(
          [],
        )
      })

      test('has task', async () => {
        store.commit('tasks/addTask', task1)
        const { projectId } = task1
        const result = await store.dispatch(
          'tasks/fetchTasksByProjectId',
          projectId,
        )
        expect(result).toEqual([task1])
      })

      test('multiple tasks', async () => {
        store.commit('tasks/addTask', task1)
        store.commit('tasks/addTask', task2)
        store.commit('tasks/addTask', task3)
        const { projectId } = task1
        const result = await store.dispatch(
          'tasks/fetchTasksByProjectId',
          projectId,
        )
        expect(result).toEqual([task1, task3])
      })
    })

    describe('createTask', () => {
      test('success', async () => {
        const id = await store.dispatch('tasks/createTask', task1)
        expect(id).toBeTypeOf('string')

        const newTask = { ...task1, id }
        expect(store.getters['tasks/getTask'](id)).toEqual(newTask)
      })
    })
  })
})
