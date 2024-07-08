import { Router } from "express";
const router = Router();

import {
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
} from "../controllers/veterinario_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

//Ruta para el registro
router.post("/registro", registro);

//Ruta para confirmar el email - en gmail o Outlook
router.get("/confirmar/:token", confirmEmail);
//Ruta para confirmar recuperar password:
router.post("/recuperar-password", recuperarPassword);
//Ruta para confirmar recuperar password con token - en gmail o Outlook: 
router.get("/recuperar-password/:token", comprobarTokenPasword);
//Ruta para crear password:
router.post("/nuevo-password/:token", nuevoPassword);

//Ruta para el login
router.post("/login", login);

//Ruta para ver el perfil
router.get("/perfil", verificarAutenticacion, perfil);
//Ruta para actualizar el perfil:
router.get("/veterinario/:id", verificarAutenticacion, detalleVeterinario);
//Ruta para confirmar listar veterinarios:
router.get("/veterinarios", listarVeterinarios);
//Ruta para Actualizar password:
router.put(
  "/veterinario/actualizarpassword",
  verificarAutenticacion,
  actualizarPassword
);

router.put("/veterinario/:id", verificarAutenticacion, actualizarPerfil);

export default router;
