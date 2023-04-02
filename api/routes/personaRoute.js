"use strict";

const express = require("express");
const router = express.Router();
const Persona = require("../models/personaModel");

//CRUD: CREATE READ UPDATE DELETE

router.post("/RegistrarPersona", async (req, res) => {
  try {
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

    let personaDB = await nuevaPersona.save();
    res.json({
      resultado: true,
      msj: "Registro realizado de manera correcta ",
      personaDB,
    });
  } catch (error) {
    res.json({
      resultado: false,
      msj: "No se pudo registrar la persona, ocurrio el siguiente error: ",
      error,
    });
  }
});

router.get("/ListarPersonas", (req, res) => {
  Persona.find()
    .then((ListaPersonaDB) => {
      res.json({
        resultado: true,
        msj: "Registro realizado de manera correcta ",
        ListaPersonaDB,
      });
    })
    .catch((error) => {
      res.json({
        resultado: false,
        msj: "No se pudo registrar la persona, ocurrio el siguiente error: ",
        error,
      });
    });
});

router.get("/BuscarPersonaIdentificacion", async (req, res) => {
  try {
    let params = req.query;
    let personaDB = await Persona.findOne({
      Identificacion: params.Identificacion,
    });
    res.json({
      resultado: true,
      msj: "La persona se obtuvo de manera correcta ",
      personaDB,
    });
  } catch (err) {
    res.json({
      resultado: false,
      msj: "No se pudo obtener la persona",
      err,
    });
  }
});

// BuscarPersonasId
router.get("/BuscarPersonaId", async (req, res) => {
  try {
    let params = req.query;
    let personaDB = await Persona.findOne({ _id: params._id });
    res.json({
      resultado: true,
      msj: "Los datos se obtuvieron de manera correcta",
      personaDB,
    });
  } catch (err) {
    res.json({
      resultado: false,
      msj: "No se pudo obtner la persona",
      err,
    });
  }
});

// Buscar por email y password (Autenticar Usuario)
router.get("/AutenticarPersona", async (req, res) => {
  try {
    let params = req.query;
    let personaDB = await Persona.findOne({
      Email: params.Email,
      Password: params.Password,
    });

    // Lo mismo que null. Incluye también undefined
    if (!personaDB) {
      res.json({
        resultado: false,
        msj: "Usuario y/o contraseña incorrectos",
        personaDB,
      });
    } else if (Number(personaDB.Estado) == 0) {
      res.json({
        resultado: false,
        msj: "Usuario inactivo, por favor comuniquese con el administrador",
        personaDB,
      });
    } else {
      res.json({
        resultado: true,
        msj: "Los datos se obtuvieron de manera correcta",
        personaDB,
      });
    }
  } catch (err) {
    res.json({
      resultado: false,
      msj: "No se pudo obtener la persona",
      err,
    });
  }
});

router.put("/ModificarPersona", async (req, res) => {
  try {
    let body = req.body;
    let info = await Persona.updateOne(
      { _id: body._id },
      {
        $set: req.body,
        // $set:{
        //     Nombre: body.Nombre,
        //     Edad: body.Edad
        // }
      }
    );
    res.json({
      resultado: true,
      msj: "Los datos se actualizaron de manera correcta",
      info,
    });
  } catch (err) {
    res.json({
      resultado: false,
      msj: "Ocurrio un error y no se pudieron actualizar los datos.",
      err,
    });
  }
});

// EliminarPersona
router.delete("/EliminarPersona", async (req, res) => {
  try {
    let body = req.body;
    let result = await Persona.remove({ _id: body._id });

    res.json({
      resultado: true,
      msj: "Los datos se eliminaron de manera correcta",
      result,
    });
  } catch (err) {
    res.json({
      resultado: false,
      msj: "No se pudo eliminar los datos",
      err,
    });
  }
});

router.post("/InactivarPersona", (req, res) => {
  let body = req.body;
  Persona.updateOne(
    { _id: body._id },
    {
      $set: {
        Estado: 0,
      },
    },
    (err, info) => {
      if (err) {
        res.json({
          resultado: false,
          msj: "Ocurrio un error y no se pudieron actualizar los datos.",
          err,
        });
      } else {
        res.json({
          resultado: true,
          msj: "Los datos se actualizaron de manera correcta",
          info,
        });
      }
    }
  );
});

router.post("/RegistrarIntereses", (req, res) => {
  let body = req.body;
  let intereses = JSON.parse(body.Intereses);
  let mi_id = body._id;
  let error;

  Persona.updateOne(
    { _id: mi_id },
    {
      $set: {
        InteresesPersonales: [],
      },
    },
    (err) => {
      if (err) {
        error = err;
      }
    }
  );
  intereses.forEach((item) => {
    setTimeout(() => {
      Persona.updateOne(
        { _id: mi_id },
        {
          $push: {
            InteresesPersonales: {
              Intereses: item,
            },
          },
        },
        (err) => {
          if (err) {
            error = err;
          }
        }
      );
    }, 5000);
  });

  if (error) {
    res.json({
      resultado: false,
      msj: "Ocurrio un error inesperado y no se pudieron actualizar los intereses.",
      error,
    });
  } else {
    res.json({
      resultado: true,
      msj: "Los intereses se actualizaron de manera correcta.",
    });
  }
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
          NumeroTarjeta: body.NumeroTarjeta,
          CVV: body.CVV,
        },
      },
    },
    (err, info) => {
      if (err) {
        res.json({
          resultado: false,
          msj: "Ocurrio un error y no se pudo registrar la tarjeta",
          err,
        });
      } else {
        res.json({
          resultado: true,
          msj: "Tarjeta registrada de manera correcta",
          info,
        });
      }
    }
  );
});

router.post("/EliminarTarjetaPersona", (req, res) => {
  let body = req.body;
  Persona.updateOne(
    { _id: body._idPersona },
    {
      $pull: {
        Tarjetas: { _id: body._idTarjeta },
      },
    },
    (err, info) => {
      if (err) {
        res.json({
          resultado: false,
          msj: "No se pudo eliminar la tarjeta",
          err,
        });
      } else {
        res.json({
          resultado: true,
          msj: "Tarjeta eliminada de manera correcta",
          info,
        });
      }
    }
  );
});

module.exports = router;
