"use strict";

const mongoose = require("mongoose");
const schemaTraslado = mongoose.Schema({
  ID_Traslado: { type: String, unique: true },
  ActivoAfectado: { type: String, required: true, unique: false },
  Solicitante: { type: String, required: true, unique: false },
  Estado: { type: String, required: true, unique: false },
  Razon: { type: String, required: true, unique: false },
  Imagen1: { type: String, required: true, unique: false },
  Imagen2: { type: String, required: true, unique: false },
});

// Pre-save middleware (o funcion) que genera automaticamente el ID_Traslado
// antes de ser guardada en MongoDB. En esta version, se agrega "TRA" con prefijo
//
// @see https://mongoosejs.com/docs/middleware.html
// @see https://medium.com/@justinmanalad/pre-save-hooks-in-mongoose-js-cf1c0959dba2
// @see https://www.mongodb.com/docs/manual/reference/method/db.collection.findOne/
schemaTraslado.pre("save", async function (next) {
  const doc = this;
  if (!doc.ID_Traslado) {
    // Busca el valor mas alto en la lista de ID_Traslado en la DB
    const highest = await doc.constructor.findOne().sort("-ID_Traslado");
    let newId = "000001";
    if (highest && highest.ID_Traslado) {
      // Incrementa el valor del ID_Traslado en 1
      const highestId = parseInt(highest.ID_Traslado.slice(3), 10);
      newId = "TRA" + ("000000" + (highestId + 1)).slice(-6);
    } else {
      newId = "TRA" + newId;
    }
    doc.ID_Traslado = newId;
  }
  next();
});

module.exports = mongoose.model("Traslado", schemaTraslado, "Traslados");
