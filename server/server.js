//Dependencies
const path = require('path');
//  Server-dependencies
const express = require('express');
//  DB-dependencies
const mongoose = require('mongoose');

//Define constants

const app = express();
app.use(express.json());

const { PORT } = require('./config/config');
const { MongoURI } = require('./config/database');

//configure mongoose
mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'));

//Headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Have Node serve the files for our built React app
app.use(express.static(path.join(__dirname, '../client', 'dist')));

// Handle all other GET-reqs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
