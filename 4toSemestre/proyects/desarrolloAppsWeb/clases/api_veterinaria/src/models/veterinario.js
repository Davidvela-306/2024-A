import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

//usando mongoose:
//modelo con esquema correspondiente
const veterinarioSchema = new Schema(
    // data uno de los ingredientes
  {
    nombre: {
      type: String,  //tipo de dato
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

// Método para cifrar-encriptar el password del veterinario
veterinarioSchema.methods.encrypPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const passwordEncryp = await bcrypt.hash(password, salt);
  return passwordEncryp;
};

// Método para verificar si el password ingresado es el mismo de la BDD
veterinarioSchema.methods.matchPassword = async function (password) {
  const response = await bcrypt.compare(password, this.password);
  return response;
};

// Método para crear un token convertir esquema en modelo
veterinarioSchema.methods.crearToken = function () {
  const tokenGenerado = (this.token = Math.random().toString(36).slice(2));
  return tokenGenerado;
};

export default model("Veterinario", veterinarioSchema); //(pastel, ingredientes)


