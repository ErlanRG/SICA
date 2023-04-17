"use strict";

const mongoose = require("mongoose");
const schemaActivo = mongoose.Schema({
  ID_activo: { type: String, required: true, unique: true },
  Nombre: { type: String, required: true, unique: false },
  Descripcion: { type: String, required: true, unique: false },
  Unidad: { type: String, required: false, unique: false },
  Ubicacion: { type: String, required: true, unique: false },
  CodigoUbic: { type: String, required: true, unique: false },
});

module.exports = mongoose.model("Activo", schemaActivo, "Activos");

// TODO: utilizar pre-save middleware para generar los ID de los activos
