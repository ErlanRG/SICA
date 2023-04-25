"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

this.EnviarEmail = (pNombre, pCorreo, pNewPass) => {
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
    subject: "SICA - Recuperar contraseña.",
    html: `
        <body style="font-family: Arial, sans-serif; font-size: 16px;">
        <p style="color: #333; font-weight: bold;">Estimad@ ${pNombre},</p>
        <p style="color: #666;">A continuación, le brindamos la información necesaria para la recuperación de su contraseña.</p>
        <p style="color: #666;">Su contraseña temporal es: ${pNewPass}. Te sugerimos que realices el cambio lo más pronto posible.</p>
        <p style="color: #666;">Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.</p>
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
