// Importaciones de módulos necesarios
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Configuración de dotenv para cargar variables de entorno
dotenv.config();

// Crear el Transporter
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

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Correo enviado: " + info.response);
    }
  });
};

// Método para enviar el correo cuando el usuario se quiere recuperar su cuenta
const sendMailToRecoveryPassword = async (userMail, token) => {
  let info = await transporter.sendMail({
    from: "admin@vet.com",
    to: userMail,
    subject: "Correo para reestablecer tu contraseña",
    html: `
  <h1>Sistema de gestión (VET-ESFOT 🐶 😺)</h1>
  <hr>
  <a href=${process.env.URL_BACKEND}recuperar-password/${token}>Clic para reestablecer tu contraseña</a>
  <hr>
  <footer>Grandote te da la Bienvenida!</footer>
  `,
  });
  console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
};

// send mail with defined transport object
const sendMailToPaciente = async (userMail, password) => {
  let info = await transporter.sendMail({
    from: "admin@vet.com",
    to: userMail,
    subject: "Correo de bienvenida",
    html: `
  <h1>Sistema de gestión (VET-ESFOT 🐶 😺)</h1>
  <hr>
  <p>Contraseña de acceso: ${password}</p>
  <a href=${process.env.URL_BACKEND}paciente/login>Clic para iniciar sesión</a>
  <hr>
  <footer>Grandote te da la Bienvenida!</footer>
  `,
  });
  console.log("Mensaje enviado satisfactoriamente: ", info.messageId);
};

export { sendMailToUser, sendMailToRecoveryPassword, sendMailToPaciente };

// Exportar el método
export default sendMailToUser;