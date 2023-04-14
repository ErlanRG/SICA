function validarRegistro(event) {
  event.preventDefault();
  
  // Obtener los valores de los campos de entrada del formulario.
  const nombreActivo = document.querySelector("#txtNom").value;
  const ubicacionActivo = document.querySelector("#txtUbActivo").value;
  const idActivo = document.querySelector("#txtIdActivo").value;
  const sedeSeleccionada = document.querySelector("#txtIDType").value;
  const descripcionActivo = document.querySelector("#txtDescription").value;
  
  // Verificar que todos los campos estén completos.
  if (!sedeSeleccionada.trim()) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El campo Sede del Activo es requerido",
    });
    return;
    }
  
  if (!nombreActivo.trim()) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El campo Nombre del Activo es requerido",
  });
  return;
  }
  
  if (!ubicacionActivo.trim()) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El campo Ubicación del Activo es requerido",
  });
  return;
  }
  
  if (!idActivo.trim()) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El campo ID del Activo es requerido",
  });
  return;
  }
  
  if (!descripcionActivo.trim()) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El campo Descripción del Activo es requerido",
  });
  return;
  }
  
  // Validar que el campo ID del activo solo contenga números y tenga una longitud de 6 dígitos.
  const idActivoRegex = /^\d{6}$/;
  if (!idActivoRegex.test(idActivo)) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El ID del activo debe ser un número de 6 dígitos",
  });
  return;
  }
  // Validar que el campo ID del activo solo contenga números.
  const idActivoNumber = parseInt(idActivo, 10);
  if (isNaN(idActivoNumber)) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "El ID del activo solo puede contener números",
    });
    return;
  }
  // Enviar una solicitud POST al servidor utilizando la biblioteca axios para agregar un nuevo registro al sistema.
  axios
  .post("url_del_servidor/registro_de_activos", { 
    nombre: nombreActivo,
    ubicacion: ubicacionActivo,
    id: idActivo,
    sede: sedeSeleccionada,
    descripcion: descripcionActivo,
  })
   // Mostrar un mensaje de éxito utilizando la biblioteca SweetAlert2.
  .then((response) => {
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "La solicitud de registro ha sido enviada con éxito",
  });
  // Limpiar los campos del formulario.
  document.querySelector("#txtNom").value = "";
  document.querySelector("#txtUbActivo").value = "";
  document.querySelector("#txtIdActivo").value = "";
  document.querySelector("#txtIDType").value = "";
  document.querySelector("#txtDescription").value = "";
  })
  // Mostrar un mensaje de error utilizando la biblioteca SweetAlert2.
  .catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Ha ocurrido un error al enviar la solicitud de registro",
  });
  console.error(error);
  });
  }