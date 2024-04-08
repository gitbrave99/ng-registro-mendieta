var sesion = new SesionLocal()
var utils = new Utils();
var logout = document.getElementById("cerrarSesion")
var perfilForm = document.forms["frmPerfiDocente"]
var sesion = new SesionLocal()
var apiadmin = null
sesion.validateSesion();
cargarPerfil()


document.addEventListener("DOMContentLoaded", (evt) => {
  logout.addEventListener("click", (evt) => {
    sesion.destroySesion()
    sesion.validateSesion()
  });
  if (sesion.getToken != null && sesion.getToken != undefined) {
    apiadmin = new ApiUtils(utils.baseUrl, sesion.getToken);
    cargarProfesorL(sesion.getuser)
  }

})

async function cargarPerfil() {
  const request = await fetch(`http://localhost:8080/profesor/${sesion.getuser}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': sesion.getToken
    }
  });
  if (request.status == 200) {
    let usuario = await request.json();
    fillField(usuario)
  }
}

function fillField(user) {

  perfilForm["nombre"].value = user.nombre;
  perfilForm["genero"].value = user.genero;
  perfilForm["dui"].value = user.dui;
  perfilForm["email"].value = user.email;
  perfilForm["nip"].value = user.nip;
  perfilForm["usuario"].value = user.dtusuarioUsuario;
  perfilForm["telefono"].value = user.telefono;

}

function cargarProfesorL(idusuario) {
  apiadmin.getctk(`profesor/${idusuario}`)
    .then((profe) => {
      console.log(profe);
      localStorage.setItem("idprof", profe.id_profesor)
      localStorage.setItem("idgrad", profe.dtgradoIdGrado)
    }).catch((error) => { console.log("error? " + error) });
}



