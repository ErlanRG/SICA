"use strict";

const express = require("express");
const router = express.Router();
const Traslado = require("../models/trasladoModel");

router.post("/RegistrarTraslado", (req, res) => {
  let body = req.body;
  let nuevoTraslado = new Traslado({
    ActivoAfectado: body.ActivoAfectado,
    Solicitante: body.Solicitante,
    Estado: body.Estado,
    Razon: body.Razon,
    Imagen1: body.Imagen1,
    Imagen2: body.Imagen2,
  });

  nuevoTraslado
    .save()
    .then((trasladoDB) => {
      res.json({
        resultado: true,
        msj: "Registro realizado de manera correcta",
        trasladoDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo registrar el traslado.",
        err,
      });
    });
});

router.get("/ListarTraslados", (req, res) => {
  Traslado.find()
    .then((ListaTrasladosDB) => {
      res.json({
        resultado: true,
        msj: "Los datos se obtuvieron de manera correcta: ",
        ListaTrasladosDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo obtener la lista de traslados.",
        err,
      });
    });
});

router.put("/ActualizarEstadoTraslado", (req, res) => {
  let body = req.body;
  Traslado.updateOne(
    { ID_Traslado: body.ID_Traslado },
    { $set: { Estado: body.Estado } }
  )
    .then((trasladoDB) => {
      res.json({
        resultado: true,
        msj: "El estado del traslado se actualizó de manera correcta.",
        trasladoDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo actualizar el estado del traslado.",
        err,
      });
    });
});

module.exports = router;
