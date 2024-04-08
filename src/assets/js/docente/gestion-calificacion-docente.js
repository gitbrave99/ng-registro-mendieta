var utils = new Utils();
var tablesUtil = new TableUtils();
var sesion = new SesionLocal()
var notifyAlerts = new AllAlerts();
var apiadmin = null
var gbGradoSelected = 0
var btnLogout = document.getElementById("cerrarSesion");
var btnOpenAddEdiNotas = document.querySelectorAll(".btnOpenAddEdiNotas")

var tableListGrado = document.querySelector("#tblistGradosCalicar tbody"); //tb-list-grados
var tbListMateriaSociales = document.querySelector("#tbListCalAlSociales tbody")
var tbListMateriaCiencias = document.querySelector("#tbListCalAlCiencias tbody")
var tbListMateriaMatematicas = document.querySelector("#tbListCalAlMatematica tbody")
var tbListMateriaLenguaje = document.querySelector("#tbListCalAlLenguaje tbody")
var tbListMateriaEdfisica = document.querySelector("#tbListCalAlEdFisica tbody")
var tbListMateriaMoral = document.querySelector("#tbListCalAlMoralUrbCivica tbody")
var tbListMateriaIngles = document.querySelector("#tbListCalAlIngles tbody")
var tbListMateriaArtistica = document.querySelector("#tbListCalAlArtistica tbody")
var frmMdIngresoNotas = document.forms["frmIngresoNotas"]
var frmIngresoAsistencia = document.forms["frmIngresoAsistencia"]
var frmGradoResponsable = document.forms["frmGradoEncargado"]
var frmIngresoConducta = document.forms["frmIngresoConducta"]
var frmIngresoNotaRecuper = document.forms["frmIngresoNotaRecuper"]
var lilistMateriasCalMenu = document.querySelector("#listMateriasCal")
var btnCalificarGradoRespon = document.querySelector("#btnCalificarGradoResponsable")

var slctChangeAsistenModal = document.querySelector("#slcListTrimestreAsis")
var slcTrimestreCalifEstud = document.querySelector("#slcTrimestreCalificacion") 
var inputMdNotasidmateria  = document.querySelector("#mdNotasidmateria")
var inputMdNotasidalumno   = document.querySelector("#mdNotasidalumno")
var inputIdTrimestreAsistenciaAlumno = document.querySelector("#mdidalumnoasis")
//PARA GRADO SELECCIONADO
var gradoSelectedbl = document.querySelector("#gradoSelectedbl");
sesion.validateSesion();
document.addEventListener("DOMContentLoaded", (evt) => {
    if (sesion.getToken != null && sesion.getToken != undefined) {
        apiadmin = new ApiUtils(utils.baseUrl, sesion.getToken);
        // cargarProfesorL(sesion.getuser)
        cargarGradoEncargado(sesion.getuser)
        cargarGrados();
        // cargarMateriaDelProfesorEncargado();
    }

    btnLogout.addEventListener("click", (evt) => {
        sesion.destroySesion();
    });

    frmMdIngresoNotas.addEventListener("submit", (evt) => {
        evt.preventDefault()
        agregarNotas()
    });

    frmIngresoAsistencia.addEventListener("submit", (evt) => {
        evt.preventDefault()
        agregarAsistencia()
    });

    frmIngresoConducta.addEventListener("submit",(evt)=>{
        evt.preventDefault();
        agregarAspectosConducta();
    });

    frmIngresoNotaRecuper.addEventListener("submit",(evt)=>{
        evt.preventDefault();
        let idalumno = frmIngresoNotaRecuper["idalumnotarecu"].value;
        let nota     = frmIngresoNotaRecuper["inNotaRecupera"].value;
        let materia  = frmIngresoNotaRecuper["idmaterianotarecu"].value;
        modificarNotaRecuperacion(idalumno,materia,nota)
    })


    frmIngresoConducta["selectForTrimestrsConducta"].addEventListener("change", (evt) => {
        let idalumno = frmIngresoConducta["mdidalumConducta"].value;
        let idtrimes = evt.target.value;
        cargarConductaAlumno(idalumno, idtrimes)
    });

    btnCalificarGradoRespon.addEventListener("click", (evt) => {
        let idgrad  = localStorage.getItem("idgrad");
        let grado   = localStorage.getItem("gradoEncargado");
        let seccion = localStorage.getItem("gradoSeccion");
        if (idgrad==null ||idgrad=="null") {return;}
        cargarAlumnosCalificaciones(idgrad,grado,seccion)
    })

    slctChangeAsistenModal.addEventListener("change", (evt) => {
        let idalumno    = inputIdTrimestreAsistenciaAlumno.value
        let idtrimestre = evt.target.value;
        cargarAsistencia_trimestre_tabla_calificaciones(idalumno, idtrimestre)
    })

    slcTrimestreCalifEstud.addEventListener("change",(evt)=>{
        let idtrimestre= evt.target.value;
        cargarNotas_trimestre_tabla_calificaciones(inputMdNotasidalumno.value,inputMdNotasidmateria.value,idtrimestre)
    })

});

function setIdalumodalnotarecuper(id,idmtrec) {
    frmIngresoNotaRecuper["idalumnotarecu"].value=id;
    frmIngresoNotaRecuper["idmaterianotarecu"].value=idmtrec;
    getNotaRecuperacionAlumno(id,idmtrec);
}

function getNotaRecuperacionAlumno(idalumno,idmateria) {
    apiadmin.getctk(`calificacion/getnotarecuperacion/${idalumno}/${idmateria}`)
        .then((notar) => {
            frmIngresoNotaRecuper["inNotaRecupera"].value=notar;
        })
        .catch((error) => {
            console.log("error? " + error);
            tablesUtil.vaciarTabla(tableListGrado)
        });
}


function cargarAsistencia_trimestre_tabla_calificaciones(idAlumno, idtrimestre) {
    this.apiadmin.getctk(`admin/asistenciaportrimestre/${idAlumno}/${idtrimestre}`)
        .then((response) => {
            frmIngresoAsistencia["txtPorcentAsis"].value=response
            // this.tableUtils.rellenarTableAdmins(listado, this.tableAdmin);
        }).catch((error) => {
            console.log("error? " + error);
        });
}

function cargarNotas_trimestre_tabla_calificaciones(idAlumno,idmateria, idtrimestre=1) {
    this.apiadmin.getctk(`admin/notasportrimestre/${idAlumno}/${idmateria}/${idtrimestre}`)
        .then((response) => {
 
            frmMdIngresoNotas["inNota1Cal"].value=response[0].nota1;
            frmMdIngresoNotas["inNota2Cal"].value=response[0].nota2;
            frmMdIngresoNotas["inNota3Cal"].value=response[0].nota3;
        }).catch((error) => {
            console.log("error? " + error);
        });
}

function cargarMateriaDelProfesorEncargado() {
    let proflog = localStorage.getItem("idprof");
    let idgrado = localStorage.getItem("idgrad");
    apiadmin.getctk(`profesor/materiasdelprofeencargado/${idgrado}/${proflog}`)
        .then((materiasList) => {
            console.log("materias encargadas", materiasList);
            // tablesUtil.rellenarTablaGradosCalificar(listado, tableListGrado);
        })
        .catch((error) => { tablesUtil.vaciarTabla(tableListGrado) })
}


function cargarProfesorL(idusuario) {
    apiadmin.getctk(`profesor/${idusuario}`)
        .then((profe) => {
            localStorage.setItem("idprof", profe.id_profesor)
            localStorage.setItem("idgrad", profe.dtgradoIdGrado)
        }).catch((error) => { console.log("error? " + error) });
}

function cargarGrados() {
    let proflog = localStorage.getItem("idprof")
    apiadmin.getctk(`profesor/gradoscalificar/${proflog}`)
        .then((listado) => {
            tablesUtil.rellenarTablaGradosCalificar(listado, tableListGrado);
        })
        .catch((error) => { tablesUtil.vaciarTabla(tableListGrado) })
}


function cargarConductaAlumno(idalumno, idtrimestre = 1) {
    frmIngresoConducta["selectForTrimestrsConducta"].value = idtrimestre
    apiadmin.getctk(`admin/conductaportrimestre/${idalumno}/${idtrimestre}`)
        .then((conducta) => {
            preparaConductamdalumno(conducta, idalumno)
        })
        .catch((error) => {
            console.log("error? " + error);
            tablesUtil.vaciarTabla(tableListGrado)
        });
}

function preparaConductamdalumno(conducta, idalumno) {
    frmIngresoConducta["mdidalumConducta"].value = idalumno
    frmIngresoConducta["slcForseEypcr"].value = conducta.seEypcr
    frmIngresoConducta["slcFormuestraSpypnc"].value = conducta.muestraSpypnc
    frmIngresoConducta["slcFortomaDdfayr"].value = conducta.tomaDdfayr
    frmIngresoConducta["slcForaceptaYvl"].value = conducta.aceptaYvl
    frmIngresoConducta["slcForevidenciAfcycdlpaz"].value = conducta.evidenciAfcycdlpaz

}

function agregarAspectosConducta() {
    let data = {}
    data.evidenciAfcycdlpaz = frmIngresoConducta["slcForevidenciAfcycdlpaz"].value
    data.aceptaYvl          = frmIngresoConducta["slcForaceptaYvl"].value
    data.tomaDdfayr         = frmIngresoConducta["slcFortomaDdfayr"].value
    data.seEypcr            = frmIngresoConducta["slcForseEypcr"].value
    data.muestraSpypnc      = frmIngresoConducta["slcFormuestraSpypnc"].value
    data.idAlumno           = frmIngresoConducta["mdidalumConducta"].value
    data.idTrimestre        = frmIngresoConducta["selectForTrimestrsConducta"].value
    console.log(data);
    this.apiadmin.put("admin/conductaalumnotrimestre", data).
        then((response) => {
            if (response.estado == "actualizado correctamente") {
                notifyAlerts.Result("success", "Conducta Agregada")
            } else {
                notifyAlerts.Result("error", "No se pudo agregar conducta")
            }
            if (gbGradoSelected !== 0) {
                // volver a cargar los datos
                let grade= gradoSelectedbl.textContent;
                cargarAlumnosCalificaciones(gbGradoSelected);
                gradoSelectedbl.innerHTML=grade
            }
        })
        .catch((error) => {
            console.log("error= " + error);
        })
    $("#mdAgregarConducta").modal("hide");
    frmIngresoConducta["mdidalumConducta"].value = ""

}

function modificarNotaRecuperacion(idalumno,idmateria,notar) {
    this.apiadmin.putwb(`calificacion/agregarnotarecuperacion/${idalumno}/${idmateria}/${notar}` ).
        then((response) => {
            if (response.estado == "notas agregadas correctamente") {
                notifyAlerts.Result("success", "Nota agregada")
            } else {
                notifyAlerts.Result("error", "No se pudo agregar nota")
            }
            if (gbGradoSelected !== 0) {
                let grade= gradoSelectedbl.textContent;
                cargarAlumnosCalificaciones(gbGradoSelected);
                gradoSelectedbl.innerHTML=grade
            }
        })
        .catch((error) => {console.log("error= " + error);})
    $("#mdAgregarNotaRecuperacion").modal("hide");
    frmIngresoNotaRecuper["idalumnotarecu"].value="";
    frmIngresoNotaRecuper["inNotaRecupera"].value="";
    // frmIngresoConducta["mdidalumConducta"].value = ""

}



function cargarGradoEncargado(idusuario) {

    apiadmin.getctk(`profesor/${idusuario}`)
        .then((profe) => {
            apiadmin.getctk(`profesor/gradoencargado/${profe.id_profesor}`)
                .then((grado) => {
                    let gradoEncargado = grado.grado
                    let gradoSeccionEn = grado.seccion
                    frmGradoResponsable["gradoResponsable"].value = grado.grado + " " + grado.seccion
                    localStorage.setItem("gradoEncargado",gradoEncargado);
                    localStorage.setItem("gradoSeccion",gradoSeccionEn);
                    frmGradoResponsable["cantidadAlumnos"].value = grado.cantidad
                }).catch((error) => { console.log("error? " + error); });
        }).catch((error) => { console.log("error? " + error) });
}


function prepararNotasModificar(idalumno, idmateria) {
    frmMdIngresoNotas["mdNotasidmateria"].value = idmateria
    frmMdIngresoNotas["mdNotasidalumno"].value  = idalumno
    frmMdIngresoNotas["slcTrimestreCalificacion"].value =""
    frmMdIngresoNotas["inNota1Cal"].value       = ""
    frmMdIngresoNotas["inNota2Cal"].value       = ""
    frmMdIngresoNotas["inNota3Cal"].value       = ""

}


