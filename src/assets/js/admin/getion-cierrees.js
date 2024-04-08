var utils = new Utils();
var tablesUtil = new TableUtils();
var sesion = new SesionLocal();
var notifyAlerts = new AllAlerts();
var apiadmin = null;
var btnLogout = document.getElementById('cerrarSesion');

var tableCierreEscolar = document.querySelector('#tableCierreEscolar tbody'); //tb-list-grados
var slcGradosDisponibles = document.querySelector('#selectListGradoDispon');
var slcCargarYearDisponible = document.querySelector('#selectListYears');

// var btnIniciaYearEscolara   = document.querySelector("#btnIniciarYearEscolar");
// var btnCierreYearEscolar    = document.querySelector("#btnCierreYearEscolar")
var btnImprimirResumenFinal = document.querySelector(
    '#btnImprimirResumenFinal'
);

var frmIniciarYearEscolar = document.forms['frmIniciarYearEscolar'];
var frmCerrarYearActual = document.forms['frmCerrarYearActual'];

sesion.validateSesion();
document.addEventListener('DOMContentLoaded', (evt) => {
    if (sesion.getToken != null && sesion.getToken != undefined) {
        apiadmin = new ApiUtils(utils.baseUrl, sesion.getToken);
        // tbBoletaPreview.tHead.innerHTML = tablesUtil.theadBoletaNotasSimples()
        cargarGradosActivos();
        cargarYearsActives();
        // cargarCalificacionResumenFinalRecuper();
    }

    frmIniciarYearEscolar.addEventListener('submit', (evt) => {
        evt.preventDefault();
        // insertar_curso_nuevo();
        console.log('[INICIANDO AÑO ESCOLAR]');
    });

    // CERRAR CURSO ACTUAL
    frmCerrarYearActual.addEventListener('submit', (evt) => {
        evt.preventDefault();
        // evaluarAlumnosPasarGrado();
        // inactivarCurso()
        console.log('[CERRANDO AÑO ESCOLAR]');
    });

    btnLogout.addEventListener('click', (evt) => {
        sesion.destroySesion();
    });

    // CARGAR LOS GRADOS ACTIVOS
    slcGradosDisponibles.addEventListener('change', (evt) => {
        let grado = evt.target.value;
        let year = slcCargarYearDisponible.value;
        const selectG = document.getElementById('selectListGradoDispon');
        const gradoName = selectG.options[selectG.selectedIndex].text;

        if (year !== 'null') {
            cargarCalificacionResumenFinalRecuper(year, grado);
            assignCierreData({ year, grado: gradoName });
            return;
        }
        // cargarGradosStatus(estado);
        console.log('cyear selectd=', slcCargarYearDisponible.value);
    });

    // CARGAR LOS AÑOS ACTIVOS
    slcCargarYearDisponible.addEventListener('change', (evt) => {
        let year = evt.target.value;
        let grado = slcGradosDisponibles.value;
        const selectG = document.getElementById('selectListGradoDispon');
        const gradoName = selectG.options[selectG.selectedIndex].text;

        if (grado !== 'null') {
            cargarCalificacionResumenFinalRecuper(year, grado);
            assignCierreData({ year, grado: gradoName });
            console.log('cargando');
        }
    });
});

function rellanarSelectGradpos(listado) {
    listado.forEach((grado) => {
        let option = document.createElement('option');
        option.value = grado.id_grado;
        option.text = grado.descripcion + ' ' + grado.seccionDescripcion;
        this.slcGradosDisponibles.appendChild(option);
    });
}

function rellanarSelectYearsActive(listado) {
    listado.forEach((year) => {
        console.log('year=', year);
        let option = document.createElement('option');
        option.value = year;
        option.text = year;
        this.slcCargarYearDisponible.appendChild(option);
    });
}

function cargarCalificacionResumenFinalRecuper(year, idgrado) {
    console.log(idgrado);
    apiadmin
        .getctk(`grado/cierreverresumenfinalalumnos/${year}/${idgrado}`)
        .then((listado) => {
            console.log(listado);
            tablesUtil.rellenarTbResumenFinalCierre(
                listado,
                tableCierreEscolar
            );
            // console.log(listado);
        })
        .catch((error) => {
            console.log('error? ' + error);
            // tablesUtil.vaciarTabla(tbBoletaPreview)
        });
}

function cargarGradosActivos() {
    apiadmin
        .getctk('grado/listadodto')
        .then((listado) => {
            // console.log(listado);
            rellanarSelectGradpos(listado);
        })
        .catch((error) => {
            console.log('error? ' + error);
        });
}

function evaluarAlumnosPasarGrado() {
    apiadmin
        .put('grado/cierreevaluarpasaralumnos')
        .then((response) => {
            console.log('response [PASAR GRADOS] =', response);
        })
        .catch((error) => {
            console.log('error? ' + error);
        });
}

function inactivarCurso() {
    apiadmin
        .put('grado/cierredesactivaryearactual')
        .then((response) => {
            console.log('response [CIERRE ESCOLAR] =', response);
        })
        .catch((error) => {
            console.log('error? ' + error);
        });
}

function insertar_curso_nuevo() {
    apiadmin
        .put('grado/ingresaryearescolar')
        .then((response) => {
            console.log('response [INGRESAR AÑO ESCOLAR] =', response);
        })
        .catch((error) => {
            console.log('error? ' + error);
        });
}

function cargarGradosActivos() {
    apiadmin
        .getctk('grado/listadodto')
        .then((listado) => {
            // console.log(listado);
            rellanarSelectGradpos(listado);
        })
        .catch((error) => {
            console.log('error? ' + error);
        });
}

function cargarYearsActives() {
    apiadmin
        .getctk('grado/listyearsactive')
        .then((listado) => {
            console.log('listado =', listado);
            rellanarSelectYearsActive(listado);
        })
        .catch((error) => {
            console.log('error? ' + error);
        });
}

const assignCierreData = (obj) => {
    localStorage.setItem('cierreVals', JSON.stringify({ ...obj }));
};
