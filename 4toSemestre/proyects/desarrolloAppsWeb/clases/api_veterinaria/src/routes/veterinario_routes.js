import {Router} from 'express'
const router = Router()

//Ruta para el registro
router.post('/registro',(req,res)=>res.send("registro"))
//Ruta para confirmar el email
router.get('/confirmar/:token',(req,res)=>res.send("confirmar email"))

//Ruta para confirmar recuperar password con token
router.get('/recuperar-password/:token',(req,res)=>res.send("verificar token"))
//Ruta para confirmar recuperar password
router.get('/recuperar-password',(req,res)=>res.send("enviar mail"))
//Ruta para crear password
router.post('/nuevo-password/:token',(req,res)=>res.send("crear password"))


//Ruta para el login
router.post('/login',(req,res)=>res.send("login"))


//Ruta para ver el perfil
router.get('/perfil',(req,res)=>res.send("perfil"))
//Ruta para actualizar el perfil
router.get('/veterinario/:id',(req,res)=>res.send("detalle del veterinario"))
//Ruta para confirmar listar veterinarios
router.get('/veterinarios',(req,res)=>res.send("lista de veterinarios"))
//Ruta para Actualizar password
router.put('/veterinario/actualizarpassword',(req,res)=>res.send("actualizar password"))




router.put('/veterinario/:id',(req,res)=>res.send("actualizar perfil"))


export default router