"use strict";

const express = require("express");
const router = express.Router();
const Activo = require("../models/activoModel");

router.post("/RegistrarActivo", (req, res) => {
  let body = req.body;
  let nuevoActivo = new Activo({
    Nombre: body.Nombre,
    Descripcion: body.Descripcion,
    Unidad: body.Unidad,
    Ubicacion: body.Ubicacion,
    CodigoUbic: body.CodigoUbic,
  });

  nuevoActivo
    .save()
    .then((activoDB) => {
      res.json({
        resultado: true,
        msj: "Registro realizado de manera correcta",
        activoDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo registrar el activo.",
        err,
      });
    });
});

router.get("/ListarActivos", (req, res) => {
  Activo.find()
    .then((ListaActivosDB) => {
      res.json({
        resultado: true,
        msj: "Los datos se obtuvieron de manera correcta: ",
        ListaActivosDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se pudo obtener la lista de activos.",
        err,
      });
    });
});

router.get("/BuscarActivosIdentificacion", (req, res) => {
  let params = req.query;
  Activo.findOne({ ID_activo: params.ID_activo })
    .then((activoDB) => {
      res.json({
        resultado: true,
        msj: "Activo encontrado",
        activoDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se encontro un activo con ese numero de ID",
        err,
      });
    });
});

router.get("/BuscarActivoID", (req, res) => {
  let params = req.query;
  Activo.findOne({ _id: params._id })
    .then((activoDB) => {
      res.json({
        resultado: true,
        msj: "Activo encontrado",
        activoDB,
      });
    })
    .catch((err) => {
      res.json({
        resultado: false,
        msj: "No se encontro un activo con ese ID",
        err,
      });
    });
});

router.put("/ModificarActivo", (req, res) => {
  let body = req.body;
  Activo.updateOne({ _id: body._id }, { $set: req.body })
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

router.delete("/EliminarActivo", (req, res) => {
  let body = req.body;
  Activo.deleteOne({ _id: body._id })
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
