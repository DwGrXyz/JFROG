describe('ProjectListRoute', () => {
  it('Default content', () => {
    cy.visit('/')
    cy.contains('h1', 'Project list')
    cy.checkProjectsCount(0)
  })

  it('List items', () => {
    cy.addProject('Project1')
    cy.checkProjectsCount(1)
    cy.contains('div', 'Project1')
  })

  it('Create item', () => {
    cy.visit('/')
    cy.get('[data-cy="create"]').click()
    cy.location('pathname').should('eq', '/new')
  })

  it('Remove item', () => {
    cy.addProject('Project1')
    cy.get('[data-cy="remove"]').click()
    cy.get('[data-cy="confirm"] [data-cy="submit"]').click()
    cy.checkProjectsCount(0)
  })
})
