"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(express.static(__dirname + "/public"));

// Enable cross-origin requests
app.use(cors());

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// Parses incoming request bodies in a URL-encoded format
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Accept-Version, Content-Lenght, Content-MDS, Content-Type, Date, X-Api-Version, X-Response-Time, XPINGOTHER, X-CSRF-Token, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexion con la base de datos establecida");
    const server = app.listen(process.env.PORT || 8000, () => {
      let port = server.address().port;
      console.log("Aplicacion corriendo en puerto: " + port);
    });
  })
  .catch((err) => {
    console.log("Error al conectarse con la DB", err);
    process.exit(1);
  });

function handleError(res, reason, message, code) {
  console.log("ERROR: ", reason);
  res.status(code || 500).json({ error: message });
}
