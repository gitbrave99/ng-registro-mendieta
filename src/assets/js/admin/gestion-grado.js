var utils = new Utils();
var tablesUtil = new TableUtils();
var sesion = new SesionLocal();
var notifyAlerts = new AllAlerts();
var apiadmin = null;
var btnLogout = document.getElementById('cerrarSesion');
var inputBuscarGrado = document.getElementById('inputBuscarGrado');

var tableListGrado = document.querySelector('#tblistGrados tbody'); //tb-list-grados
var tableListDocentes = document.querySelector('#tableListDocentes tbody');
var tableListAlumnosGrado = document.querySelector('#tblistAlumnos tbody');

var formAgregarGrado = document.forms['frmAgregarGrado']; //form-agregar-grado
var formEditarGrado = document.forms['frmeditargrado']; //form-editar-grado

var slcProfesoresDisponibles = document.querySelector(
    '#selectDocenteResponsable'
);
var slcCargarListadoEStadoGrado = document.getElementById(
    'slcCargarListadoEStadoGrado'
);

//DATOS DE LA BOLETA DE NOTAS
var selectPreviewBoleta = document.querySelector('#selectPreviewBoleta');
var tbBoletaPreview = document.querySelector('#tbBoletaPreview');
var idalumnoPrevBoleta = document.querySelector('#idalumnoPrevBoleta');
//PARA GRADO SELECCIONADO
var gradoSelectedbl = document.querySelector('#gradoSelectedbl');
var tbboletaConductas = document.querySelector('#tbboletaConductas tbody');
var valorAsistenciaTrim = document.querySelector('#valorAsistenciaTrim');

sesion.validateSesion();
document.addEventListener('DOMContentLoaded', (evt) => {
    if (sesion.getToken != null && sesion.getToken != undefined) {
        apiadmin = new ApiUtils(utils.baseUrl, sesion.getToken);
        // tbBoletaPreview.tHead.innerHTML = tablesUtil.theadBoletaNotasSimples()
        cargarGradosStatus();
        cargarProfesoresDisponibles();
    }
    btnLogout.addEventListener('click', (evt) => {
        sesion.destroySesion();
    });
    formAgregarGrado.addEventListener('submit', (evt) => {
        evt.preventDefault();
        agregarGrado();
    });

    formEditarGrado.addEventListener('submit', (evt) => {
        evt.preventDefault();
        modificarGrado();
    });

    slcCargarListadoEStadoGrado.addEventListener('change', (evt) => {
        let estado = evt.target.value;
        cargarGradosStatus(estado);
    });

    selectPreviewBoleta.addEventListener('change', (evt) => {
        let idtrimestre = evt.target.value;
        selectPreviewBoleta.value = idtrimestre;
        let idalbolprev = idalumnoPrevBoleta.value;
        // ============================================
        // update trimestre for boleta alumno report
        // ============================================
        const curr = JSON.parse(localStorage.getItem('alumnoData'));
        const el = document.getElementById('selectPreviewBoleta');
        const trimestre =
            el.selectedIndex == -1 ? null : el.options[el.selectedIndex].text;
        const updated = {
            ...curr,
            trimestre,
        };
        localStorage.setItem('alumnoData', JSON.stringify(updated));

        if (idtrimestre == 4) {
            cargarCalificacionResumenFinalRecuper(idalbolprev);
            cargarConductaResumenBoleta(idalbolprev, 3);
            cargarAsistenciaTrimBoleta(idalbolprev, 3);
            tbBoletaPreview.tHead.innerHTML =
                tablesUtil.theadBoletaNotasFnRecuperacion();
        } else {
            console.log('th simplre');
            tbBoletaPreview.tHead.innerHTML =
                tablesUtil.theadBoletaNotasSimples();
            cargarCalificacionResumen(idalbolprev, idtrimestre, 1);
            cargarConductaResumenBoleta(idalbolprev, idtrimestre);
            cargarAsistenciaTrimBoleta(idalbolprev, idtrimestre);
        }
    });
});

