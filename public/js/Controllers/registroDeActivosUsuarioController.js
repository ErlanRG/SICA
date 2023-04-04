function validarRegistro(event) {
  event.preventDefault();

  const nombreActivo = document.querySelector(".nombreDeActivo");
  const ubicacionActivo = document.querySelector(".ubicacion");
  const idActivo = document.querySelector('input[name="idActivo"]');
  const sedeSeleccionada = document.querySelector("#seleccionarSede");
  const descripcionActivo = document.querySelector("#descripcionActivo");

  let errores = "";

  if (nombreActivo.value === "") {
    errores += "Debe ingresar el nombre del activo.\n";
    nombreActivo.placeholder = "Este campo es obligatorio";
    nombreActivo.style.borderColor = "red";
  } else {
    nombreActivo.style.borderColor = "";
  }

  if (ubicacionActivo.value === "") {
    errores += "Debe ingresar la ubicación del activo.\n";
    ubicacionActivo.placeholder = "Este campo es obligatorio";
    ubicacionActivo.style.borderColor = "red";
  } else {
    ubicacionActivo.style.borderColor = "";
  }

  if (idActivo.value === "") {
    errores += "Debe ingresar el ID del activo.\n";
    idActivo.placeholder = "Este campo es obligatorio";
    idActivo.style.borderColor = "red";
  } else if (!/^\d{6}$/.test(idActivo.value)) {
    errores += "El ID del activo debe contener 6 dígitos numéricos.\n";
    idActivo.style.borderColor = "red";
  } else {
    idActivo.style.borderColor = "";
  }

  if (sedeSeleccionada.value === "") {
    errores += "Debe seleccionar una sede.\n";
    sedeSeleccionada.style.borderColor = "red";
  } else {
    sedeSeleccionada.style.borderColor = "";
  }

  if (descripcionActivo.value === "") {
    errores += "Debe ingresar una descripción del activo.\n";
    descripcionActivo.placeholder = "Este campo es obligatorio";
    descripcionActivo.style.borderColor = "red";
  } else {
    descripcionActivo.style.borderColor = "";
  }

  if (errores !== "") {
    Swal.fire({
      icon: "error",
      title: "Error al registrar el activo",
      text: errores,
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Solicitud enviada exitosamente",
    });
    document.querySelector("#formularioRegistro").reset();
  }
}
