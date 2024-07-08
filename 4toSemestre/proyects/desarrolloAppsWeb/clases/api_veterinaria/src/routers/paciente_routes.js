import {Router} from 'express'
const router = Router()
import verificarAutenticacion from "../middlewares/autenticacion.js";
import {
    actualizarPaciente,
    detallePaciente,
    eliminarPaciente,
    listarPacientes,
    registrarPaciente,
    loginPaciente,
    perfilPaciente 
} from "../controllers/paciente_controller.js";


// router.post('/paciente/login',(req,res)=>res.send("Login del paciente"))
// router.get('/paciente/perfil',(req,res)=>res.send("Perfil del paciente"))
// router.get('/pacientes',(req,res)=>res.send("Listar pacientes"))
// router.get('/paciente/:id',(req,res)=>res.send("Detalle del paciente"))
// router.post('/paciente/registro',(req,res)=>res.send("Registrar paciente"))
// router.put('/paciente/actualizar/:id',(req,res)=>res.send("Actualizar paciente"))
// router.delete('/pacientes/eliminar/:id',(req,res)=>res.send("Eliminar paciente"))

router.post('/paciente/login',loginPaciente)
router.get('/paciente/perfil',verificarAutenticacion,perfilPaciente)
router.get("/pacientes",verificarAutenticacion,listarPacientes);
router.get("/paciente/:id",verificarAutenticacion, detallePaciente);
router.post("/paciente/registro", verificarAutenticacion,registrarPaciente);
router.put("/paciente/actualizar/:id", verificarAutenticacion,actualizarPaciente);
router.delete("/paciente/eliminar/:id", verificarAutenticacion,eliminarPaciente);

export default router