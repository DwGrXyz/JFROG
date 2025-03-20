# jfrog

This project is test task for JFROG

The task is located in **JFROG_FE Task.pdf**

## Important notes

### Libraries

- It could be better to use **Next.js** for routing, code organization and further development
- **VueX** is dead and it should be replaced with Pinia or other store libraries
- For form management it's better to use some library (validation, submitting, etc..)

### Code sctucture

In project DDD/FDD implemented. Each feature located in own folder. It defers from test task:

```
Organize components into a feature-based structure (e.g., `src/components/projects`,
`src/components/tasks`, `src/store/modules`).
```

In the implemented variant the folder structure is:

- domains
  - project
    - components
    - store
  - task
    - components
    - store

Pros: all feature files are gathered togeter, a developer don't need to jump across the project to find a store for a component, it should be inside the feature folder.

Cons: to find all modules/services/forms/whatever could be tricky, they are divided between features.

### Routing

In project neseted routes haven't been used. **Data** **validation** is **performed** **inside** the **components**, **and** **in** **some** **cases** **this** **leads** **to** **additional** **checks**. Example: the task pages have to check if their projects exist.

It could be better to create nested routes with type guards on routing level. In that case if a user goes to /{projId}/tasks/{taskId} and projId is not existed, it would be stopped on the first path level. But it would make routing more complex, a controversial decision for a small project.

Also for each route specilal generation method was added. It used for better typechecking. There are other solutions of how to gain the same effect (create type for each route for example), but they are more complex.

### Testing

Unit tests for components are used only in cases that's hard to test by e2e tests: components for task priority and status.

Unit tests for storage covers all (or most of all) cases

Unit tests for other code haven't been created at all because application is pretty simple and has no complex logic

E2E tests covers most of all cases. TODO: create tests for 404 page

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
