/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import type { TaskForm } from '../../src/domains/task/store/taskModel'

Cypress.Commands.add('replaceInput', (query: string, text: string) => {
  cy.get(query).clear()
  cy.get(query).type(text)
})

Cypress.Commands.add('selectOption', (query: string, option: string) => {
  cy.get(query).click()
  cy.get('.v-overlay-container div').contains(option).click()
})

Cypress.Commands.add('submitProjectTitleInProjectForm', (title: string) => {
  cy.get('[data-cy="title"] input').type(title)
  cy.get('[data-cy="submit"]').click()
})

Cypress.Commands.add('addProject', (title: string) => {
  cy.visit('/new')
  cy.submitProjectTitleInProjectForm(title)
})

Cypress.Commands.add('checkProjectsCount', (count: number) => {
  cy.get('[data-cy="projects"]').children().should('have.length', count)
})

Cypress.Commands.add('enterFirstProject', () => {
  cy.get('[data-cy="projects"]').children().first().click()
})

Cypress.Commands.add('checkTasksCount', (count: number) => {
  cy.get('[data-cy="tasks"] tbody tr').should('have.length', count)
})

Cypress.Commands.add('viewNewProject', (title: string) => {
  cy.addProject(title)
  cy.enterFirstProject()
})

Cypress.Commands.add('editNewProject', (title: string) => {
  cy.viewNewProject(title)
  cy.get('[data-cy="edit"]').click()
})

Cypress.Commands.add('viewNewTask', (title: string) => {
  cy.editNewProject(title)
  cy.get('[data-cy="create"]').click()
})

Cypress.Commands.add('createNewTask', (title: string, task: TaskForm) => {
  cy.viewNewTask(title)
  cy.fillTaskForm(task)
  cy.get('[data-cy="submit"]').click()
})

Cypress.Commands.add('editNewTask', (title: string, task: TaskForm) => {
  cy.createNewTask(title, task)
  cy.get('[data-cy="task-edit"]').click()
})

Cypress.Commands.add('fillTaskForm', (task: TaskForm) => {
  cy.replaceInput('[data-cy="title"] input', task.title)

  if (task.description) {
    cy.replaceInput('[data-cy="description"] textarea', task.description)
  }

  cy.selectOption('[data-cy="priority"]', task.priority)

  cy.selectOption('[data-cy="status"]', task.status)

  if (task.dueDate) {
    cy.replaceInput('[data-cy="dueDate"] input', task.dueDate)
  }
})

Cypress.Commands.add('checkTaskFields', (task: TaskForm) => {
  cy.get('[data-cy="tasks"] [data-cy="title"]').contains(task.title)
  cy.get('[data-cy="tasks"] [data-cy="description"]').contains(
    task.description!,
  )
  cy.get('[data-cy="tasks"] [data-cy="priority"]').contains(task.priority)
  cy.get('[data-cy="tasks"] [data-cy="status"]').contains(task.status)
  cy.get('[data-cy="tasks"] [data-cy="dueDate"]').contains(task.dueDate!)
})

export {}
