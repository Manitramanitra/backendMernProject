const UserModel = require("../models/user.models");
const jwt = require("jsonwebtoken");
const { signUpErros } = require("../error.utils");
const maxAge = 3 * 60 * 60 * 24 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  console.log(req.body);
  const { pseudo, email, password } = req.body;
  try {
    const user = await UserModel.create({ pseudo, email, password });
    res.status(201).send({ user: user._id });
  } catch (err) {
    // const errors = signUpErros(err)
    res.status(400).send(err.name);
  }
};

module.exports.signIn = async (req, res,next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    if(!user){
      res.status(400).send({message:"email or password incorrect"})
      next()
    }else{
      const token = createToken(user._id);
      res.cookie("jwt", token, { httpOnly: true, maxAge });
      res.status(200).json({ user: user._id });
    }
  } catch (err) {
    res.status(200).json(err);
  }
};

module.exports.logout = async (req, res) => {
    res.cookie('jwt','',{maxAge: 1});
    res.redirect('/')//il faut mettre ce redirection pour que ca marche
};
