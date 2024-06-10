import Router from "express";

import {
  createTourController,
  deleteTourController,
  getAllToursController,
  getTourByIdController,
  updateTourController,
} from "../controllers/tour_controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router();

//? Rutas publicas
router.get("/tours", getAllToursController);

//? Rutas publicas
router.get("/tours/:id", getTourByIdController);

//! Rutas privadas
router.post("/tours",  createTourController);

//! Rutas privadas
router.put("/tours/:id", verifyToken, updateTourController);

//! Rutas privadas
router.delete("/tours/:id", verifyToken, deleteTourController);


export default router;
