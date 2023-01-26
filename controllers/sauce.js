const Sauce = require("../models/sauce");
const fs = require("fs");


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};

//Création d'une sauce
exports.createSauce = (req, res, next) => {
    const objetSauce = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...objetSauce,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
    });
    sauce
      .save()
      .then(() => res.status(201).json({ message: "Sauce créée !" }))
  .catch((error) => res.status(400).json({ error }));
  };


  //Récupération d'une seule sauce
  exports.getSauceById = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error: error }))
};


//Effacer une sauce
exports.deleteSauceById = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1]; 
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id }) 
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};