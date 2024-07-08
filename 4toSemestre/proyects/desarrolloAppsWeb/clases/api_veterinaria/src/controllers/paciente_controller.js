import { sendMailToPaciente } from "../config/nodemailer.js";
import Paciente from "../models/Paciente.js";
import mongoose from "mongoose";

const loginPaciente = (req, res) => {
  //   res.send("Login del paciente");
};
const perfilPaciente = (req, res) => {
  //   res.send("Perfil del paciente");
};
const listarPacientes = async (req, res) => {
  //   res.send("Listar pacientes");

  //select() para limipiar y que no me muestre esos datos -salida -createdAt -updatedAt -__v
  //populate para no mostrar datos veterinario
  const pacientes = await Paciente.find({ estado: true })
    .where("veterinario")
    .equals(req.veterinarioBDD)
    .select("-salida -createdAt -updatedAt -__v  -password")
    .populate("veterinario", "_id nombre apellido");
  res.status(200).json(pacientes);
};
const detallePaciente = async (req, res) => {
  //   res.send("Detalle del paciente");
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ msg: `Lo sentimos, no existe el veterinario ${id}` });
  const paciente = await Paciente.findById(id)
    .select("-createdAt -updatedAt -__v")
    .populate("veterinario", "_id nombre apellido");
  res.status(200).json(paciente);
};
const registrarPaciente = async (req, res) => {
  //   res.send("Registrar paciente");
  //TODO ETAPA 1 | REQ
  const { email } = req.body;

  //TODO ETAPA 2 | VALIDACIONES
  if (Object.values(req.body).includes(""))
    return res
      .status(400)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });
  const verificarEmailBDD = await Paciente.findOne({ email });
  if (verificarEmailBDD)
    return res
      .status(400)
      .json({ msg: "Lo sentimos, el email ya se encuentra registrado" });

  //TODO ETAPA 3 | BDD
  const nuevoPaciente = new Paciente(req.body);
  const password = Math.random().toString(36).slice(2); //78521365253..
  nuevoPaciente.password = await nuevoPaciente.encrypPassword(password);
  await sendMailToPaciente(email, "vet" + password);
  nuevoPaciente.veterinario = req.veterinarioBDD._id;
  await nuevoPaciente.save();

  //TODO ETAPA 4 | FRONT
  res.status(200).json({ msg: "Registro exitoso del paciente." });
};

const actualizarPaciente = async (req, res) => {
  //   res.send("Actualizar paciente");
  const { id } = req.params;
  if (Object.values(req.body).includes(""))
    return res
      .status(400)
      .json({ msg: "Lo sentimos, debes llenar todos los campos" });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ msg: `Lo sentimos, no existe el veterinario ${id}` });
  await Paciente.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({ msg: "Actualización exitosa del paciente" });
};
const eliminarPaciente = (req, res) => {
  //   res.send("Eliminar paciente");
};

export {
  loginPaciente,
  perfilPaciente,
  listarPacientes,
  detallePaciente,
  registrarPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
