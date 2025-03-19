describe('ProjectCreateRoute', () => {
  it('Submit - error', () => {
    cy.visit('/new')
    cy.get('[data-cy="submit"]').click()
    cy.get('[data-cy="title"]').contains('Value required')
    cy.location('pathname').should('eq', '/new')
  })

  it('Submit - success', () => {
    cy.addProject('Project1')
    cy.checkProjectsCount(1)
    cy.contains('div', 'Project1')
  })

  it('Cancel', () => {
    cy.visit('/new')
    cy.get('[data-cy="cancel"]').click()
    cy.location('pathname').should('eq', '/')
  })
})
