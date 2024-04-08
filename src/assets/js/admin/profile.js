var utils      = new Utils();
var sesion     = new SesionLocal()
var apiadmin   = null
var perfilForm = document.forms["frmPerfilAdmin"]
var btnLogout  =  document.getElementById("cerrarSesion");

sesion.validateSesion();
document.addEventListener("DOMContentLoaded", (evt) => {
    if(sesion.getToken != null && sesion.getToken != undefined){
        apiadmin   = new ApiUtils(utils.baseUrl,sesion.getToken);
        cargarPerfil();
    }
    btnLogout.addEventListener("click", (evt) => {
        sesion.destroySesion();
    });
});


function cargarPerfil(){
    apiadmin.getctk(`admin/${sesion.getuser}`)
    .then((user)=>{
        console.log(user);    
        fillField(user)
    })
    .catch((error)=>{
        console.log("error: "+error);
    });
}

function fillField(user) {
    perfilForm["nombre"].value=user.nombre;
    perfilForm["genero"].value=user.genero;
    perfilForm["dui"].value=user.dui;
    perfilForm["email"].value=user.email;
    perfilForm["usuario"].value=user.dtusuarioUsuario;
    perfilForm["telefono"].value=user.telefono;
  }










