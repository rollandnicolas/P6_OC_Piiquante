const dotenv = require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const path = require('path');


// routes


const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');


// express
const app = express();


// MongoDb
mongoose
  .connect(
    `mongodb://newUser:4AUW0tXQXp0K4BDG@ac-wbxplib-shard-00-00.hxikddt.mongodb.net:27017,ac-wbxplib-shard-00-01.hxikddt.mongodb.net:27017,ac-wbxplib-shard-00-02.hxikddt.mongodb.net:27017/?ssl=true&replicaSet=atlas-d08daj-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => {
    console.log(error);
  });

  app.use('/images', express.static(path.join(__dirname, 'images')));

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