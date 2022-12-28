const express = require('express');
const mongoose = require('mongoose')

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

  mongoose
  .connect(
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.d4buf.mongodb.net:27017,cluster0-shard-00-01.d4buf.mongodb.net:27017,cluster0-shard-00-02.d4buf.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-8i7j0t-shard-0&authSource=admin&retryWrites=true&w=majority`
    //{ useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => {
    console.log(error);
  });
  
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
});

module.exports = app;