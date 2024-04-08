var sesion = new SesionLocal()
var utils      = new Utils();
var formLogin = document.getElementById("frmLoginUsers");
var loginForm = document.forms["frmLoginUsers"]
var messageform = document.getElementById("message")
var apiLogin = new ApiUtils(utils.baseUrl,'');
var messageLogin = document.getElementById("messageLogin")

document.addEventListener("click", (evt) => {
    loginForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        let username = loginForm["nmUser"].value.trim();
        let pass     = loginForm["password"].value.trim();
        let user     = {}
        user.usuario = username
        user.clave   = pass
        login(user)
    });

});





async function login(usuario) {
    console.log(usuario);
    apiLogin.poststk(`usuario/sesion`,usuario)
    .then((user)=>{
        if (user.mensaje.length!='OK') {
            messageLogin.classList.remove("d-none")
            messageLogin.textContent=user.mensaje;
            setTimeout(()=>{
                messageLogin.classList.add("d-none")
            },3000)
        } 
        crearSesion(user)
    })
    .catch((error)=>{
        console.log("error", error);
    });

}


function crearSesion(usuario) {
    sesion.createSesion(usuario)
    switch (usuario.tipoUsuario) {
        case "1":
            window.location.href = "admin/perfil.html"
            break;
        case "2":
            window.location.href = "docente/perfil.html"
            break;
        case "3":
            window.location.href = "estudiante/perfil.html"
            break;
        default:
            break;
    }
}


