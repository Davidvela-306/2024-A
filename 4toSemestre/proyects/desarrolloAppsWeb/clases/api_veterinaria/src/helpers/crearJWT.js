// IMPORTAR JWT
import jwt from "jsonwebtoken";

// CREAR EL MÉTODO PARA FIRMAR (ID - ROL) Y GENERAR EL JWTTOKEN
const generarJWT = (id, rol) => {
  // parámetros que se pasan a jwt.sign:
  //   payload, clave secreta, opciones
  return jwt.sign({ id, rol }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// EXPORTAR LA FUNCIÓN
export default generarJWT;
