// Importar mogoose
import mongoose from "mongoose";
//Establecer una regla - true (asegurarme de que el front mande todos los campos requeridos por la bd )
mongoose.set("strictQuery", true);

// Crear el método de  conexión
const connection = async () => {
  try {
    // Invocar el método de conexión
    const { connection } = await mongoose.connect(
      process.env.MONGODB_URI_LOCAL
    );
    // Mostrando en consola la conexión OK
    console.log(
      `Database is connected on ${connection.host} - ${connection.port}`
    );
  } catch (error) {
    // Mostrando en consola la conexión ERROR
    console.log(error);
  }
};

// exportar el método de  conexión
export default connection;
