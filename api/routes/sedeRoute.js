"use strict";

const express = require("express")
const router = express.Router()
const Sede = require("../models/sedeModel")

router.post("/RegistrarSede", (req, res) => {
  let body = req.body;
  let nuevaSede = new Sede({
    Nombre: body.Nombre,
    Descripcion: body.Descripcion,
    FechaCreacion: body.FechaCreacion,
    FotoPerfil: body.FotoPerfil,
    Ubicacion: body.Ubicacion,
  })

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
      })
    })
})

router.get("/ListarSedes", (req, res) => {
  Sede.find()
    .then((listaSedes) => {
      res.json({
        resultado: true,
        msj: "Los datos se obtuvieron de manera correcta: ",
        listaSedes,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo obtener la lista de sedes.",
        err,
      })
    })
})


router.get("/BuscarSedeID", (req, res) => {
  let params = req.query;
  Sede.findOne({ ID_sede: params.ID_sede })
    .then((sedeDB) => {
      res.json({
        resultado: true,
        msj: "Sede encontrada",
        sedeDB,
      })
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se encontró una sede con ese ID",
        err,
      })
    })
})


router.put("/ModificarSede", (req, res) => {
  let body = req.body
  Sede.updateOne({ _id: body._id }, { $set: req.body })
    .then((info) => {
      res.json({
        resultado: true,
        msj: "Los datos han sido actualizados",
        info,
      })
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudieron actualizar los datos.",
        err,
      })
    })
})

router.delete("/EliminarSede", (req, res) => {
  let body = req.body;
  Sede.deleteOne({ ID_sede: body.ID_sede})
    .then((result) => {
      res.json({
        resultado: true,
        msj: "La sede se eliminó de manera correcta",
        result,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo eliminar la sede.",
        err,
      });
    });
});

module.exports = router;
