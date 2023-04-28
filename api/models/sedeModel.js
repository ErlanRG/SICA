"use strict";

const mongoose = require("mongoose")
const schemaSede = mongoose.Schema({
  ID_sede: { type: String, required: false, unique: true },
  Nombre: { type: String, required: true, unique: false },
  Descripcion: { type: String, required: true, unique: false },
  FechaCreacion: { type: Date, required: true, unique: false },
  FotoPerfil: { type: String, required: false, unique: false },
  Ubicacion: { type: String, required: true, unique: false },
})

schemaSede.pre("save", async function (next) {
  const doc = this
  if (!doc.ID_sede) {
    // Busca el valor mas alto en la lista de ID_activo en la DB
    const highest = await doc.constructor.findOne().sort("-ID_sede");
    let newId = "001";
    if (highest && highest.ID_sede) {
      // Incrementa el valor del ID_activo en 1
      const highestId = parseInt(highest.ID_sede, 10);
      newId = ("000" + (highestId + 1)).slice(-3);
    }
    doc.ID_sede = newId;
  }
  next();
});

module.exports = mongoose.model("Sede", schemaSede, "Sedes");
