// Importaciones de módulos necesarios
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Configuración de dotenv para cargar variables de entorno
dotenv.config();

// Crear el Transporter para enviar correos
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: process.env.HOST_MAILTRAP,
  port: process.env.PORT_MAILTRAP,
  auth: {
    user: process.env.USER_MAILTRAP,
    pass: process.env.PASS_MAILTRAP,
  },
});

// Método para enviar el correo cuando el usuario se registre
const sendMailToUser = (userMail, token) => {
  // Configuración del correo a enviar
  let mailOptions = {
    from: process.env.USER_MAILTRAP,
    to: userMail,
    subject: "Verifica tu cuenta",
    html: `<p>Hola, haz clic <a href="${
      process.env.URL_BACKEND
    }confirmar/${encodeURIComponent(
      token
    )}">aquí</a> para confirmar tu cuenta.</p>`,
  };

  // Envío del correo
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
};

// Método para enviar el correo cuando el usuario quiere recuperar su cuenta:
const sendMailToRecoveryPassword = async (userMail, token) => {
  // Envío del correo de recuperación de contraseña
  let info = await transporter.sendMail({
    from: "admin@vet.com",
    to: userMail,
    subject: "Correo para reestablecer tu contraseña",
    html: `
    <h1>Sistema de gestión (VETERINARIO-ESFOT 🐶 😺)</h1>
    <hr>
    <a href=${process.env.URL_BACKEND}recuperar-password/${token}>Clic para reestablecer tu contraseña</a>
    <hr>
    <footer>Grandote te da la Bienvenida!</footer>
    `,
  });
  console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
};

// Exportación de las funciones para su uso en otros módulos
export { sendMailToUser, sendMailToRecoveryPassword };

// Exportación por defecto de la función sendMailToUser
export default sendMailToUser;
