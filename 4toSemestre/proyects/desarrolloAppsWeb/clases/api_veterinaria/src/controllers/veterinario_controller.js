import sendMailToUser, {
  sendMailToRecoveryPassword,
} from "../config/nodemailer.js";
import generarJWT from "../helpers/crearJWT.js";
import Veterinario from "../models/Veterinario.js";

import mongoose from "mongoose";

const login = async (req, res) => {
  //TODO :ACTIVIDAD 1 REQUEST => R
  const { email, password } = req.body;

  //TODO :ACTIVIDAD 2 VALIDACION => V
  // Validar campos vaíos
  if (Object.values(req.body).includes(""))
    return res
      .status(404)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });

  // Validar confirmación de la cuenta
  const veterinarioBDD = await Veterinario.findOne({ email });
  if (veterinarioBDD?.confirmEmail === false)
    return res
      .status(403)
      .json({ msg: "Lo sentimos, debes verificar tu cuenta" });

  // Validar el email
  if (!veterinarioBDD)
    return res.status(404).json({ msg: "Lo sentimos, el email no existe" });

  // Validar la contraseña
  const verificartPassword = await veterinarioBDD.matchPassword(password);

  if (!verificartPassword)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, el password no es el correcto" });

  //TODO: ACTIVIDAD 3 | BASE DE DATOS => B
  const token = generarJWT(veterinarioBDD._id, "veterinario");

  const { nombre, apellido, direccion, telefono, _id } = veterinarioBDD;

  //TODO: ACTIVIDAD 4  | RESPUESTA AL FRONTEND => F
  res.status(200).json({
    token,
    nombre,
    apellido,
    direccion,
    telefono,
    _id,
    email: veterinarioBDD.email,
  });
};

const perfil = (req, res) => {
  delete req.veterinarioBDD.token;
  delete req.veterinarioBDD.confirmEmail;
  delete req.veterinarioBDD.createdAt;
  delete req.veterinarioBDD.updatedAt;
  delete req.veterinarioBDD.__v;
  res.status(200).json(req.veterinarioBDD);
};

const registro = async (req, res) => {
  //TODO :ACTIVIDAD 1 REQUEST => R
  const { email, password } = req.body;

  //TODO :ACTIVIDAD 2 VALIDACION => V
  if (Object.values(req.body).includes(""))
    return res
      .status(400)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });

  const verificarEmailBDD = await Veterinario.findOne({ email });
  if (verificarEmailBDD)
    return res
      .status(400)
      .json({ msg: "Lo sentimos, el email ya se encuentra registrado" });

  //TODO: ACTIVIDAD 3 | BASE DE DATOS => B
  const nuevoVeterinario = new Veterinario(req.body);
  nuevoVeterinario.password = await nuevoVeterinario.encrypPassword(password);
  const token = nuevoVeterinario.crearToken();
  await sendMailToUser(email, token);
  await nuevoVeterinario.save();

  //TODO: ACTIVIDAD 4 | RESPUESTA AL FRONTEND => F
  res
    .status(200)
    .json({ mg: "Revisa tu correo electrónico para confirmar tu cuenta" });
};

const confirmEmail = async (req, res) => {
  //TODO :ACTIVIDAD 1 REQUEST => R - //TODO :ACTIVIDAD 2 VALIDACION => V
  if (!req.params.token)
    return res
      .status(400)
      .json({ msg: "Lo sentimos, no se puede validar la cuenta" });

  const veterinarioBDD = await Veterinario.findOne({ token: req.params.token });
  if (!veterinarioBDD?.token)
    return res.status(404).json({ msg: "La cuenta ya ha sido confirmada" });

  //TODO: ACTIVIDAD 3 | BASE DE DATOS => B
  veterinarioBDD.token = null;
  veterinarioBDD.confirmEmail = true;
  await veterinarioBDD.save();

  //TODO: ACTIVIDAD 4 | RESPUESTA AL FRONTEND => F
  res.status(200).json({ msg: "Token confirmado, ya puedes iniciar sesión" });
};

const listarVeterinarios = (req, res) => {
  res.status(200).json({ res: "lista de veterinarios registrados" });
};

const detalleVeterinario = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: `Lo sentimos, debe ser un id válido` });
  const veterinarioBDD = await Veterinario.findById(id).select("-password");
  if (!veterinarioBDD)
    return res
      .status(404)
      .json({ msg: `Lo sentimos, no existe el veterinario ${id}` });
  res.status(200).json({ msg: veterinarioBDD });
};

