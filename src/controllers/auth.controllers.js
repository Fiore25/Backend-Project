import User from "../models/user.js";

export const renderSignUpForm = (req, res) => res.render("auth/signup");

export const signup = async (req, res) => {
  let errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    errors.push({ text: "Las contraseñas ingresadas no coinciden." });
  }

  if (password.length < 8) {
    errors.push({ text: "La contraseña debe tener un mínimo de 8 caracteres." });
  }

  if (errors.length > 0) {
    return res.render("auth/signup", {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  }

  // Buscar coincidencias en el Email
  const userFound = await User.findOne({ email: email });
  if (userFound) {
    req.flash("error_msg", "Este email ya está siendo utilizado.");
    return res.redirect("/auth/signup");
  }

  // Crear usuario y guardarlo
  const newUser = new User({ name, email, password });
  newUser.password = await newUser.encryptPassword(password);
  await newUser.save();
  req.flash("success_msg", "Registro Exitoso.");
  res.redirect("/auth/signin");
};

export const renderSigninForm = (req, res) => res.render("auth/signin");

export const logout = async (req, res, next) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "Sesión Cerrada.");
    res.redirect("/auth/signin");
  });
};