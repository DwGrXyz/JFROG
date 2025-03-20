import type { TaskForm } from '../../src/domains/task/store/taskModel'

describe('TaskCreateRoute', () => {
  it('Default', () => {
    cy.viewNewTask('Project1')
    cy.contains('h1', 'Create task')
    cy.location('pathname').should('contain', '/tasks/new')
  })

  it('Submit', () => {
    const task: TaskForm = {
      title: 'Task1-title',
      description: 'Task1-description',
      priority: 'high',
      status: 'completed',
      dueDate: '2011-11-11',
    }
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
