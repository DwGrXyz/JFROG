import type { TaskForm } from '../../src/domains/task/store/taskModel'

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
    const task: TaskForm = {
      title: 'Task1-title',
      description: 'Task1-description',
      priority: 'high',
      status: 'completed',
      dueDate: '2011-11-11',
    }
    cy.createNewTask('Project1', task)
    cy.get('[data-cy="cancel"]').click()
    cy.checkTasksCount(1)
    cy.checkTaskFields(task)
  })
})
