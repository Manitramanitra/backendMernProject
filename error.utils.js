module.exports.signUpErros = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

  if (err.message.includes("password"))
    errors.password = "Mot de passe doit contenir 6 caractéres";

  if (err.message.includes("email")) {
    errors.email = "Email incorrect";
  }

  if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")){
    errors.message = 'Cet email est déjà pris'
  }

  if(err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")){
    errors.message = 'Cet pseudo est déjà pris'
  }
  return errors;
};
