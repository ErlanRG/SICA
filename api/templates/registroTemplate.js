"use strict";

const nodemailer = require("nodemailer");
require("dotenv").config();

this.EnviarEmail = (pNombre, pCorreo) => {
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
    html: `Test`,
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
