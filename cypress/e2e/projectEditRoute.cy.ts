import type { TaskForm } from '../../src/domains/task/store/taskModel'

const task: TaskForm = {
  title: 'Task1-title',
  description: 'Task1-description',
  priority: 'high',
  status: 'completed',
  dueDate: '2011-11-11',
}

describe('ProjectEditRoute', () => {
  it('Default content', () => {
    cy.editNewProject('Project1')
    cy.contains('h1', 'Edit project')
  })

  it('Submit - error', () => {
    cy.editNewProject('Project1')
    cy.get('[data-cy="title"] input').clear()
    cy.get('[data-cy="submit"]').click()
    cy.get('[data-cy="title"]').contains('Value required')
  })

  it('Submit - success', () => {
    cy.editNewProject('Project1')
    cy.get('[data-cy="title"] input').clear()
    cy.submitProjectTitleInProjectForm('Project new name')
    cy.contains('h1', 'Project new name')
    cy.location('pathname').should('not.contain', '/edit')
  })

  it('Cancel', () => {
    cy.editNewProject('Project1')
    cy.get('[data-cy="cancel"]').click()
    cy.contains('h1', 'Project1')
    cy.location('pathname').should('not.contain', '/edit')
  })

  it('Create', () => {
    cy.viewNewTask('Project1')
    cy.contains('h1', 'Create task')
    cy.location('pathname').should('contain', '/tasks/new')
  })

  it('Task', () => {
    cy.createNewTask('Project1', task)
    cy.checkTasksCount(1)
    cy.checkTaskFields(task)
  })

  it('Task - edit', () => {
    cy.createNewTask('Project1', task)
    cy.get('[data-cy="task-edit"]').click()
    cy.contains('h1', 'Edit task')
    cy.location('pathname').should('contain', '/tasks')
    cy.location('pathname').should('contain', '/edit')
  })

  it('Task - remove', () => {
    cy.createNewTask('Project1', task)
    cy.get('[data-cy="task-remove"]').click()
    cy.get('[data-cy="confirm"] [data-cy="submit"]').click()
    cy.get('[data-cy="tasks-loading"]').should('not.exist')
    cy.checkTasksCount(0)
  })

  it('Task - filter by priority', () => {
    cy.createNewTask('Project1', task)
    cy.get('[data-cy="create"]').click()
    cy.fillTaskForm({ ...task, title: 'Low priority', priority: 'low' })
    cy.get('[data-cy="submit"]').click()
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
