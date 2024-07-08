// Importar el módulo jsonwebtoken para manejar tokens JWT
import jwt from "jsonwebtoken";
// Importar el modelo Veterinario para interactuar con la BD
import Veterinario from "../models/Veterinario.js";
import Paciente from "../models/Paciente.js";

// Definir el middleware de autenticación
const verificarAutenticacion = async (req, res, next) => {
  // Verificar si existe el encabezado de autorización
  if (!req.headers.authorization)
    return res
      .status(404)
      .json({ msg: "Lo sentimos, debes proporcionar un token" });

  // Extraer el encabezado de autorización | verifica si existe un encabezado de autorización en la solicitud. Si no existe, devuelve un error 404 con un mensaje.
  const { authorization } = req.headers;

  try {
    // Verificar el token JWT | Del token verificado, se extraen id y rol
    const { id, rol } = jwt.verify(
      // Se espera que el token esté en formato "Bearer [token]", por lo que se divide la cadena y se toma el segundo elemento.
      authorization.split(" ")[1],
      // Se verifica el token usando la clave secreta almacenada en process.env.JWT_SECRET.
      process.env.JWT_SECRET
    );
    console.log(id, rol );
    if (rol === "veterinario") {
      //Se busca en la base de datos un veterinario con el ID extraído del token.
      // Se usa .lean() para obtener un objeto JavaScript plano y .select("-password") para excluir el campo de contraseña.
      // El resultado se almacena en req.veterinarioBDD.
      // Se llama a next() para pasar al siguiente middleware o ruta.
      req.veterinarioBDD = await Veterinario.findById(id)
        .lean()
        .select("-password");
      next();
    } else {
      req.pacienteBDD = await Paciente.findById(id).lean().select("-password");
      console.log(req.pacienteBDD);
      next();
    }
  } catch (error) {
    // Si ocurre un error durante la verificación del token:
    const e = new Error("Formato del token no válido");
    console.log(e);
    return res.status(404).json({ msg: e.message });
  }
};

export default verificarAutenticacion;
