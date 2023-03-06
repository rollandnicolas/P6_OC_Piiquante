require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const path = require('path');

// express
const app = express();

//Security
const helmet = require("helmet");

// routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

// MongoDb
mongoose
  .connect(process.env.DB_MONGOPWD)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => {
    console.log(error);
  });

  app.use('/images', express.static(path.join(__dirname, 'images')));

// helmet
  app.use(helmet());

// CORS headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// parse request
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// settings routes
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;