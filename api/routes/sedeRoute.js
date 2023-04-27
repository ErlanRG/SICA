"use strict";

const express = require("express");
const router = express.Router();
const Sede = require("../models/sedeModel");

router.post("/RegistrarSede", (req, res) => {
  let body = req.body;
  let nuevaSede = new Sede({
    ID_sede: body.ID_sede,
    Nombre: body.Nombre,
    Descripcion: body.Descripcion,
    FechaCreacion: body.FechaCreacion,
    FotoPerfil: body.FotoPerfil,
    Ubicacion: body.Ubicacion,
    CodigoUbic: body.CodigoUbic,
  });

  nuevaSede
    .save()
    .then((sedeDB) => {
      res.json({
        resultado: true,
        msj: "Registro realizado de manera correcta",
        sedeDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo registrar la sede.",
        err,
      });
    });
});

router.get("/ListarSedes", (req, res) => {
  Sede.find()
    .then((ListaSedesDB) => {
      res.json({
        resultado: true,
        msj: "Los datos se obtuvieron de manera correcta: ",
        ListaSedesDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo obtener la lista de sedes.",
        err,
      });
    });
});


router.get("/BuscarSedeID", (req, res) => {
  let params = req.query;
  Sede.findOne({ ID_sede: params.ID_sede })
    .then((sedeDB) => {
      res.json({
        resultado: true,
        msj: "Sede encontrada",
        sedeDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se encontró una sede con ese ID",
        err,
      });
    });
});

router.put("/ModificarSede", (req, res) => {
  let body = req.body;
  Sede.updateOne({ ID_sede: body.ID_sede }, { $set: req.body })
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

router.delete("/EliminarSede", (req, res) => {
  let body = req.body;
  Sede.deleteOne({ ID_sede: body.ID_sede})
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

module.exports = router;
