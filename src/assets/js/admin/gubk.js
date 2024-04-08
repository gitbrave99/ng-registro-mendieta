var utils = new Util();
var tables = new TableUtils();
var formsUtils = new FormUtils();
var tablesUtil = new TableUtils();
var sesion = new SesionLocal()
var apiadmin = null
var btnLogout = document.getElementById("cerrarSesion");
var tableListDocentes = document.querySelector("#tableListDocentes tbody");
var tableListAlumnos = document.querySelector("#tableAlumnosReg tbody")

var tableListAdmins         = document.querySelector("#tableAdminRegs tbody")
var formNewAdmin            = document.forms["formIngresoAdmin"]
var btnActulizarAdmin       = document.getElementById("btnActulizarAdmin")
var btnCancelActulizarAdmin = document.getElementById("btnCancelActualizarAdmin")
var btnRegisAdmin           = document.getElementById("btnRegisAdmin")

var formNewDocente = document.forms["frmIngresoDocente"]
var formNewAlumno = document.forms["frmIngresoAlumno"]
var selecGradosalumnos= document.querySelector("#selectListGradoalumnos")
var selectGradosCursarAlumno = document.querySelector("#slcGradoCursarAlumno")

sesion.validateSesion();
document.addEventListener("DOMContentLoaded", (evt) => {

    if (sesion.getToken != null && sesion.getToken != undefined) {
        apiadmin = new ApiUtils(utils.baseUrl, sesion.getToken);
        cargarAdmins();
        cargarDocentes();
        cargarGrados();
    }
    btnLogout.addEventListener("click", (evt) => {
        sesion.destroySesion();
    });

    formNewAdmin.addEventListener("submit", (evt) => {
        evt.preventDefault();
        // agregarAdmin();
        validarAdminAA()
    });

    formNewAlumno.addEventListener("submit", (evt) => {
        evt.preventDefault();
        // agregarAdmin();
         validarAlumnoAA();
          
    });

    selecGradosalumnos.addEventListener("change",(evt)=>{
        let value =evt.target.value
        console.log("id ",value);
        cargarAlumnos(value)
    });

    btnCancelActulizarAdmin.addEventListener("click",(evt)=>{
        console.log("reseting");
        btnRegisAdmin.classList.remove("btndisabled")
        btnRegisAdmin.disabled=false
        btnActulizarAdmin.classList.add("btndisabled")
        btnActulizarAdmin.disabled=true
        btnCancelActulizarAdmin.classList.add("btndisabled")
        btnCancelActulizarAdmin.disabled=true
        formsUtils.clearFormData(formNewAdmin);
    });
    

});

function cargarAlumnos(id) {
    apiadmin.getctk(`grado/alumnosgrado/${id}`)
        .then((listado) => {
            console.log(listado);
            tablesUtil.rellenarTablaAlumnosEditar(listado, tableListAlumnos);
        })
        .catch((error) => {
            console.log("error? " + error);
            tablesUtil.vaciarTabla(tableListAlumnos)
        });
}

function cargarAdmins() {
    apiadmin.getctk("admin/listadodto")
        .then((listado) => {
            tables.rellenarTableAdmins(listado, tableListAdmins);
        }).catch((error) => {
            console.log("error? " + error);
        });
}

function cargarDocentes() {
    apiadmin.getctk("profesor/listadodto")
        .then((listado) => {
            tables.rellenarTableDocentes(listado, tableListDocentes);
        }).catch((error) => {
            console.log("error? " + error);
        });
}
function cargarGrados() {
    apiadmin.getctk("grado/listadodto")
    .then((listado) => {
        rellanarSelectGradpos(listado)
    }).catch((error) => {
        console.log("error? " + error);
    });
}


function rellanarSelectGradpos(listado) {
    listado.forEach((grado) => {
        let option = document.createElement("option");
        option.value = grado.id_grado
        option.text = grado.descripcion +" "+ grado.seccionDescripcion
        selectGradosCursarAlumno.appendChild(option);

        let optiongrcur = document.createElement("option");
        optiongrcur.value = grado.id_grado
        optiongrcur.text = grado.descripcion +" "+ grado.seccionDescripcion
        selecGradosalumnos.appendChild(optiongrcur);
        
    });
}