function cargarCalificacionResumen(idalumno, idtrimestre = 1, tipohead = 1) {
    // ============================================
    // NECESITO ESTO PARA LA BOLETA DE ALUMNO
    updateAlumnoData(idalumno);
    // ============================================
    idalumnoPrevBoleta.value = idalumno;
    selectPreviewBoleta.value = idtrimestre;
    tbBoletaPreview.tHead.innerHTML = tablesUtil.theadBoletaNotasSimples();
    apiadmin
        .getctk(`alumno/calificacionresumen/${idalumno}/${idtrimestre}`)
        .then((listado) => {
            tablesUtil.rellenarTbCalificacionResumen(
                listado,
                tbBoletaPreview.tBodies[0],
                tipohead
            );
            // console.log(listado);
        })
        .catch((error) => {
            console.log('error? ' + error);
            // tablesUtil.vaciarTabla(tbBoletaPreview)
        });

    cargarConductaResumenBoleta(idalumno, 1);
    cargarAsistenciaTrimBoleta(idalumno, 1);
}

function cargarCalificacionResumenFinalRecuper(idalumno) {
    idalumnoPrevBoleta.value = idalumno;
    // selectPreviewBoleta.value = idtrimestre;
    apiadmin
        .getctk(`alumno/calificacionrecuperacionfnl/${idalumno}`)
        .then((listado) => {
            tablesUtil.rellenarTbCalificacionResumen(
                listado,
                tbBoletaPreview.tBodies[0],
                4
            );
            // console.log(listado);
        })
        .catch((error) => {
            console.log('error? ' + error);
            // tablesUtil.vaciarTabla(tbBoletaPreview)
        });
}

function cargarGradosStatus(status = 1) {
    apiadmin
        .getctk(`grado/listadogradoconcantidad/${status}`)
        .then((listado) => {
            console.log('LIST= ', listado);
            tablesUtil.rellenarTablaGrados(listado, tableListGrado);
        })
        .catch((error) => {
            console.log('error? ' + error);
            tablesUtil.vaciarTabla(tableListGrado);
        });
}

function cargarGrados() {
    apiadmin
        .getctk('grado/listadodto')
        .then((listado) => {
            tablesUtil.rellenarTablaGrados(listado, tableListGrado);
        })
        .catch((error) => {
            console.log('error? ' + error);
            tablesUtil.vaciarTabla(tableListGrado);
        });
}

function cargarAlumnos(id, grado, seccion) {
    gradoSelectedbl.innerHTML = grado + ' ' + seccion;
    // ======== NECESITO ESTO PARA LOS REPORTES, SALU2================
    getGradoProfesorData(id);
    // ======== NECESITO ESTO PARA LOS REPORTES, SALU2================
    apiadmin
        .getctk(`grado/alumnosgrado/${id}/1`)
        .then((listado) => {
            localStorage.setItem('alumnoSet', JSON.stringify(listado));
            tablesUtil.rellenarTablaAlumnos(listado, tableListAlumnosGrado);
        })
        .catch((error) => {
            console.log('error? ' + error);
            tablesUtil.vaciarTabla(tableListAlumnosGrado);
        });
}

function cargarProfesoresDisponibles() {
    apiadmin
        .getctk('profesor/listdisponible')
        .then((response) => {
            rellenarSelect(response);
        })
        .catch((error) => {
            console.log('es ' + error);
        });
}

function rellenarSelect(list) {
    list.forEach((profesor) => {
        let option = document.createElement('option');
        option.value = profesor.id_profesor;
        option.text = profesor.nombre;
        slcProfesoresDisponibles.appendChild(option);
    });
}

function agregarGrado() {
    var datos = {};
    datos.seccionIdSeccion = formAgregarGrado['selectSeccion'].value;
    datos.descripcion = formAgregarGrado['grado'].value;
    datos.docentrespons = formAgregarGrado['selectDocenteResponsable'].value;
    datos.cantidad_alumnos = formAgregarGrado['cantidadAlumnos'].value;

    apiadmin
        .post('grado/guardar', datos)
        .then((response) => {
            cargarGradosStatus();
        })
        .catch((error) => {
            console.log('es ' + error);
        });
    $('#mdAgregarGrado').modal('hide');
}

