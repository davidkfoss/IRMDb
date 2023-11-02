//Dependencies
import path from 'path';
import { graphqlHTTP } from 'express-graphql';
//  Server-dependencies
import express from 'express';
//  DB-dependencies
import mongoose from 'mongoose';
import cors from 'cors';

//Define constants

const app = express();
app.use(express.json());
app.use(cors());

import { config } from './config/config';
import { MongoURI } from './config/database';

//configure mongoose
mongoose.connect(MongoURI, {}).then(() => console.log('MongoDB connected...'));

//Headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//GraphQL
import { schema } from './schema/schema';
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

// Have Node serve the files for our built React app
app.use(express.static(path.join('../client', 'dist')));

// Handle all other GET-reqs
app.get('*', (req, res) => {
  res.sendFile(path.join('../client', 'dist', 'index.html'));
});

app.listen(config.PORT, () => {
  console.log(`Server listening on ${config.PORT}`);
});
