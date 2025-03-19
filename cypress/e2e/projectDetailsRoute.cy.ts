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
})
