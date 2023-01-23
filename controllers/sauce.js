const Sauce = require("../models/sauce");



exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};

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

  exports.getSauceById = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error: error }))
};
