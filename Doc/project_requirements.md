[/nav](navigation.md) /project_requirements

# Project requirements

The project requirements and how they were implemented are listed below:

## Table of contents

- [Functionality](#functionality)
- [Technology](#technology)
- [Testing, development and quality assurance](#testing-development-and-quality-assurance)

## Functionality

### Search

Search functionality has been implemented on the movies page. The search field alows user to search the database on movie titles. The search is performed on the entire database, and not just the movies that are currently loaded on the client.

### List based presentation

The movies page displays a list of movies in a grid. The grid is responsive and adapts to the screen size. The grid is also scrollable, allowing the user to scroll through the entire list of movies. The movies are loaded 12 at a time, which should be enough to fill the screen on most devices. The user can scroll to the bottom of the list to load more movies.

### Detailed view

The movies page displays a detailed view of each movie. The detailed view is displayed in a seperate page when the user clicks on a movie in the list. The page displays the movie title, release year, overview, genres, and poster. The popup also displays the average rating of the movie, and allows the user to review the movie. And allows the user to view other reviews.

### Sorting and filtering

The movies page allows the user to sort the movies by release year, rating, popularity, and title. The user can also filter the movies by genre. The sorting and filtering is performed on the entire database, and not just the movies that are currently loaded on the client.

### User generated data

The movies page allows the user to review movies. The user can also view other users' reviews. The reviews are stored in the database, and are persistent.

Upon registration, the user is assigned a username, email and password. The username is stored in the database, and is persistent.

### Accessibility

This is explained in detail in the [accessibility section](client.md#accessibility-wcag-22-compliance) of the client documentation.

### Sustainability

This is explained in detail in the [sustainability section](server.md#sustainability) of the server documentation.

### Design

The design of the application is based on the [Material Design](https://material.io/design) guidelines. The application uses the [Material UI](https://material-ui.com/) library to implement the design.

### Database and backend hosting

The database and backend are hosted on the group's virtual machine. The backend servers the client application, and the database is hosted on the same machine.

## Technology

### React, Typescript and Vite

The project is built with React, Typescript and Vite. The project was bootstrapped with the [Vite](https://vitejs.dev/) framework. The backend is also written in Typescript.

### State management - Redux

The client uses Redux for state management. The Redux store is used to store the movies and reviews. The store is updated by dispatching actions to reducers. The reducers are pure functions that take the current state and an action as arguments, and return a new state. The reducers are combined into a single reducer using the `combineReducers` function. The store is created using the `createStore` function, and the combined reducer is passed as an argument. The store is passed to the `Provider` component, which makes the store available to all components.

### State management - Apollo client

The client uses Apollo client for state management. The Apollo client cache is used to store the movies and reviews. The cache is updated by dispatching mutations to the cache. The cache is created using the `InMemoryCache` class. The cache is passed to the `ApolloClient` class, which creates the client. The client is passed to the `ApolloProvider` component, which makes the client available to all components.

### GraphQL backend

The backend implements a GraphQL server. The server is implemented using the [Apollo Server](https://www.apollographql.com/docs/apollo-server/) library.

### Use of components and libraries

The projectet uses diverse libraries and components to implement the functionality. The libraries and components can be found as dependencies in the package.json files.

[Server package.json](../server/package.json)

[Client package.json](../client/package.json)

## Testing, development and quality assurance

### Linting and Prettier

The project uses ESLint for linting and Prettier for code formatting. Both ESLint and Prettier have their repspective configuration files. A guide to lint checking can be found at the root [README](../README.md#linting-and-formatting).

### Testing - Components

Components are tested using [Vitest](https://vitest.dev/). The tests are located in the same folder as the component they test, and have the same name as the component, but with the `.test.tsx` extension.

### Testing - End-2-end

End-2-end testing is done using [Cypress](https://www.cypress.io/). The tests are located in the `/client/cypress/integration` folder. The tests are split into multiple files, each testing a specific core feature of the application.

### Testing - API

We employ [Vitest](https://vitest.dev/) to rigorously test our API. The test suite is housed in the `/client/src/queries` folder. Our focus is on thoroughly testing the queries and mutations integral to the application, prioritizing the critical aspects of the API functionality.

### Documentation

The project is documented with a README.md in the root folder as well as in depth files in the Doc folder. The documentation discusses, explains and refers to all the most important choices and solutions the group makes (including the choice of components and api).

### Code readability and structure

The code is well structured and commented. The code is easy to read and understand. The code is structured in a way that makes it easy to find the relevant code for a given component or feature.

### Reproducibility

The project is documented and easy to install and run for others. A guide to installation and usage can be found in the root [README](../README.md#local-installation-and-usage).
