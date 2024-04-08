var utils = new Utils();
var tablesUtil = new TableUtils();
var sesion = new SesionLocal()
var notifyAlerts = new AllAlerts();
var apiadmin = null
var gbGradoSelected = 0
var btnLogout = document.getElementById("cerrarSesion");
var btnOpenAddEdiNotas = document.querySelectorAll(".btnOpenAddEdiNotas")

var tableListGrado = document.querySelector("#tblistGrados tbody"); //tb-list-grados
var tbListMateriaSociales = document.querySelector("#tbListCalAlSociales tbody")
var tbListMateriaCiencias = document.querySelector("#tbListCalAlCiencias tbody")
var tbListMateriaMatematicas = document.querySelector("#tbListCalAlMatematica tbody")
var tbListMateriaLenguaje = document.querySelector("#tbListCalAlLenguaje tbody")
var tbListMateriaEdfisica = document.querySelector("#tbListCalAlEdFisica tbody")
var tbListMateriaMoral = document.querySelector("#tbListCalAlMoralUrbCivica tbody")
var tbListMateriaIngles = document.querySelector("#tbListCalAlIngles tbody")
var tbListMateriaArtistica = document.querySelector("#tbListCalAlArtistica tbody")
var frmMdIngresoNotas = document.forms["frmIngresoNotas"]
var frmIngresoConducta = document.forms["frmIngresoConducta"]
var frmIngresoAsistencia = document.forms["frmIngresoAsistencia"]
var frmIngresoNotaRecuper = document.forms["frmIngresoNotaRecuper"]
var slctChangeAsistenModal = document.querySelector("#slcListTrimestreAsis")
var inputIdTrimestreAsistenciaAlumno = document.querySelector("#mdidalumnoasis")
var slcTrimestreCalifEstud = document.querySelector("#slcTrimestreCalificacion")

var inputMdNotasidmateria = document.querySelector("#mdNotasidmateria")
var inputMdNotasidalumno = document.querySelector("#mdNotasidalumno")

var lilistMateriasCal = document.querySelector("#listMateriasCal")
//PARA GRADO SELECCIONADO
var gradoSelectedbl = document.querySelector("#gradoSelectedbladminalgo");

sesion.validateSesion();
document.addEventListener("DOMContentLoaded", (evt) => {
    if (sesion.getToken != null && sesion.getToken != undefined) {
        apiadmin = new ApiUtils(utils.baseUrl, sesion.getToken);
        cargarGrados();
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
    })

    frmIngresoNotaRecuper.addEventListener("submit",(evt)=>{
        evt.preventDefault();
        let idalumno = frmIngresoNotaRecuper["idalumnotarecu"].value;
        let nota     = frmIngresoNotaRecuper["inNotaRecupera"].value;
        let materia  = frmIngresoNotaRecuper["idmaterianotarecu"].value;
        modificarNotaRecuperacion(idalumno,materia,nota)
    })


    slctChangeAsistenModal.addEventListener("change", (evt) => {
        let idalumno = inputIdTrimestreAsistenciaAlumno.value
        let idtrimestre = evt.target.value;
        cargarAsistencia_trimestre_tabla_calificaciones(idalumno, idtrimestre)
    })

    slcTrimestreCalifEstud.addEventListener("change", (evt) => {
        let idtrimestre = evt.target.value;
        console.log('id_trimestre: ' + idtrimestre);
        console.log("id_materia =" + frmMdIngresoNotas["mdNotasidmateria"].value);
        console.log("idalumno =" + frmMdIngresoNotas["mdNotasidalumno"].value);
        cargarNotas_trimestre_tabla_calificaciones(inputMdNotasidalumno.value, inputMdNotasidmateria.value, idtrimestre)
    })

    frmIngresoConducta["selectForTrimestrsConducta"].addEventListener("change", (evt) => {
        let idalumno = frmIngresoConducta["mdidalumConducta"].value;
        let idtrimes = evt.target.value;
        cargarConductaAlumno(idalumno, idtrimes)
    })


});

function setIdalumodalnotarecuper(id,idmtrec) {
    frmIngresoNotaRecuper["idalumnotarecu"].value=id;
    frmIngresoNotaRecuper["idmaterianotarecu"].value=idmtrec;
    getNotaRecuperacionAlumno(id,idmtrec);
}

function cargarAsistencia_trimestre_tabla_calificaciones(idAlumno, idtrimestre) {
    this.apiadmin.getctk(`admin/asistenciaportrimestre/${idAlumno}/${idtrimestre}`)
        .then((response) => {
            console.log(response);
            frmIngresoAsistencia["txtPorcentAsis"].value = response
            // this.tableUtils.rellenarTableAdmins(listado, this.tableAdmin);
        }).catch((error) => {
            console.log("error? " + error);
        });
}