const actualizarPerfil = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: `Lo sentimos, debe ser un id válido` });
  if (Object.values(req.body).includes(""))
    return res
      .status(400)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });
  const veterinarioBDD = await Veterinario.findById(id);
  if (!veterinarioBDD)
    return res
      .status(404)
      .json({ msg: `Lo sentimos, no existe el veterinario ${id}` });
  if (veterinarioBDD.email != req.body.email) {
    const veterinarioBDDMail = await Veterinario.findOne({
      email: req.body.email,
    });
    if (veterinarioBDDMail) {
      return res
        .status(404)
        .json({ msg: `Lo sentimos, el existe ya se encuentra registrado` });
    }
  }
  veterinarioBDD.nombre = req.body.nombre || veterinarioBDD?.nombre;
  veterinarioBDD.apellido = req.body.apellido || veterinarioBDD?.apellido;
  veterinarioBDD.direccion = req.body.direccion || veterinarioBDD?.direccion;
  veterinarioBDD.telefono = req.body.telefono || veterinarioBDD?.telefono;
  veterinarioBDD.email = req.body.email || veterinarioBDD?.email;
  await veterinarioBDD.save();
  res.status(200).json({ msg: "Perfil actualizado correctamente" });
};

const actualizarPassword = async (req, res) => {
  const veterinarioBDD = await Veterinario.findById(req.veterinarioBDD._id);
  if (!veterinarioBDD)
    return res
      .status(404)
      .json({ msg: `Lo sentimos, no existe el veterinario ${id}` });
  const verificarPassword = await veterinarioBDD.matchPassword(
    req.body.passwordactual
  );
  if (!verificarPassword)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, el password actual no es el correcto" });
  veterinarioBDD.password = await veterinarioBDD.encrypPassword(
    req.body.passwordnuevo
  );
  await veterinarioBDD.save();
  res.status(200).json({ msg: "Password actualizado correctamente" });
};

const recuperarPassword = async (req, res) => {
  //TODO :ACTIVIDAD 1 REQUEST => R
  const { email } = req.body;

  //TODO :ACTIVIDAD 2 VALIDACION => V
  if (Object.values(req.body).includes(""))
    return res
      .status(404)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });

  const veterinarioBDD = await Veterinario.findOne({ email });
  if (!veterinarioBDD)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, el usuario no se encuentra registrado" });

  //TODO: ACTIVIDAD 3 | BASE DE DATOS => B

  const token = veterinarioBDD.crearToken();
  veterinarioBDD.token = token;
  await sendMailToRecoveryPassword(email, token);
  await veterinarioBDD.save();

  //TODO: ACTIVIDAD 4 | RESPUESTA AL FRONTEND => F
  res
    .status(200)
    .json({ msg: "Revisa tu correo electrónico para reestablecer tu cuenta" });
};

const comprobarTokenPasword = async (req, res) => {
  //TODO:ACTIVIDAD 1 y 2
  if (!req.params.token)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, no se puede validar la cuenta" });

  const veterinarioBDD = await Veterinario.findOne({ token: req.params.token });
  if (veterinarioBDD?.token !== req.params.token)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, no se puede validar la cuenta" });

  //TODO: ACTIVIDAD 3 | BASE DE DATOS => B

  await veterinarioBDD.save();

  //TODO: ACTIVIDAD 4 | RESPUESTA AL FRONTEND => F
  res
    .status(200)
    .json({ msg: "Token confirmado, ya puedes crear tu nuevo password" });
};

const nuevoPassword = async (req, res) => {
  //TODO :ACTIVIDAD 1 REQUEST => R
  const { password, confirmpassword } = req.body;

  //TODO :ACTIVIDAD 2 VALIDACION => V
  if (Object.values(req.body).includes(""))
    return res
      .status(404)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });

  if (password != confirmpassword)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, los passwords no coinciden" });

  const veterinarioBDD = await Veterinario.findOne({ token: req.params.token });
  if (veterinarioBDD?.token !== req.params.token)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, no se puede validar la cuenta" });

  //TODO: ACTIVIDAD 3 | BASE DE DATOS => B

  veterinarioBDD.token = null;
  veterinarioBDD.password = await veterinarioBDD.encrypPassword(password);
  await veterinarioBDD.save();

  //TODO: ACTIVIDAD 4 | RESPUESTA AL FRONTEND => F
  res.status(200).json({
    msg: "Felicitaciones, ya puedes iniciar sesión con tu nuevo password",
  });
};

const actualizarEmail = async (req, res) => {
  //TODO :ACTIVIDAD 1 REQUEST => R
  const { email } = req.body;

  //TODO :ACTIVIDAD 2 VALIDACION => V
  if (Object.values(req.body).includes(""))
    return res
      .status(404)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });
  const verifyEmailUser = Veterinario.findOne({ email });
  if (verifyEmailUser?.email)
    return res
      .status(409)
      .json({ msg: "Lo sentimos,el email ya se encuentra registrado" });

  //TODO: ACTIVIDAD 3 | BASE DE DATOS => B

  const newVeterinarioBDD = await Veterinario.findOne(req.veterinarioBDD._id);
  newVeterinarioBDD.email = email;
  await newVeterinarioBDD.save();

  //TODO: ACTIVIDAD 4 | RESPUESTA AL FRONTEND => F
  res.status(200).json({
    msg: "Felicitaciones, ya puedes iniciar sesión con tu nuevo email",
  });
};

export {
  login,
  perfil,
  registro,
  confirmEmail,
  listarVeterinarios,
  detalleVeterinario,
  actualizarPerfil,
  actualizarPassword,
  recuperarPassword,
  comprobarTokenPasword,
  nuevoPassword,
  actualizarEmail,
};
