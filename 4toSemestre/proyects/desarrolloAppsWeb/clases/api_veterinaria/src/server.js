// Requerir los módulos
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // para comunicar diferentes dominios back=vercel front=netlify
import routerVeterinarios from './routes/veterinario_routes.js'

// Inicializaciones
const app = express();
dotenv.config();

// Configuraciones
app.use(cors());

// Middlewares
app.use(express.json()); //procesa info en format json

// Variables globales
app.set("port", process.env.port || 3000);

// Rutas
// app.get("/", (req, res) => {
//   res.send("Server on");
// });

app.use('/api',routerVeterinarios)
// Manejo de una ruta que no sea encontrada
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Exportar la instancia de express por medio de app
export default app;
