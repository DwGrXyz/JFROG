import type { TaskForm } from '../../src/domains/task/store/taskModel'

const task: TaskForm = {
  title: 'Task1-title',
  description: 'Task1-description',
  priority: 'high',
  status: 'completed',
  dueDate: '2011-11-11',
}

describe('TaskCreateRoute', () => {
  it('Default', () => {
    cy.viewNewTask('Project1')
    cy.contains('h1', 'Create task')
    cy.location('pathname').should('contain', '/tasks/new')
  })

  it('Submit - fail', () => {
    cy.viewNewTask('Project1')
    cy.get('[data-cy="submit"]').click()
    cy.get('[data-cy="title"]').contains('Value required')
  })

  it('Submit - success', () => {
    cy.createNewTask('Project1', task)
    cy.checkTaskFields(task)
    cy.location('pathname').should('contain', '/edit')
  })

  it('Cancel', () => {
    cy.viewNewTask('Project1')
    cy.get('[data-cy="cancel"]').click()
    cy.location('pathname').should('contain', '/edit')
  })
})
