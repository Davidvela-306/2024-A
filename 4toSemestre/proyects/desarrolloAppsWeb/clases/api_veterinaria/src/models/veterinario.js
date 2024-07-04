import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

//usando mongoose:
//modelo con esquema correspondiente
const veterinarioSchema = new Schema(
  {
    nombre: {
      type: String, //tipo de dato
      require: true, //es requerido
      trim: true, //eliminar espacios en blanco
    },
    apellido: {
      type: String,
      require: true,
      trim: true,
    },
    direccion: {
      type: String,
      trim: true,
      default: null, //por defecto null
    },
    telefono: {
      type: Number,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true, //debe ser un email único, no se repite
    },
    password: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
      default: null,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    // indica que el ORM debe automáticamente agregar campos de marca de tiempo a cada documento (o fila) en la base de datos asociada con este modelo.
    timestamps: true,
  }
);

// Método para cifrar el password del veterinario
veterinarioSchema.methods.encrypPassword = async function (password) {
  const salt = await bcrypt.genSalt(10); //genera una salt con un factor de costo de 10. es un valor aleatorio que se utiliza para mejorar la seguridad del cifrado.
  const passwordEncryp = await bcrypt.hash(password, salt); // cifrar la password combinándola con la salt generada.
  return passwordEncryp;
};

// Método para verificar si el password ingresado es el mismo de la BDD
//comparar la contraseña ingresada (password) con la contraseña cifrada almacenada (this.password)
veterinarioSchema.methods.matchPassword = async function (password) {
  const response = await bcrypt.compare(password, this.password);
  return response;
};

// Método para crear un token
//Math.random() genera un número aleatorio, .toString(36) lo convierte en una cadena de caracteres utilizando una base de 36 (dígitos 0-9 y letras a-z).
// slice(2) elimina los dos primeros caracteres de la cadena generada (que son "0."), dejando solo la parte aleatoria.
veterinarioSchema.methods.crearToken = function () {
  // Asigna el token generado a this.token :
  const tokenGenerado = (this.token = Math.random().toString(36).slice(2));
  return tokenGenerado;
};

export default model("Veterinario", veterinarioSchema);
