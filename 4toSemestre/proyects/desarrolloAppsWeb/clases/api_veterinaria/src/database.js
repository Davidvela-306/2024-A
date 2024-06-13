// Importar monoose
import mongoose from "mongoose";

//Establecer una regla - true (asegurarme de que el front mande todos los campos requeridos por la bd )
mongoose.set("strictQuery", true);

// crear el método de conexion
const connection = async () => {
    try {
        // Invocar método de conexion
        const {connection} = await mongoose.connect(process.env.MONGODB_URI_LOCAL)
        // Mostrar en consola la conexión ok
        console.log(`Database is connected on ${connection.host} - ${connection.port}`)
        } catch (error) {
        // Mostrar en consola el error, si existe
        console.log(error);
    }
};

// Exportar el método de conexión
export default connection;
