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
Cypress.Commands.add('addProject', (title: string) => {
  cy.visit('/new')
  cy.get('[data-cy="title"] input').type(title)
  cy.get('[data-cy="submit"]').click()
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

export {}
