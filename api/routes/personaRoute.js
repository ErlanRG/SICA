"use strict";

const express = require("express");
const router = express.Router();
const Persona = require("../models/personaModel");

//CRUD: CREATE READ UPDATE DELETE

router.post("/RegistrarPersona", (req, res) => {
  let body = req.body;
  let nuevaPersona = new Persona({
    TipoIdentificacion: body.TipoIdentificacion,
    Identificacion: body.Identificacion,
    Nombre: body.Nombre,
    Apellido1: body.Apellido1,
    Apellido2: body.Apellido2,
    Sexo: body.Sexo,
    Nacimiento: body.Nacimiento,
    Edad: body.Edad,
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

router.post("/RegistrarIntereses", (req, res) => {
  let body = req.body;
  let intereses = JSON.parse(body.Intereses);

  Persona.updateOne({ _id: body._id }, { $set: { InteresesPersonales: [] } })
    .then(() => {
      let promises = intereses.map((item) => {
        return Persona.updateOne(
          { _id: mi_id },
          {
            $push: {
              InteresesPersonales: {
                Intereses: item,
              },
            },
          }
        );
      });

      return Promise.all(promises);
    })
    .then(() => {
      res.json({
        resultado: true,
        msj: "Los intereses se actualizaron de manera correcta.",
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "Ocurrio un error inesperado y no se pudieron actualizar los intereses.",
        error: err,
      });
    });
});

router.post("/RegistrarTarjeta", (req, res) => {
  let body = req.body;
  Persona.updateOne(
    { _id: body._id },
    {
      $push: {
        Tarjetas: {
          Nombre: body.Nombre,
          Apellido: body.Apellido,
          NumeroTajeta: body.NumeroTajeta,
          CVV: body.CVV,
        },
      },
    }
  )
    .then((info) => {
      res.json({
        resultado: true,
        msj: "Tarjeta registrada correctamente",
        info,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo registrar la tarjeta.",
        err,
      });
    });
});

router.post("/EliminarTarjetaPersona", (req, res) => {
  let body = req.body;
  Persona.updateOne(
    { _id: body._idPersona },
    {
      $pull: {
        Tarjetas: { _id: body._idTarjeta },
      },
    }
  )
    .then((info) => {
      res.json({
        resultado: true,
        msj: "Tarjeta eliminada.",
        info,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pude eliminar la tarjeta",
        err,
      });
    });
});

module.exports = router;
