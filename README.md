# Kanban Board (Angular)

Simple Angular project featuring a kanban board with "ToDo", "Doing" and "Done" columns, as well as a "New" column to add a task.

### Installation

This project is organized in "BACK" and "FRONT" directories. In order to install the necessary dependencies, you must change into each one and type <code>npm install</code>, as the examples below:

```
> cd BACK
> npm install
```

Ela responderá na porta 5000.

```
> cd FRONT
> npm install
```

### Running

To start the application, you'll need to start both the backend server and the angular application, as the examples below:

```
> cd BACK
> npm run server
```
```
> cd FRONT
> ng serve -o
```

#### Authentication

This project relies on JWT authentication, so, in order to have full access to its main page, you'll have to login as a registered user using the given credentials:

```
{ "login":"letscode", "senha":"lets@123" }
```