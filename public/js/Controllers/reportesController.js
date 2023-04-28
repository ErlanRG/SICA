let inputSearchOpt = document.getElementById("selecOpcion");
let inputSearch = document.getElementById("inputSearch");

function Search() {
  let searchValue = inputSearch.value;
  let searchOpt = inputSearchOpt.value;
  let collections = ["Activos", "Personas", "Sedes", "Traslados"];

  if (!searchValue || searchValue == "") {
    PrintError("No ingresó ningún valor de búsqueda.");
    return;
  }
  //Buscar en toda la base datos el valor de searchValue
}
