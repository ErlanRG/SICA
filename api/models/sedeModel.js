"use strict";

const mongoose = require("mongoose");
const schemaSede = mongoose.Schema({
  ID_sede: { type: String, required: true, unique: true },
  Nombre: { type: String, required: true, unique: false },
  Descripcion: { type: String, required: true, unique: false },
  FechaCreacion: { type: String, required: true, unique: false },
  FotoPerfil: { type: String, required: false, unique: false },
  Ubicacion: { type: String, required: true, unique: false },
  CodigoUbic: { type: String, required: true, unique: false },
});

module.exports = mongoose.model("Sede", schemaSede, "Sedes");
