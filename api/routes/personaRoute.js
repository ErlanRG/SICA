"use strict";

const express = require("express");
const router = express.Router();
const Persona = require("../models/personaModel");
const mailer = require("../templates/registroTemplate");
const passMailer = require("../templates/passTemplate");

//CRUD: CREATE READ UPDATE DELETE

router.post("/RegistrarPersona", (req, res) => {
  let body = req.body;
  let nuevaPersona = new Persona({
    TipoIdentificacion: body.TipoIdentificacion,
    Identificacion: body.Identificacion,
    Nombre: body.Nombre,
    Apellido1: body.Apellido1,
    Apellido2: body.Apellido2,
    Nacimiento: body.Nacimiento,
    Estado: 1,
    Email: body.Email,
    Password: body.Password,
    Rol: body.Rol,
    FotoPerfil: body.FotoPerfil,
  });

  nuevaPersona
    .save()
    .then((personaDB) => {
      res.json({
        resultado: true,
        msj: "Registro realizado de manera correcta",
        personaDB,
      });

      mailer.EnviarEmail(personaDB.Nombre, personaDB.Email, personaDB.Password);
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo registrar la persona.",
        err,
      });
    });
});

router.get("/ListarPersonas", (req, res) => {
  Persona.find()
    .then((ListaPersonasDB) => {
      res.json({
        resultado: true,
        msj: "Los datos se obtuvieron de manera correcta: ",
        ListaPersonasDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo obtener la lista de personas: ",
        err,
      });
    });
});

router.get("/BuscarPersonaIdentificacion", (req, res) => {
  let params = req.query;
  Persona.findOne({ Identificacion: params.Identificacion })
    .then((personaDB) => {
      res.json({
        resultado: true,
        msj: "Persona encontrada",
        personaDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se encontro una persona con ese numero de identificacion",
        err,
      });
    });
});

router.get("/BuscarPersonaEmail", (req, res) => {
  let params = req.query;
  Persona.findOne({ Email: params.Email })
    .then((personaDB) => {
      res.json({
        resultado: true,
        msj: "Persona encontrada",
        personaDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "El correo electronico no se encuentra regitrado.",
        err,
      });
    });
});

router.get("/BuscarPersonaId", (req, res) => {
  let params = req.query;
  Persona.findOne({ _id: params._id })
    .then((personaDB) => {
      res.json({
        resultado: true,
        msj: "Persona encontrada",
        personaDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se encontro una persona con ese id",
        err,
      });
    });
});

router.get("/AutenticarPersona", (req, res) => {
  let params = req.query;
  Persona.findOne({ Email: params.Email, Password: params.Password })
    .then((personaDB) => {
      if (!personaDB) {
        res.json({
          resultado: false,
          msj: "Usuario y/o contraseña incorrectos",
          personaDB,
        });
      } else if (Number(personaDB.Estado) == 0) {
        res.json({
          resultado: false,
          msj: "Usuario inactivo. Comuniquese con el administrador",
          personaDB,
        });
      } else {
        res.json({
          resultado: true,
          msj: "Usuario Autenticado",
          personaDB,
        });
      }
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "Usuario no se encuentra en la base de datos",
        err,
      });
    });
});

router.put("/ModificarPersona", (req, res) => {
  let body = req.body;
  Persona.updateOne({ _id: body._id }, { $set: req.body })
    .then((info) => {
      res.json({
        resultado: true,
        msj: "Los datos han sido actualizados",
        info,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudieron actualizar los datos.",
        err,
      });
    });
});

router.put("/RecuperarPass", (req, res) => {
  let body = req.body;
  Persona.updateOne({ _id: body._id }, { $set: { Password: body.Password } })
    .then((info) => {
      res.json({
        resultado: true,
        msj: "Los datos han sido actualizados",
        info,
      });
      passMailer.EnviarEmail(body.Nombre, body.Email, body.Password);
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudieron actualizar los datos.",
        err,
      });
    });
});

router.delete("/EliminarPersona", (req, res) => {
  let body = req.body;
  Persona.deleteOne({ _id: body._id })
    .then((result) => {
      res.json({
        resultado: true,
        msj: "Los datos se eliminaron de manera correcta",
        result,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudieron eliminar los datos.",
        err,
      });
    });
});

router.post("/InactivarPersona", (req, res) => {
  let body = req.body;
  Persona.updateOne({ _id: body._id }, { $set: { Estado: 0 } })
    .then((info) => {
      res.json({
        resultado: true,
        msj: "La persona ha sido desactivada",
        info,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo desactivar a la persona.",
        err,
      });
    });
});

module.exports = router;
