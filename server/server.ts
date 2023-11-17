/**
 * This file represents the server-side code for the application.
 * It sets up an Express server, connects to MongoDB, and defines routes for GraphQL and static files.
 */

import path from 'path';
import { graphqlHTTP } from 'express-graphql';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

/**
 * Express application instance.
 */
const app = express();
app.use(express.json());
app.use(cors());

/**
 * Load environment variables.
 */
import { config } from './config/config';
import { database } from './config/database';
console.log('Node environment: ' + config.NODE_ENV);

/**
 * Connect to MongoDB.
 */
mongoose.connect(database.MongoURI, {}).then(() => console.log('MongoDB connected...'));

/**
 * Define CORS.
 */
app.use((req, res, next) => {
  config.NODE_ENV === 'prod'
    ? res.header('Access-Control-Allow-Origin', 'http://it2810-44.idi.ntnu.no')
    : res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**
 * Define graphql.
 */
import { schema } from './schema/schema';
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

/**
 * Define and serve static files.
 */
app.use(express.static(path.join('../client', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join('../client', 'dist', 'index.html'));
});

/**
 * Start the server.
 */
app.listen(config.PORT, () => {
  console.log(`Server listening on ${config.PORT}`);
});
