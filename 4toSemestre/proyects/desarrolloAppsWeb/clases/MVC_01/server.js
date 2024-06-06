//* Servidor
//Importar modulos
import express from "express";
import routerTour from "./routes/tour_routes.js";
//inicialización
const app = express();
//variables
app.set("port", process.env.port || 3000);
//Middleware
app.use(express.json());

//rutas
app.get("/", (req, res) => res.send("Server ON"));

//? llamamos rutas de routes (1er parámetro para nombrar una API correctamente)
app.use('/api/v1',routerTour)

//Exportar variables
export default app;
