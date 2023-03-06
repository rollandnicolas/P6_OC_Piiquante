const passwordSchema = require('../models/passwordCheck');

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Mot de passe ne remplit pas le minimum requis de sécurisation' });
    } else {
        next();
    }
};