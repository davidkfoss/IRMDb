[/nav](./Doc/navigation.md)
/root

# International Review Movie Database (IRMDb)

## Table of contents

- [Description](#description)
- [Visuals](#visuals)
- [Local installation and usage](#local-installation-and-usage)
- [Roadmap](#roadmap)
- [Accessibility and Sustainability](#accessibility-and-sustainability)
- [Linting and formatting](#linting-and-formatting)
- [Testing](#testing)
- [Authors and acknowledgment](#authors-and-acknowledgment)
- [Project status](#project-status)

## Description

IRMDb is a user-friendly application that helps you discover, review, and rate your favorite movies. With a comprehensive database of movies (**9000+ movies**) from various genres, you can easily search, filter, and sort through a vast collection.

### Main features

- Search for movies by title
- Filter movies by genres
- Sort movies by title, rating, and year
- Pagination, retrieving 12 movies at a time
- View movie details
- Add reviews to movies
- See reviews from other users on movies
- Landing page with popular and recent reviews
- Upvote reviews

## Visuals

<img src="./Doc/assets/Moviepage.png" width="800"/>

The movies page shows results for the filters you have selected

<img src="./Doc/assets/Detailed-moviepage.png" width="800"/>

When clicking on a movie, you can see more details about it and add a review

<img src="./Doc/assets/Feedpage.png" width="800"/>

The landing page shows popular and recent reviews

## Local installation and usage

The following instructions will guide you through the process of installing and running the application locally, however you can also access the application at [http://it2810-44.idi.ntnu.no/project2/](http://it2810-44.idi.ntnu.no/project2/) if connected to the NTNU network, either at site or through a VPN.

Clone the repository with

`git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-44/prosjekt-2.git`

Navigate to the [server](./server/) folder and create a .env.dev file containing the following:

```bash
  PORT=3001
  DB_PREFIX=mongodb+srv://
  DB_USERNAME=admin
  DB_PASSWORD=admin
  DB_CLUSTER=cluster0.mnvsrky.mongodb.net/?retryWrites=true&w=majority
```

The values here can be changed to your liking, but the .env file must be present for the server to run.

The provided mongoDB cluster is a free tier cluster, and may be slow to respond at times. The application ran in production mode will use a seperate database, which is hosted on a virtual machine at NTNU. This database is faster, but may be unavailable at times.

Then install all dependencies by running

`npm install`

and start the server by running

`npm run start-dev`

Navigate to [client](./client/) folder and install dependencies by running

`npm install`

and start the client by running

`npm run dev`

Open your web browser and navigate to [localhost:5173](http://localhost:5173) to access the application

## Roadmap

- Version 2.2
  - Backend (graphql, express, mongoDB)
  - New features
    - Add reviews to movies
    - See reviews from other users on movies
    - Landing page with popular and recent reviews
    - Upvote reviews
  - User experience
    - Increased responsiveness for all devices
    - Web accessibility
- Version 2.3 (**current**)
  - Testing
  - Documentation
  - Security improvements
  - Code quality improvements
  - Error handling improvements

We welcome any suggestions or feature requests from the community.

## Accessibility and Sustainability

### Accessibility (WCAG 2.2 compliance)

Accessibility is discussed in detail in [this](./client/README.md#accessibility-wcag-22-compliance) section of the client README.

### Sustainability

Sustainability is discussed in detail in [this](./server/README.md#sustainability) section of the server README.

In addition, we have a dark design theme that reduces the amount of light emitted by the screen, which is beneficial for the environment.

#### Improvements on Sustainability:

Because of the high load of images on the website, we could have used lazy loading to reduce the amount of data transferred between the client and server. This could have improved sustainability. The browser most often does cache images, but lazy loading would have been more efficient. A dedicated CDN could also have been used to further improve sustainability, however this is not applicable to a project of this size.

Since we do not host the images ourselves, we have no control over the image sizes. We could have used the aforementioned CDN to resize the images to the size we need, which would have reduced the amount of data transferred between the client and server, improving sustainability. An alternative is to use a dedicated image hosting service that provides images in the size and format we need, with a better compression algorithm. These alternatives are not really relevant to a project of this size, however it is worth noting.

## Linting and formatting

To lint the code, run the following command in the respective client and server folders:

`npm run lint`

To check the formatting of the code, run the following command:

`npm run check-format`

To format the code with prettier, run the following command:

`npm run format`

## Testing

To run the component tests, run the following command in the client folder:

`npm run test:component`

To run end-2-end tests with cypress, you must first start both the server and the client by following this [guide](#local-installation-and-usage). Then run the following command in the client folder:

`npm run cypress` to open the cypress test runner

or

`npm run test:e2e` to run the tests headlessly

To run the API tests, you must first start the `dev` server by following this [guide](#local-installation-and-usage). Then run the following command in the **client** folder:

`npm run test:api`

### What are we testing, why and how?

#### Component tests with Vitest

We are testing each component and page in isolation, to make sure that all components are working as expected and easily find bugs. We are using [Vitest](https://vitest.dev) to test the components. For responsive components that depend on the viewport size, we are testing the components in different viewport sizes.

We are mocking the applications state and props, to make sure that the tests are controlled and predictable. In addition, we are mocking all dispatches to the redux store, to make sure that we don't send any requests to the server.

#### End-2-end tests with Cypress

We are testing the application as a whole with [Cypress](https://www.cypress.io), to make sure that the application is working as expected. We are testing the application by running the most common user flows:

##### User flows

- [Authentication](./client/cypress/e2e/authentication.cy.ts)
  - We are testing that the user can register, login, and logout.
- [Exploring movies](./client/cypress/e2e/exploreMovies.cy.ts)
  - We are testing that the user can search, filter, and sort movies and that the results are as expected.
- [Reviewing movies](./client/cypress/e2e/reviewMovie.cy.ts)
  - We are testing that the user can add reviews to movies, and delete the reviews they have added.
- [Exploring reviews](./client/cypress/e2e/upvoteMovie.cy.ts)
  - We are testing that the user can see reviews on the landing page, and that the user can upvote reviews.

We are not testing the application in different viewport sizes, but testing with the default viewport size of 1000x660, as we emphasize the functionality of the application over the design in our end-2-end tests.

#### API testing

We are testing the API by testing the graphQL queries and mutations with Vitest and Apollo Client. We are running actual queries and mutations against the running server, to make sure that the API is working as expected.

The tests have some prerequisites, and will fail if the database is not in a certain state.
Prerequisites include:

- `Dev` server running
- At least 3 reviews in the database
- Certain reviews that the queries use must exist in the database

All of these prerequisites should be met by running the server in development mode since we have populated the database as needed.

#### No dedicated test database

We are not using a dedicated test database, but are instead using the development database. Here are some of the reasons why we chose to do this:

##### Realistic Testing Environment

Using the development database provides a more realistic testing environment. It mirrors the actual production setup more closely, including any potential issues that might arise in a live scenario. This ensures that the tests are more representative of how the application will behave in real-world conditions.

##### Database schema evolution

As the application evolves, so does the database schema. With a dedicated test database, keeping it in sync with the development and production databases can become challenging. Using the development database ensures that tests align with the latest schema changes automatically.

##### Avoiding redundant configuration

Maintaining a separate configuration for the test database introduces redundancy. By using the development database, developers can leverage the same database connection settings, reducing the chances of configuration mismatches between different environments.

## Authors and acknowledgment

Thor Sjursen

Christian Veiby

David Foss

## Project status

Under development
