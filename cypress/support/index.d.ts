declare namespace Cypress {
  interface Chainable {
    submitProjectTitleInProjectForm(title: string): void
    addProject(title: string): void
    checkProjectsCount(count: number): void
    enterFirstProject(): void
    checkTasksCount(count: number): void
    viewNewProject(title: string): void
    editNewProject(title: string): void
    viewNewTask(title: string): void
    createNewTask(
      title: string,
      task: import('../../src/domains/task/store/taskModel').TaskForm,
    ): void
  }
}
