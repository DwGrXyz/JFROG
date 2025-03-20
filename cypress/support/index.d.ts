declare namespace Cypress {
  interface Chainable {
    replaceInput(query: string, text: string): void
    selectOption(query: string, option: string): void
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
    editNewTask(
      title: string,
      task: import('../../src/domains/task/store/taskModel').TaskForm,
    ): void
    fillTaskForm(
      task: import('../../src/domains/task/store/taskModel').TaskForm,
    ): void
    checkTaskFields(
      task: import('../../src/domains/task/store/taskModel').TaskForm,
    ): void
  }
}
