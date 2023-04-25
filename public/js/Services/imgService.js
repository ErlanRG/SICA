"use strict";

let imagen;

let widget_cloudinary = cloudinary.createUploadWidget(
  {
    cloudName: "dihfbdk8d",
    uploadPreset: "ml_default",
    sources: ["local"],
  },
  (err, result) => {
    if (!err && result && result.event === "success") {
      console.log("Imagen subida con exito", result.info);
      imagen.src = result.info.secure_url;
    }
  }
);

function AbrirCloudinary(pIdInputImagen) {
  imagen = document.getElementById(pIdInputImagen);
  widget_cloudinary.open();
}