async function modificarGrado() {
    var datos = {};
    datos.id_grado = formEditarGrado['datagrado'].value;
    datos.es_activo = formEditarGrado['slcEstadoGrado'].value;
    // datos.seccionIdSeccion = formEditarGrado["slcEditSeccion"].value
    // datos.descripcion = formEditarGrado["inputEditgrado"].value
    // datos.cantidad_alumnos = formEditarGrado["inputEditCantidad"].value
    apiadmin
        .put('grado/actualizar', datos)
        .then((response) => {
            if (response.estado == 'actualizado con éxito') {
                notifyAlerts.Result('success', 'Actualizado correctamente');
                slcCargarListadoEStadoGrado.selectedIndex = 1;
                cargarGradosStatus();
            } else {
                notifyAlerts.Result('error', 'No se pudo actualizar');
            }
            // if (gbGradoSelected!==0) {
            //     // volver a cargar los datos
            //     cargarAlumnosCalificaciones(gbGradoSelected)
            // }
        })
        .catch((error) => {
            console.log('es ' + error);
        });
    $('#mdEditarGrado').modal('hide');
}

function cargarDtaModificar(id, countAlumn) {
    apiadmin
        .getctk(`grado/${id}`)
        .then((grade) => {
            cargarModal(grade, countAlumn);
        })
        .catch((error) => {
            console.log('error? ' + error);
        });
}

function cargarAsistenciaTrimBoleta(idalumno, idtrimestre = 1) {
    apiadmin
        .getctk(`alumno/asistenciaindvboleta/${idalumno}/${idtrimestre}`)
        .then((asistencia) => {
            valorAsistenciaTrim.textContent = asistencia + '%';
        })
        .catch((error) => {
            console.log('error? ' + error);
            // tablesUtil.vaciarTabla(tbboletaConductas);
        });
}

function cargarConductaResumenBoleta(idalumno, idtrimestre = 1) {
    console.log('cargando desde inical');
    apiadmin
        .getctk(`alumno/aspectoconductatextnumber/${idalumno}/${idtrimestre}`)
        .then((listado) => {
            tablesUtil.rellenarTablaAlumnoBoletaConducta(
                listado,
                tbboletaConductas
            );
        })
        .catch((error) => {
            console.log('error? ' + error);
            // tablesUtil.vaciarTabla(tbboletaConductas);
        });
}
function cargarModal(data, countAlumn) {
    formEditarGrado['datagrado'].value = data.id_grado;
    formEditarGrado['inputEditgrado'].value = data.descripcion;
    formEditarGrado['slcEditSeccion'].value = data.seccionIdSeccion;
    formEditarGrado['inputReadProfEncargado'].value = data.dtprofesorNombre;
    formEditarGrado['inputEditCantidad'].value = countAlumn;
    formEditarGrado['slcEstadoGrado'].value = data.es_activo;
    $('#mdEditarGrado').modal('show');
}

const getGradoProfesorData = (id) => {
    const table = document.getElementById('tblistGrados');
    const rowData = table.querySelector(`tbody tr:nth-child(${id})`);
    const grado = rowData.cells[0].textContent.trim();
    const seccion = rowData.cells[1].textContent.trim();
    const encargado = rowData.cells[2].textContent.trim();

    const data = {
        encargado,
        grado,
        seccion,
    };

    localStorage.setItem('profesorGrado', JSON.stringify(data));

    const dataAlumno = {
        alumno: '',
        nie: '',
        grado,
        seccion,
        trimestre: 'I Trimestre',
    };

    localStorage.setItem('alumnoData', JSON.stringify(dataAlumno));
};

// ============================================
// UPDATE de alumnoData para IMPRIMIR boleta
// ============================================
const updateAlumnoData = (idalumno) => {
    const currentData = JSON.parse(localStorage.getItem('alumnoData'));
    const missingData = JSON.parse(localStorage.getItem('alumnoSet'));
    const { nombre, apellido, nie } = missingData.find(
        (entry) => entry.id_alumno == idalumno
    );

    const updatedData = {
        ...currentData,
        alumno: `${nombre} ${apellido}`,
        nie,
    };

    localStorage.setItem('alumnoData', JSON.stringify(updatedData));
};