function validarAdminAA() {
    let value= formNewAdmin["dataadmin"].value
    if (value !== undefined || value!=="" ||value !==null||value!==0) {
        editarAdmin();
        return;
    }
    agregarAdmin()
}

function agregarAdmin() {
    let datos = {}
    datos.nombre = formNewAdmin["nombreAdmin"].value
    datos.genero = formNewAdmin["telefonoAdmin"].value
    datos.dui = formNewAdmin["duiAdmin"].value
    datos.email = formNewAdmin["emailAdmin"].value
    datos.telefono = formNewAdmin["duiAdmin"].value
    datos.dtusuarioUsuario = formNewAdmin["usuarioAdmin"].value
    apiadmin.post("admin/guardar", datos).
        then((response) => {
            console.log(response);
            formsUtils.clearFormData(formNewAdmin);
            cargarAdmins();
        })
        .catch((error) => {
            console.log("error= " + error);
        })
}

function editarAdmin() {
    let datos = {}
    datos.id_profesor= formNewAdmin["dataadmin"].value
    datos.nombre = formNewAdmin["nombreAdmin"].value
    datos.genero = formNewAdmin["telefonoAdmin"].value
    datos.dui = formNewAdmin["duiAdmin"].value
    datos.email = formNewAdmin["emailAdmin"].value
    datos.telefono = formNewAdmin["duiAdmin"].value
    datos.dtusuarioUsuario = formNewAdmin["usuarioAdmin"].value
    console.log(datos);
    apiadmin.put("admin/actualizar", datos).
        then((response) => {
            console.log(response);
            formsUtils.clearFormData(formNewAdmin);
            btnRegisAdmin.classList.add("btndisabled")
            btnActulizarAdmin.classList.remove("btndisabled")
            btnCancelActulizarAdmin.classList.remove("btndisabled")
            cargarAdmins();
        })
        .catch((error) => {
            console.log("error= " + error);
        })
}



function cargarAdminModificar(id) {
    apiadmin.getctk(`admin/data/${id}`)
    .then((admin) => {
        console.log(admin);
        cargarDatosFormAdmin(admin)

        btnRegisAdmin.classList.add("btndisabled")
        btnRegisAdmin.disabled=true

        btnActulizarAdmin.classList.remove("btndisabled")
        btnActulizarAdmin.disabled=false
        btnCancelActulizarAdmin.classList.remove("btndisabled")
        btnCancelActulizarAdmin.disabled=false
    })
    .catch((error) => {
        console.log("error? " + error);
    });
}

function cargarDatosFormAdmin(datos) {    
    formNewAdmin["dataadmin"].value     = datos.id_profesor 
    formNewAdmin["nombreAdmin"].value   = datos.nombre 
    formNewAdmin["telefonoAdmin"].value = datos.genero 
    formNewAdmin["duiAdmin"].value      = datos.dui 
    formNewAdmin["emailAdmin"].value    = datos.email
    formNewAdmin["duiAdmin"].value      = datos.telefono 
    formNewAdmin["usuarioAdmin"].value  = datos.dtusuarioUsuario
}

//DATOS DEL PROFESOR
function cargarDocenteModificar(id) {

    apiadmin.getctk(`profesor/data/${id}`)
    .then((profe) => {
        console.log(profe);
        cargarDatosFormProfesor(profe)
    })
    .catch((error) => {
        console.log("error? " + error);
    });
}
function cargarDatosFormProfesor(datos) {
    formNewDocente["datadocente"].value   = datos.id_profesor 
    formNewDocente["nombreDocente"].value   = datos.nombre 
    formNewDocente["telefonoDocente"].value = datos.genero 
    formNewDocente["emailDocente"].value      = datos.email 
    formNewDocente["duiDocente"].value    = datos.dui
    formNewDocente["nipDocente"].value      = datos.nip 
    
}


//DATOS DEL ALUMNO
// *****************************************************
// *****************************************************
var btnAgregarAlumno = document.getElementById("btnAgregarAlumno")
var btnActulizarAlumno = document.getElementById("btnActulizarAlumno")

