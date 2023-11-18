[/nav](navigation.md) /client

# Client documentation

Welcome to the IRMDb client-side documentation. This README provides an in-depth look at the technical aspects and choices made in the client portion of our app. It will discuss and explain key decisions regarding:

- [Folder structure](#folder-structure)
- [State management with Redux](#state-management-with-redux)
- [Data retrieval with Apollo client](#data-retrieval-with-apollo-client)
- [UI components and libraries](#ui-components-and-libraries)
- [Error handling with toast notifications](#error-handling-with-toast-notifications)
- [Accessibility (WCAG 2.2 compliance)](#accessibility-wcag-22-compliance)
- [User Authentication](#user-authentication)

## Starting the client

Navigate to the _client_ folder and run `npm install` to install dependencies. Then run `npm run dev` to start the client.

## Folder Structure

A general overview of the folder structure is provided below:

[**Components**](./src/components/)
: Contains all the components used in the application. Each component is placed in its own folder, which contains the component's TypeScript file, CSS file, and any other files required by the component.

[**Pages**](./src/pages/)
: Contains the pages used in the application. Each page is placed in its own folder, which contains the page's TypeScript file, CSS file, and any other files required by the page.

[**Store**](./src/store/)
: Contains the Redux store, reducers, and thunks for [movies](./src/store/features/movies/) and [reviews](./src/store/features/reviews/).

[**Queries**](./src/queries/)
: Contains all the GraphQL queries used in the application.

[**Models**](./src/models/)
: Contains the TypeScript interfaces for the [Movie](./src/models/movie.ts), [Review](./src/models/review.ts) and [User](./src/models/user.ts) objects.

## State Management with Redux

We use Redux for state management within the client. Here's why:

**Centralized state**: Redux provides a centralized state store, making it easier to manage and share data across components.

**Predictable State Updates**: Redux enforces a predictable and structured way to update the state through actions and reducers. This ensures that changes to the application's state are traceable and maintainable, reducing the risk of unexpected behavior.

**Async Operations with Thunks**: _Redux Thunks middleware_ is used to manage asynchronous operations. We fetch data from the server, post reviews, and perform other data-related operations using Thunks. This ensures a smooth user experience.

**DevTools**: Redux comes with developer tools that help us inspect the state and status on dispatched actions in real-time. This feature is invaluable during development and debugging, allowing us to identify and resolve issues efficiently.

## Data Retrieval with Apollo client

To interact with our server and send GraphQL queries, we use Apollo Client. Here's why:

**GraphQL Flexibility**: Apollo Client allows us to work with GraphQL, providing flexibility in data retrieval. It enables the frontend to request precisely the data it needs, optimizing data transfer.

**Query Handling**: We send all our queries from Redux store thunks, ensuring that the client application remains the single source of truth for our data. This approach simplifies the process of aggregating data from different sources.

**Cache Management**: Apollo Client provides a cache for storing data, allowing us to access data without making additional requests to the server. This improves performance and reduces the amount of data transferred between the client and server, which is crucial for sustainability.

## UI Components and Libraries

We utilize **Material-UI**, a component library, for many of our UI components and icons. Material-UI offers pre-designed, highly customizable components. This choice provides several advantages:

**Consistency**: Material-UI ensures a consistent and visually appealing user interface throughout the app.

While Material-UI covers most of our UI needs, some components required unique behaviors or designs, such as our [MovieCard](./src/components/movieCard/MovieCard.tsx), which was created manually. This approach allows us to tailor specific UI elements to our application's requirements.

### Error Handling with Toast Notifications

We use the **toast** library for notifying users about errors and success. Toast notifications are displayed to the user in a non-intrusive manner, providing information about the outcome of their actions. This approach improves the user experience by keeping them informed without disrupting their flow.

## Accessibility (WCAG 2.2 Compliance)

We have ensured that the web application adheres to the Web Content Accessibility Guidelines (WCAG) 2.2, focusing on various aspects to make the application more accessible. Here are some of the key accessibility considerations:

**Keystroke Navigation**: We've enabled tab-based navigation as well as replicating a mouse click with the enter key. This allows keyboard users to navigate the application without a mouse.

**Focus Management**: When an element gains focus, we provide clear visual feedback through styling changes. This ensures that keyboard and screen reader users can easily identify the currently focused element.

**Alternative Text for Images**: All images in the application are accompanied by descriptive alternative text (alt text).

**ARIA Roles and Attributes**: For custom components such as [MovieCard](./src/components/movieCard/MovieCard.tsx) and [MoviePopup](./src/components/moviePopup/MoviePopup.tsx), we have implemented descriptive ARIA roles and attributes to enhance semantic understanding. This ensures that screen readers can interpret and convey the purpose of these components to users.

**Using semantic HTML5 elements**: Semantic HTML tags such as `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`, `<article>` and `<aside>` are used to improve the semantic understanding of the application. This ensures that screen readers can interpret and convey the purpose of these elements to users, as well as providing a better structure for the application. We have also used `<label>` elements to associate labels with form elements, which is important for screen reader users.

**Color Contrast**: We have ensured that the color contrast between text and background meets the WCAG 2.2 AA or AAA standard. This ensures that users with low vision can easily read the text and separate ui components. We have also used a dark theme, which is beneficial for users with light sensitivity.

**Responsive Design**: We have ensured that the application is responsive and works well on all screen sizes. This helps users with low vision or other visual impairments to use the application, in addition to allow users to use the application on any device.

### Verification of WCAG 2.2 Compliance

To verify that the application is WCAG 2.2 compliant, we used [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/). The tool provides a detailed report of the accessibility issues in the application, which we have then addressed. Out of a score of 100, all the pages in the application scored above 95, with all but one scoring 100. To verify this yourself, you can run the Lighthouse audit in your chromium browser (Chrome, Brave, etc.) by opening the developer tools and navigating to the _Lighthouse_ tab. In addition to the issues reported by Lighthouse, we have also performed manual checks on important accessibility aspects such as keyboard navigation, focus management and other aspects.

## User authentication

We currently don't have secure user authentication. We use a simple system which serves as a placeholder for a more secure system in the future.

Our initial solution used Google OAuth, but since the server is hosted on http and not https, we are not able to use it anymore. We are currently looking into other solutions and have therefore not implemented secure principles such as password hashing and salting yet.
