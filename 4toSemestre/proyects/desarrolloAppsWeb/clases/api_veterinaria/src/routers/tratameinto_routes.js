import { Router } from "express";
const router = Router();
import {
  actualizarTratamiento,
  detalleTratamiento,
  eliminarTratamiento,
} from "../controllers/tratamiento_controller.js";

router.post("/tratamiento/registro", (req, res) =>
  res.send("Registrar tratamientos")
);
// router.get("/tratamiento/:id", (req, res) =>
//   res.send("Detalle del tratamiento")
// );
// router.put("/tratamiento/:id", (req, res) =>
//   res.send("Actualizar tratamiento")
// );
// router.delete("/tratamiento/:id", (req, res) =>
//   res.send("Eliminar tratamiento")
// );

//simplificar si la ruta es igual pero los verbos http son diferentes:
router
  .route("/tratamiento/:id")
  .get(detalleTratamiento)
  .put(actualizarTratamiento)
  .delete(eliminarTratamiento);

router.post("/tratamiento/estado/:id", (req, res) =>
  res.send("Listar tratamientos")
);

export default router;
