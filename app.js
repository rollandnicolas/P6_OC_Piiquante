const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');
const bodyParser = require("body-parser");


mongoose
  .connect(
    `mongodb://newUser:4AUW0tXQXp0K4BDG@ac-wbxplib-shard-00-00.hxikddt.mongodb.net:27017,ac-wbxplib-shard-00-01.hxikddt.mongodb.net:27017,ac-wbxplib-shard-00-02.hxikddt.mongodb.net:27017/?ssl=true&replicaSet=atlas-d08daj-shard-0&authSource=admin&retryWrites=true&w=majority`
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => {
    console.log(error);
  });

const app = express();





app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


/* 
app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue, bravo !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});*/

// Parsing req
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);

module.exports = app;