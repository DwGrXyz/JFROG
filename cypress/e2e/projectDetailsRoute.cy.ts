import type { TaskForm } from '../../src/domains/task/store/taskModel'

const task: TaskForm = {
  title: 'Task1-title',
  description: 'Task1-description',
  priority: 'high',
  status: 'completed',
  dueDate: '2011-11-11',
}

describe('ProjectDetailsRoute', () => {
  it('Default content', () => {
    cy.viewNewProject('Project1')
    cy.contains('h1', 'Project1')
    cy.checkTasksCount(0)
  })

  it('Edit', () => {
    cy.editNewProject('Project1')
    cy.contains('h1', 'Edit project')
    cy.location('pathname').should('contain', '/edit')
  })

  it('Task', () => {
    cy.createNewTask('Project1', task)
    cy.get('[data-cy="cancel"]').click()
    cy.checkTasksCount(1)
    cy.checkTaskFields(task)
  })

  it('Task - filter by priority', () => {
    cy.createNewTask('Project1', task)
    cy.get('[data-cy="create"]').click()
    cy.fillTaskForm({ ...task, title: 'Low priority', priority: 'low' })
    cy.get('[data-cy="submit"]').click()

    cy.get('[data-cy="cancel"]').click()
    cy.checkTasksCount(2)

    cy.selectOption('[data-cy="filter-priority"]', 'low')
    cy.checkTasksCount(1)
    cy.get('[data-cy="title"]').should('contain', 'Low priority')

    cy.selectOption('[data-cy="filter-priority"]', 'medium')
    cy.checkTasksCount(0)

    cy.selectOption('[data-cy="filter-priority"]', 'high')
    cy.checkTasksCount(1)
    cy.get('[data-cy="title"]').should('contain', 'Task1-title')
  })

  it('Task - filter by status', () => {
    cy.createNewTask('Project1', task)
    cy.get('[data-cy="create"]').click()
    cy.fillTaskForm({ ...task, title: 'Status: Pending', status: 'pending' })
    cy.get('[data-cy="submit"]').click()

    cy.get('[data-cy="cancel"]').click()
    cy.checkTasksCount(2)

    cy.selectOption('[data-cy="filter-status"]', 'pending')
    cy.checkTasksCount(1)
    cy.get('[data-cy="title"]').should('contain', 'Status: Pending')

    cy.selectOption('[data-cy="filter-status"]', 'in-progress')
    cy.checkTasksCount(0)

    cy.selectOption('[data-cy="filter-status"]', 'completed')
    cy.checkTasksCount(1)
    cy.get('[data-cy="title"]').should('contain', 'Task1-title')
  })
})
