"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

this.EnviarEmail = (pNombre, pCorreo, pPass) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let mailOptions = {
    from: process.env.MAIL_USER,
    to: pCorreo,
    subject: "Bienvenid@ a la aplicación.",
    html: `
        <body style="font-family: Arial, sans-serif; font-size: 16px;">
        <p style="color: #333; font-weight: bold;">Estimad@ ${pNombre},</p>
        <p style="color: #666;">Gracias por ingresar a SICA! Estamos emocionados de que seas parte de nuestra comunidad.</p>
        <p style="color: #666;">Nuestra aplicación esta hecha para hacerte la vida más sencilla, y estamos confiados de que sabrás utilizarla de la manera correcta.</p>
        <p style="color: #666;">Tu contraseña temporal es: ${pPass}. Te sugerimos que realices el cambio lo más pronto posible.</p>
        <p style="color: #666;">Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.</p>
        <p style="color: #666;">Una vez más, bienvenido a SICA!</p>
        <p style="color: #333; font-style: italic;">Atentamente,</p>
        <p style="color: #333; font-weight: bold;">The ProveGuard Team</p>
        </body>
        </html>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        "El correo se ha enviado de manera correcta. " + info.response
      );
    }
  });
};

module.exports = this;
