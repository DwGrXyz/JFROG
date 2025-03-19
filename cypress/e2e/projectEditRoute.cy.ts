describe('ProjectEditRoute', () => {
  it('Default content', () => {
    cy.editNewProject('Project1')
    cy.contains('h1', 'Edit project')
  })

  it('Cancel', () => {
    cy.editNewProject('Project1')
    cy.get('[data-cy="cancel"]').click()
    cy.contains('h1', 'Project1')
    cy.location('pathname').should('not.contain', '/edit')
  })

  it('Save', () => {
    cy.editNewProject('Project1')
    cy.get('[data-cy="title"] input').clear()
    cy.submitProjectTitleInProjectForm('Project new name')
    cy.contains('h1', 'Project new name')
    cy.location('pathname').should('not.contain', '/edit')
  })
})
