describe('ProjectDetailsRoute', () => {
  it('Default content', () => {
    cy.addProject('Project1')
    cy.enterFirstProject()
    cy.contains('h1', 'Project1')
    cy.checkTasksCount(0)
  })

  it('Edit', () => {
    cy.addProject('Project1')
    cy.enterFirstProject()
    cy.get('[data-cy="edit"]').click()
    cy.contains('h1', 'Edit project')
    cy.location('pathname').should('contain', '/edit')
  })
})