function cargarNotas_trimestre_tabla_calificaciones(idAlumno, idmateria, idtrimestre = 1) {
    this.apiadmin.getctk(`admin/notasportrimestre/${idAlumno}/${idmateria}/${idtrimestre}`)
        .then((response) => {

            frmMdIngresoNotas["inNota1Cal"].value = response[0].nota1;
            frmMdIngresoNotas["inNota2Cal"].value = response[0].nota2;
            frmMdIngresoNotas["inNota3Cal"].value = response[0].nota3;
        }).catch((error) => {
            console.log("error? " + error);
        });
}

function cargarConductaAlumno(idalumno, idtrimestre = 1) {
    frmIngresoConducta["selectForTrimestrsConducta"].value = idtrimestre
    apiadmin.getctk(`admin/conductaportrimestre/${idalumno}/${idtrimestre}`)
        .then((conducta) => {
            console.log("conducta", conducta);
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

function getNotaRecuperacionAlumno(idalumno,idmateria) {
    apiadmin.getctk(`calificacion/getnotarecuperacion/${idalumno}/${idmateria}`)
        .then((notar) => {
            console.log("notar=",notar);
            frmIngresoNotaRecuper["inNotaRecupera"].value=notar;
        })
        .catch((error) => {
            console.log("error? " + error);
            tablesUtil.vaciarTabla(tableListGrado)
        });
}

function cargarGrados() {
    console.log("arndo grado");
    apiadmin.getctk("grado/listadogradoconcantidad/1")
        .then((listado) => {
            tablesUtil.rellenarTablaGradosCalificaciones(listado, tableListGrado);
        })
        .catch((error) => {
            console.log("error? " + error);
            tablesUtil.vaciarTabla(tableListGrado)
        });
}

function prepararNotasModificar(event, idalumno, idmateria) {
    // console.log(event.target.parentNode.parentNode.children[2].textContent);
    frmMdIngresoNotas["mdNotasidmateria"].value = idmateria
    frmMdIngresoNotas["mdNotasidalumno"].value = idalumno
    frmMdIngresoNotas["slcTrimestreCalificacion"].selectedIndex = 0;
    frmMdIngresoNotas["inNota1Cal"].value = ""
    frmMdIngresoNotas["inNota2Cal"].value = ""
    frmMdIngresoNotas["inNota3Cal"].value = ""
}

function prepararAsitenciaModificar(idalumno) {
    frmIngresoAsistencia["mdidalumnoasis"].value = idalumno
    frmIngresoAsistencia["slcListTrimestreAsis"].value = ""
    frmIngresoAsistencia["txtPorcentAsis"].value = ""
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
    frmIngresoNotaRecuper["idmaterianotarecu"].value="";
    // frmIngresoConducta["mdidalumConducta"].value = ""

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
    frmIngresoAsistencia["mdidalumnoasis"].value = ""
    frmIngresoAsistencia["slcListTrimestreAsis"].value = ""
    frmIngresoAsistencia["txtPorcentAsis"].value = ""
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
            //recargar calificaciones
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
    frmMdIngresoNotas["slcTrimestreCalificacion"].selectedIndex = 0;
    frmMdIngresoNotas["inNota1Cal"].value = ""
    frmMdIngresoNotas["inNota2Cal"].value = ""
    frmMdIngresoNotas["inNota3Cal"].value = ""
    frmMdIngresoNotas["mdNotasidalumno"].value = "";
    frmMdIngresoNotas["mdNotasidmateria"].value = "";
    console.log("poniendo a cero= ", frmMdIngresoNotas.value);
}


function cargarAlumnosCalificaciones(idgrado,grado,seccion) {
    gradoSelectedbl.innerHTML =grado+" "+seccion;
    gbGradoSelected = idgrado
    apiadmin.getctk(`calificacion/gradocalificacionm/${idgrado}/1`)
        .then((listado) => {
            console.log(listado);
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaSociales,1);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/gradocalificacionm/${idgrado}/2`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaCiencias,2);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/gradocalificacionm/${idgrado}/3`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaMatematicas,3);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/gradocalificacionm/${idgrado}/4`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaLenguaje,4);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/gradocalificacionm/${idgrado}/5`)
        .then((listado) => {
            console.log(listado);
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaEdfisica,5);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/gradocalificacionm/${idgrado}/6`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaMoral,6);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/gradocalificacionm/${idgrado}/7`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaIngles,7);
        }).catch((error) => { console.log("error? " + error); });

    apiadmin.getctk(`calificacion/gradocalificacionm/${idgrado}/8`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnosCalificaciones(listado, tbListMateriaArtistica,8);
        }).catch((error) => { console.log("error? " + error); });

}

