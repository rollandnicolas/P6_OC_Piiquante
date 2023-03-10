const Sauce = require("../models/sauce");

module.exports = (req, res, next) => {
  try {
    const userId = req.body.userId;
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (
          (sauce.usersLiked.every((user) => user !== userId) && // si tous les usersLiked & usersDesliked ne contiennent pas l'userId
            sauce.usersDisliked.every((user) => user !== userId)) ||
          req.body.like === 0 // ou si le like est neutre
        ) {
          next();
        } else if (
          sauce.usersLiked.includes(userId) || // si l'userId est dans usersLiked
          sauce.usersDisliked.includes(userId) // si l'userId est dans usersDisliked
        ) {
          res.status(403).json({ message: "Vous ne pouvez pas liker ou disliker une même sauce plusieurs fois" });
        }
      })
      .catch((error) => console.log(error));
  } catch {
    return (error) => {
      console.log(error);
    };
  }
};