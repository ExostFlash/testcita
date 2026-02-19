# CitaPote

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Séquence 2 – Logique réactive du flux de données
### 1. Structure du flux
- Le service `TaskService` utilise un **BehaviorSubject** pour stocker et diffuser la liste des tâches.
- Le composant `Home` s’abonne à ce flux via `tasks$` et le **pipe async**.
### 2. Mise à jour des données
- La méthode `addTask()` ajoute une tâche puis appelle `next()` pour émettre la nouvelle liste.
- La méthode `removeTask()` supprime une tâche puis émet à nouveau la liste mise à jour.
- La vue est automatiquement réactualisée sans rechargement.
### 3. Points clés retenus
- Pas besoin d’appeler `getTasks()` à chaque fois : la donnée est **vivante**.
- `| async` gère l’abonnement et le désabonnement automatiquement.
- Le flux reste cohérent entre le service et la vue.