const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
       const userId = decodedToken.userId;
       if (req.body.userId && req.body.userId !== userId) {
        //throw "invalid user ID";
        res.status(403).json({ message: "invalid user ID" });
      } else {
        next();
      }
   } catch(error) {
       res.status(401)
   }
};