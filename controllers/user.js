require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require('../models/User');

//création d'un nouveau user
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

//login d'un user existant
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) 
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: "Aucun compte ne correspond à l'adresse email renseignée !", 
          });
        }
        bcrypt
          .compare(req.body.password, user.password) 
          .then((valide) => {
            if (!valide) {
              return res
                .status(401)
                .json({ message: "Mot de passe incorrect !" });
            }
  
            const newToken = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "24h" }
            );
  
            res.status(200).json({ userId: user._id, token: newToken });
          })
  
          .catch((error) => res.status(401).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };

