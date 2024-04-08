var utils = new Utils();
var tablesUtil = new TableUtils();
var sesion = new SesionLocal();
var apiEstudiante = null;
var btnLogout = document.getElementById("cerrarSesion");
var btnOpenAddEdiNotas = document.querySelectorAll(".btnOpenAddEdiNotas");
var tablListCalificaciones = document.querySelector("#tbListCalificaciones tbody");
var tbboletaConductas = document.querySelector("#tbboletaConductas tbody");
var spNombreEstudiante = document.querySelector("#spNombreEstudiante");
var spGradoCursando = document.querySelector("#spGradoCursando");
var tbBoletaPreview = document.querySelector("#tbBoletaPreview");
var selectPreviewBoleta = document.querySelector("#selectPreviewBoleta");
var valorAsistenciaTrim = document.querySelector("#valorAsistenciaTrim")

sesion.validateSesion();
document.addEventListener("DOMContentLoaded", (evt) => {
  if (sesion.getToken != null && sesion.getToken != undefined) {
    apiEstudiante = new ApiUtils(utils.baseUrl, sesion.getToken);
    let ius = localStorage.getItem("userLogged");
    cargarPerfil();
    cargarCalificaciones(ius);
  }
  btnLogout.addEventListener("click", (evt) => {
    sesion.destroySesion();
    localStorage.removeItem("userLogged");
  });

  selectPreviewBoleta.addEventListener("change", (evt) => {
    let idtrimestre = evt.target.value;
    if (idtrimestre == 4) {
      cargarCalificacionResumenFinalRecuper();
      cargarConductaResumenBoleta(3);
      cargarAsistenciaTrimBoleta(3);
      tbBoletaPreview.tHead.innerHTML = tablesUtil.theadBoletaNotasFnRecuperacion();
    } else {
      tbBoletaPreview.tHead.innerHTML = tablesUtil.theadBoletaNotasSimples();
      cargarCalificacionResumen(idtrimestre, 1);
      cargarConductaResumenBoleta(idtrimestre);
      cargarAsistenciaTrimBoleta(idtrimestre);
    }
  });
  
});


function cargarCalificaciones(id = 3) {
  apiEstudiante.getctk(`alumno/calificacion/${id}`)
    .then((listado) => {
      tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tablListCalificaciones);
    })
    .catch((error) => {
      console.log("error? " + error);

    });
}

function cargarConductaResumenBoleta(idtrimestre = 1) {
  let idalumno = localStorage.getItem("userLogged");
  apiEstudiante.getctk(`alumno/aspectoconductatextnumber/${idalumno}/${idtrimestre}`)
    .then((listado) => {
      tablesUtil.rellenarTablaAlumnoBoletaConducta(listado, tbboletaConductas);
    })
    .catch((error) => {
      console.log("error? " + error);
      // tablesUtil.vaciarTabla(tbboletaConductas);
    });
}

function cargarAsistenciaTrimBoleta(idtrimestre = 1) {
  let idalumno = localStorage.getItem("userLogged");
  apiEstudiante.getctk(`alumno/asistenciaindvboleta/${idalumno}/${idtrimestre}`)
    .then((asistencia) => {
      valorAsistenciaTrim.textContent = asistencia + "%"
    })
    .catch((error) => {
      console.log("error? " + error);
      // tablesUtil.vaciarTabla(tbboletaConductas);
    });
}

function cargarPerfil() {
  apiEstudiante
    .getctk(`alumno/${sesion.getuser}`)
    .then((user) => {
      filldata(user);
      localStorage.setItem("userLogged", user.id_alumno);

      cargarCalificacionResumen();
      cargarConductaResumenBoleta();
      cargarAsistenciaTrimBoleta();

    })
    .catch((error) => {
      console.log("error: " + error);
    });
}

function getSesionAlumnoid() {
  apiEstudiante
    .getctk(`alumno/data/${sesion.getuser}`)
    .then((user) => {
      console.log(user);
      // localStorage.setItem("alumnologged",user)
    })
    .catch((error) => {
      console.log("error: " + error);
    });
}

function filldata(user) {
  console.log("userslog, ", user);
  spNombreEstudiante.textContent = `${user.nombre} ${user.apellido}`;
  spGradoCursando.textContent = `${user.gradoDescripcion} ${user.gradoSeccionDescripcion}`;
}

function cargarCalificacionResumen(idtrimestre = 1, tipohead = 1) {
  let ius = localStorage.getItem("userLogged");
  tbBoletaPreview.tHead.innerHTML = tablesUtil.theadBoletaNotasSimples();
  apiEstudiante
    .getctk(`alumno/calificacionresumen/${ius}/${idtrimestre}`)
    .then((listado) => {
      tablesUtil.rellenarTbCalificacionResumen(
        listado,
        tbBoletaPreview.tBodies[0],
        tipohead
      );
      // console.log(listado);
    })
    .catch((error) => {
      console.log("error? " + error);
      // tablesUtil.vaciarTabla(tbBoletaPreview)
    });
}

function cargarCalificacionResumenFinalRecuper() {
  let ius = localStorage.getItem("userLogged");
  apiEstudiante
    .getctk(`alumno/calificacionrecuperacionfnl/${ius}`)
    .then((listado) => {
      console.log("list= ", listado);
      tablesUtil.rellenarTbCalificacionResumen(
        listado,
        tbBoletaPreview.tBodies[0],
        4
      );
      // console.log(listado);
    })
    .catch((error) => {
      console.log("error? " + error);
      // tablesUtil.vaciarTabla(tbBoletaPreview)
    });
}
