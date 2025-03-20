import type { TaskForm } from '../../src/domains/task/store/taskModel'

const task: TaskForm = {
  title: 'Task1-title',
  description: 'Task1-description',
  priority: 'high',
  status: 'completed',
  dueDate: '2011-11-11',
}
const taskUpdated: TaskForm = {
  title: 'Task2-title',
  description: 'Task2-description',
  priority: 'low',
  status: 'pending',
  dueDate: '2010-10-10',
}

describe('TaskEditRoute', () => {
  it('Default', () => {
    cy.editNewTask('Project1', task)
    cy.contains('h1', 'Edit task')
    cy.location('pathname').should('contain', '/tasks/')
    cy.location('pathname').should('contain', '/edit')
  })

  it('Submit - fail', () => {
    cy.editNewTask('Project1', task)
    cy.get('[data-cy="title"] input').clear()
    cy.get('[data-cy="submit"]').click()
    cy.get('[data-cy="title"]').contains('Value required')
  })

  it('Submit - success', () => {
    cy.editNewTask('Project1', task)
    cy.fillTaskForm(taskUpdated)
    cy.get('[data-cy="submit"]').click()
    cy.location('pathname').should('not.contain', '/tasks/')
    cy.checkTaskFields(taskUpdated)
  })

  it('Cancel', () => {
    cy.editNewTask('Project1', task)
    cy.get('[data-cy="cancel"]').click()
    cy.location('pathname').should('contain', '/edit')
  })
})
