"use strict";

const express = require("express");
const router = express.Router();
const Traslado = require("../models/trasladoModel");

router.post("/RegistrarTraslado", (req, res) => {
  let body = req.body;
  let nuevoTraslado = new Traslado({
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

module.exports = router;