function validarAlumnoAA() {
    let value= formNewAlumno["data"].value
    if (value !== undefined || value!=="" ||value !==null||value!==0) {
        actualizarAlumno();
        return;
    }
    agregarAlumno()
}


function agregarAlumno() {
    let datos = {}
    datos.nombre           = formNewAlumno["nombreAlumno"].value              
    datos.nie              = formNewAlumno["nieAlumno"].value                 
    datos.fecha_nacimiento = formNewAlumno["fechanNaciAlumno"].value          
    datos.fecha_ingreso    = formNewAlumno["fechaIngresoAlumno"].value        
    datos.genero           = formNewAlumno["generoAlumno"].value              
    datos.dtusuarioUsuario = formNewAlumno["usuarioAlumno"].value   
    datos.gradoIdGrado     = formNewAlumno["slcGradoCursarAlumno"].value      
    datos.encargado_nombre = formNewAlumno["nombreResonsbleAlumno"].value     
    datos.telefono         = formNewAlumno["telefonoResponsableAlumno"].value 
    datos.encargado_dui    = formNewAlumno["duiResponsableAlumno"].value   
    //datos.dtusuarioUsuario =   
    apiadmin.post("alumno/guardar", datos).
        then((response) => {
            console.log(response);
            formsUtils.clearFormData(formNewAlumno);
            //cargar alumnos del grado seleccionado
        })
        .catch((error) => {
            console.log("error= " + error);
        })
}

function actualizarAlumno() {
    let datos = {}
    datos.id_alumno        = formNewAlumno["data"].value  
    datos.nombre           = formNewAlumno["nombreAlumno"].value              
    datos.nie              = formNewAlumno["nieAlumno"].value                 
    datos.fecha_nacimiento = formNewAlumno["fechanNaciAlumno"].value          
    datos.fecha_ingreso    = formNewAlumno["fechaIngresoAlumno"].value        
    datos.genero           = formNewAlumno["generoAlumno"].value              
    datos.dtusuarioUsuario = formNewAlumno["usuarioAlumno"].value   
    datos.gradoIdGrado     = formNewAlumno["slcGradoCursarAlumno"].value      
    datos.encargado_nombre = formNewAlumno["nombreResonsbleAlumno"].value     
    datos.telefono         = formNewAlumno["telefonoResponsableAlumno"].value 
    datos.encargado_dui    = formNewAlumno["duiResponsableAlumno"].value   
    console.log(datos);
    apiadmin.put("alumno/actualizar", datos).
        then((response) => {
            console.log(response);
            btnActulizarAlumno.style.display="none"
            btnAgregarAlumno.style.display="block"
            formsUtils.clearFormData(formNewAlumno);
            //cargar alumnos del grado seleccionado
        })
        .catch((error) => {
            console.log("error= " + error);
        })
}

function cargarAlumnoModificar(id) {
    console.log(id);
    apiadmin.getctk(`alumno/data/${id}`)
    .then((alumno) => {
        console.log(alumno);
        cargarDatosFormAlumno(alumno)
        btnActulizarAlumno.style.display="block"
        btnAgregarAlumno.style.display="none"
    })
    .catch((error) => {
        console.log("error? " + error);
    });
}


function cargarDatosFormAlumno(datos) {
    formNewAlumno["data"].value                      = datos.id_alumno
    formNewAlumno["nombreAlumno"].value              = datos.nombre 
    formNewAlumno["nieAlumno"].value                 = datos.nie
    formNewAlumno["fechanNaciAlumno"].value          = datos.fecha_nacimiento 
    formNewAlumno["fechaIngresoAlumno"].value        = datos.fecha_ingreso
    formNewAlumno["generoAlumno"].value              = datos.genero 
    formNewAlumno["slcGradoCursarAlumno"].value      = datos.gradoIdGrado 
    formNewAlumno["nombreResonsbleAlumno"].value     = datos.encargado_nombre 
    formNewAlumno["telefonoResponsableAlumno"].value = datos.telefono 
    formNewAlumno["duiResponsableAlumno"].value      = datos.encargado_dui
    formNewAlumno["usuarioAlumno"].value             = datos.dtusuarioUsuario
}
















