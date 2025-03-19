describe('ProjectCreateRoute', () => {
  it('Submit', () => {
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
