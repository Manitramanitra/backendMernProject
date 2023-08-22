const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.models");

module.exports.checkUser = (req, res, next) => {
  const token = req.body.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodeToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        console.log(decodeToken);
        let user = await UserModel.findById(decodeToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports.requireAuth = (req, res, next) => {
  const token = req.body.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.locals.user = null;
      } else {
        let user = await UserModel.findById(decodedToken.id);
        console.log(user)
        res.locals.user = user;
        next();
      }
    });
  } else {
    console.log("No token");
    res.locals.user = null;
  }
};

