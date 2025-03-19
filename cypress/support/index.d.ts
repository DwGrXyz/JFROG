declare namespace Cypress {
  interface Chainable {
    addProject(title: string): void
    checkProjectsCount(count: number): void
    enterFirstProject(): void
    checkTasksCount(count: number): void
  }
}
