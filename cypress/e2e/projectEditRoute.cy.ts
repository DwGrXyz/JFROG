import type { TaskForm } from '../../src/domains/task/store/taskModel'

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
    const task: TaskForm = {
      title: 'Task1-title',
      description: 'Task1-description',
      priority: 'high',
      status: 'completed',
      dueDate: '2011-11-11',
    }
    cy.createNewTask('Project1', task)
    cy.checkTasksCount(1)
    cy.checkTaskFields(task)
  })
})
