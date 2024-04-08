var utils = new Utils();
var sesion = new SesionLocal()
var apiEstudiante = null
var btnLogout = document.getElementById("cerrarSesion")
var perfilForm = document.forms["frmPerfilEstudiante"]

sesion.validateSesion();
document.addEventListener("DOMContentLoaded", (evt) => {
  if (sesion.getToken != null && sesion.getToken != undefined) {
    apiEstudiante = new ApiUtils(utils.baseUrl, sesion.getToken);
    cargarPerfil();
    console.log(sesion.getuser);
  }
  btnLogout.addEventListener("click", (evt) => {
    sesion.destroySesion();
  });
});

async function cargarPerfil() {
  apiEstudiante.getctk(`alumno/${sesion.getuser}`)
    .then((user) => {
      console.log("estudiane logeado=", user);
      fillField(user)
      localStorage.setItem("userLogged",user.id_alumno)
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}

function fillField(user) {
  console.log(user);
  perfilForm["nombreStudent"].value = user.apellido +" "+user.nombre;
  perfilForm["NieStudent"].value = user.nie; 
  perfilForm["fechanNaciStudent"].value = user.fecha_nacimiento;
  perfilForm["fechaIngresoEstudiante"].value = user.fecha_ingreso;
  perfilForm["userStudent"].value = user.dtusuarioUsuario;
  perfilForm["nombreResonsble"].value = user.encargado_nombre;
  perfilForm["duiResponsable"].value = user.encargado_dui;
}


