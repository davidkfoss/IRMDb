[/nav](../doc/navigation.md) /server

# Server documentation

Welcome to the IRMDb server-side documentation. This README provides an in-depth look at the technical aspects and choices made in the server portion of our app. It will discuss and explain key decisions regarding:

- [Folder structure](#folder-structure)
- [Express](#express)
- [MongoDB](#mongodb)
- [Security](#security)
- [Sustainability](#sustainability)
- [Database seeding](#database-seeding)
- [API documentation](#api-documentation)

## Starting the server

Navigate to the [server](.) folder and run `npm install` to install dependencies. Then run `npm start` to start the server.

## Folder Structure

A general overview of the folder structure is provided below.

[**models**](./models/): Contains the MongoDB models for [movies](./models/Movie.ts), [reviews](./models/Review.ts), and [users](./models/User.ts).

[**schema**](./schema/): Contains the [GraphQL schema](./schema/schema.ts) which consists of the types, queries and mutations for [movies](./schema/movie.ts), [reviews](./schema/review.ts), and [users](./schema/user.ts).

[**services**](./services/): Contains the services for [movies](./services/MovieService.ts), [reviews](./services/ReviewService.ts), and [users](./services/UserService.ts). These services handle the interaction with the MongoDB database and is used within the GraphQL resolvers.

[**util**](./util/): Contains utility functions for [validation](./util/validators.ts) of data upon mutation.

[**config**](./config/): Contains the configuration for the MongoDB database.

## Express

As the foundation of our server, Express.js simplifies routing and middleware management, ensuring the smooth handling of client requests.

## MongoDB

The server uses MongoDB as the database to store movies, reviews, and user data. Here's why we opted for MongoDB:

**Document-Oriented Storage**: MongoDB's document-oriented storage is well-suited for the data structure of movies, reviews, and user profiles. This NoSQL database allows us to store JSON-like data efficiently.

**Querying Flexibility**: MongoDB provides flexibility in querying and filtering data, which is one of the main features of the app. Filtering of movies is primarily done within the GraphQL resolver, where filtering options are taken as arguments, allowing us to efficiently tailor the results to the client's needs.

## Security

**Authentication**: Users are authenticated using hashed passwords. And the database stores the hashed password, not the plaintext password. This ensures that the user's password is not compromised if the database is breached.

**MongoDB Access**: The MongoDB link and profiles are not shared in a public repository. This ensures that the database is not compromised.

## Sustainability

**Efficient Data Retrival**: Our GraphQL resolvers handle data filtering and querying, ensuring that the client receives only the data it needs. This reduces the amount of data transferred between the client and server, improving sustainability.

**Pagination**: We use pagination to limit the number of results returned by queries. This reduces the amount of data transferred between the client and server, further improving sustainability.

**MongoDB Indexes**: We use MongoDB indexes to improve the performance of queries. Indexes allow MongoDB to retrieve data more efficiently, reducing the number of documents scanned and improving sustainability.

**Caching**: We use caching to reduce the number of requests to the server. Apollo Client provides a cache for storing data, which prevents duplicate requests to the server. This improves performance and reduces the amount of data transferred between the client and server, which is crucial for sustainability.

## Database Seeding

Wee downloaded [this](https://datasetsearch.research.google.com/search?src=3&query=movie%20dataset&docid=L2cvMTFydjVidnk4eA%3D%3D) dataset and used it to seed our database with movies. We created a script to parse the data to our wanted format, and uploaded the json file to our MongoDB database.

## API Documentation

To view documentation for the GraphQL API, start the server, navigate to the correct graphql playground and open the docs panel.

```
    :3001/graphql

    In production mode:
    http://it2810-44.idi.ntnu.no:3001/graphql

    In development mode:
    http://localhost:3001/graphql
```
