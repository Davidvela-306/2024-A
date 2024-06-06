//* Routes
import { Router } from "express";
import { createTourController, getAllToursController, getTouryIdController } from "../controllers/tour_controller.js";
const router = Router()
//! ruta get
//? 1. Definir el path
//? 2. Invocar el método del controlador

router.get('/tours', getAllToursController) // (1. path, 2. controller)

//! ruta post
//? 1. Definir el path
//? 2. Invocar el método del controlador
router.post('/tours', createTourController)

//! ruta get pero routes paramets
//? 1. Definir el path
//? 2. Invocar el método del controlador
router.get('/tours/:id', getTouryIdController)

export default router