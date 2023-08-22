const UserModel = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const { signInErrors, signUpErrors } = require("../utils/error.utils");
const maxAge = 3 * 60 * 60 * 24 * 1000;

const createToken = async (id) => {
  return await jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).send({ user: user._id });
  } catch (err) {
    console.log(err);
    const errors = signUpErrors(err);
    res.status(400).send(errors);
  }
};

module.exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(200).send({ errors: "Email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(200).send({ errors: "Password do not match with the email" });
    }

    const token = await createToken(user._id);
    // res.cookie("jwt", token, { httpOnly: true, maxAge });
    res.status(200).json({ user: user._id ,token});

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: "Erreur de connexion" });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/"); //il faut mettre ce redirection pour que ca marche
};