function prepararAsitenciaModificar(idalumno) {
    frmIngresoAsistencia["mdidalumnoasis"].value = idalumno
    frmIngresoAsistencia["slcListTrimestreAsis"].value =""
    frmIngresoAsistencia["txtPorcentAsis"].value =""
}

function agregarAsistencia() {
    let data = {}
    data.id_alumno = frmIngresoAsistencia["mdidalumnoasis"].value
    data.id_trimestre = frmIngresoAsistencia["slcListTrimestreAsis"].value
    data.porcentaje = frmIngresoAsistencia["txtPorcentAsis"].value
    this.apiadmin.post("asistencia/guardar", data).
        then((response) => {
            
            if (response.estado == "asistencia agregada correctamente") {
                notifyAlerts.Result("success", "Agregada correctamente")
            } else {
                notifyAlerts.Result("error", "No se pudo guardar")
            }
            if (gbGradoSelected !== 0) {
                // volver a cargar los datos
                let grade= gradoSelectedbl.textContent;
                cargarAlumnosCalificaciones(gbGradoSelected);
                gradoSelectedbl.innerHTML=grade
            }
        })
        .catch((error) => {
            console.log("error= " + error);
        })
    $("#mdAgregarAsistencia").modal("hide");
    frmIngresoAsistencia["mdidalumnoasis"].value       = ""
    frmIngresoAsistencia["slcListTrimestreAsis"].value = ""
    frmIngresoAsistencia["txtPorcentAsis"].value       = ""
}


function agregarNotas() {
    let data = {}
    data.idtrimestre = frmMdIngresoNotas["slcTrimestreCalificacion"].value
    data.nota1 = frmMdIngresoNotas["inNota1Cal"].value
    data.nota2 = frmMdIngresoNotas["inNota2Cal"].value
    data.nota3 = frmMdIngresoNotas["inNota3Cal"].value
    data.idalumno = frmMdIngresoNotas["mdNotasidalumno"].value
    data.idmateria = frmMdIngresoNotas["mdNotasidmateria"].value

    this.apiadmin.post("calificacion/guardar", data).
        then((response) => {

            if (response.estado == "notas agregadas correctamente") {
                notifyAlerts.Result("success", "Agregada correctamente")
            } else {
                notifyAlerts.Result("error", "No se pudo guardar")
            }
            if (gbGradoSelected !== 0) {
                let grade= gradoSelectedbl.textContent;
                cargarAlumnosCalificaciones(gbGradoSelected);
                gradoSelectedbl.innerHTML=grade
            }
        })
        .catch((error) => {
            console.log("error= " + error);
        })
    $("#mdAgregarNota").modal("hide");
    frmMdIngresoNotas["inNota1Cal"].value       = ""
    frmMdIngresoNotas["inNota2Cal"].value       = ""
    frmMdIngresoNotas["inNota3Cal"].value       = ""
    frmMdIngresoNotas["mdNotasidalumno"].value  = ""
    frmMdIngresoNotas["mdNotasidmateria"].value = ""
}


function cargarAlumnosCalificaciones(idgrado,grado,seccion) {
    gradoSelectedbl.innerHTML = grado + " " + seccion;
    gbGradoSelected = idgrado
    let proflog = localStorage.getItem("idprof");
    // cargarMateriaDelProfesorEncargado(idgrado)
    apiadmin.getctk(`calificacion/calificaciongradomateriaprofe/${idgrado}/1/${proflog}`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaSociales, 1);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/calificaciongradomateriaprofe/${idgrado}/2/${proflog}`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaCiencias, 2);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/calificaciongradomateriaprofe/${idgrado}/3/${proflog}`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaMatematicas, 3);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/calificaciongradomateriaprofe/${idgrado}/4/${proflog}`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaLenguaje, 4);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/calificaciongradomateriaprofe/${idgrado}/5/${proflog}`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaEdfisica, 5);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/calificaciongradomateriaprofe/${idgrado}/6/${proflog}`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaMoral, 6);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/calificaciongradomateriaprofe/${idgrado}/7/${proflog}`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaIngles, 7);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/calificaciongradomateriaprofe/${idgrado}/8/${proflog}`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaArtistica, 8);
        }).catch((error) => { console.log("error? " + error); });

}

