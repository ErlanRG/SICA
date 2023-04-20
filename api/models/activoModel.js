"use strict";

const mongoose = require("mongoose");
const schemaActivo = mongoose.Schema({
  ID_activo: { type: String, unique: true },
  Nombre: { type: String, required: true, unique: false },
  Descripcion: { type: String, required: true, unique: false },
  Unidad: { type: String, required: false, unique: false },
  Ubicacion: { type: String, required: true, unique: false },
  CodigoUbic: { type: String, required: true, unique: false },
  Usuario: { type: String, required: true, unique: false },
  FechaCreacion: { type: Date, required: true, unique: false },
  Estado: { type: Number, required: true, unique: false },
});

// Pre-save middleware (o funcion)  que genera automaticamente el ID_activo
// antes de ser guardada en MongoDB.
//
// @see https://mongoosejs.com/docs/middleware.html
// @see https://medium.com/@justinmanalad/pre-save-hooks-in-mongoose-js-cf1c0959dba2
// @see https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
schemaActivo.pre("save", async function (next) {
  const doc = this;
  if (!doc.ID_activo) {
    // Busca el valor mas alto en la lista de ID_activo en la DB
    const highest = await doc.constructor.findOne().sort("-ID_activo");
    let newId = "000001";
    if (highest && highest.ID_activo) {
      // Incrementa el valor del ID_activo en 1
      const highestId = parseInt(highest.ID_activo, 10);
      newId = ("000000" + (highestId + 1)).slice(-6);
    }
    doc.ID_activo = newId;
  }
  next();
});

module.exports = mongoose.model("Activo", schemaActivo, "Activos");
