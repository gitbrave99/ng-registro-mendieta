var sesion               = new SesionLocal()
var btnLogout            = document.getElementById("cerrarSesion");
var formmdEliminar       = document.forms["frmEliminarUsuario"] 
sesion.validateSesion();
/**
 * SECCION ADMIN
*/
var gestionAdmin            = null;
var tableListAdmins         = document.querySelector("#tableAdminRegs tbody")
var formNewAdmin            = document.forms["formIngresoAdmin"]
var btnActulizarAdmin       = document.getElementById("btnActulizarAdmin")
var btnCancelActulizarAdmin = document.getElementById("btnCancelActualizarAdmin")
var btnAgregarAdmin         = document.getElementById("btnRegisAdmin");
/* FIN SECCION ADMIN*/



/*
* SECCION ALUMNO
*/
var gestionAlumno            = null;
var selectGradosCursarAlumno = document.querySelector("#slcGradoCursarAlumno")
var selecGradosalumnos       = document.querySelector("#selectListGradoalumnos")
var tableListAlumnos         = document.querySelector("#tableAlumnosReg tbody")
var formNewAlumno            = document.forms["frmIngresoAlumno"]
var btnAgregarAlumno         = document.getElementById("btnRegisAlumno")
var btnActulizarAlumno       = document.getElementById("btnActulizarAlumno")
var btnCancelActulizarAlumno = document.getElementById("btnCancelActualizarAlumno")
var slcCargarListAlumnoActIn = document.querySelector("#slcCargarListAlumnoActInact")
var statusAlumno             = 1;
var previdGradoAlumno        = 0;
/* FIN SECCION ALUMNO*/

/*SECCION DOCENTE*/
var gestionDocente            = null;
var tableListMateriasDocente  = document.querySelector("#tableListMateriasDocente tbody")
var btnSelecMateraiDar        = document.getElementById("btnSelecMateraiDar")
var selectGradoResponsable    = document.querySelector("#selectListGradoResponsable")
var slcGradoDarMateria        = document.querySelector("#slcGradoDarMateria")
var selcMateriaDarDocente     = document.querySelector("#selcMateriaDarDocente")
var tableListDocentes         = document.querySelector("#tableListDocentes tbody");
var formNewDocente            = document.forms["frmIngresoDocente"]
var btnAgregarDocente         = document.getElementById("btnRegisDocente")
var btnActulizarDocente       = document.getElementById("btnActulizarDocente")
var btnCancelActulizarDocente = document.getElementById("btnCancelActualizarDocente")
var spnIdsGradoDar            = document.querySelectorAll("idsgradodar")
var spnIdsMateriasDar         = document.querySelectorAll("idsmateriasdar")
var rowMateriaDar             = document.querySelectorAll(".rowDataMatDar")
var inputTotalMateriasReg     = document.querySelector("#totalMateriasReg")

document.addEventListener("DOMContentLoaded", (evt) => {
    
    var btnSDelAdmin =  document.getElementsByClassName("btnDelAdmin")

    btnLogout.addEventListener("click", (evt) => {
        sesion.destroySesion();
    });

    

    if (sesion.getToken != null && sesion.getToken != undefined) {
        gestionAdmin = new GestionUsuarioAdmin(sesion.getToken, formNewAdmin, tableListAdmins, btnAgregarAdmin, btnActulizarAdmin, btnCancelActulizarAdmin);
        gestionAdmin.cargarAdmins(tableListAdmins);
        gestionAdmin.setInputIdEliminar=usuarioDeleteAdmin;

        gestionAlumno = new GestionUsuarioAlumno(sesion.getToken, formNewAlumno, tableListAlumnos, selectGradosCursarAlumno, selecGradosalumnos, btnAgregarAlumno, btnActulizarAlumno, btnCancelActulizarAlumno);
        gestionAlumno.cargarGrados()
        
        gestionDocente = new GestionUsuarioDocente(sesion.getToken, formNewDocente, tableListDocentes, tableListMateriasDocente,selectGradoResponsable, slcGradoDarMateria,selcMateriaDarDocente,btnAgregarDocente, btnActulizarDocente, btnCancelActulizarDocente,
            inputTotalMateriasReg);
        gestionDocente.cargarGrados()
        gestionDocente.cargarDocentes();
        gestionDocente.setInputIdEliminar=usuarioDeleteDocente;

    }
    /*SECCION ALUMNO*/
    formNewAlumno["nieAlumno"].addEventListener("input",(evt)=>{
        formNewAlumno["usuarioAlumno"].value = evt.target.value;
    });

    slcCargarListAlumnoActIn.addEventListener("change",(evt)=>{
        let estado = evt.target.value;
        statusAlumno= estado;
        if(previdGradoAlumno==0 || !previdGradoAlumno){return}
        console.log("[STS] idgrdo= ",previdGradoAlumno," estado= ", statusAlumno);
        gestionAlumno.cargarAlumnos(previdGradoAlumno,statusAlumno)
    })

    selecGradosalumnos.addEventListener("change", (evt) => {
        let value = evt.target.value
        previdGradoAlumno = value;
        console.log("[SLC] idgrdo= ",previdGradoAlumno," estado= ", statusAlumno);
        gestionAlumno.cargarAlumnos(previdGradoAlumno,statusAlumno)
    });

    formNewAlumno.addEventListener("submit", (evt) => {
        evt.preventDefault()
        gestionAlumno.agregarAlumno()
    });

    btnCancelActulizarAlumno.addEventListener("click", (evt) => {
        gestionAlumno.deshabilitarActualizacion()
        gestionAlumno.clearFormAlumno()
    });

    btnActulizarAlumno.addEventListener("click", (evt) => {
        slcCargarListAlumnoActIn.selectedIndex=1;
        gestionAlumno.editarAlumno();
        gestionAlumno.deshabilitarActualizacion()
        gestionAlumno.clearFormAlumno()
    });


    /* FIN SECCION ALUMNO*/





    /*SECCION ADMINISTRADOR*/
    formNewAdmin["duiAdmin"].addEventListener("input",(evt)=>{
        formNewAdmin["usuarioAdmin"].value = evt.target.value;
    });

    formNewAdmin.addEventListener("submit", (evt) => {
        evt.preventDefault()
        gestionAdmin.agregarAdmin()
    });

    btnCancelActulizarAdmin.addEventListener("click", (evt) => {
        gestionAdmin.deshabilitarActualizacion()
        gestionAdmin.clearFormAdmin()
    });

    btnActulizarAdmin.addEventListener("click", (evt) => {
        gestionAdmin.editarAdmin();
        gestionAdmin.deshabilitarActualizacion()
        gestionAdmin.clearFormAdmin()
    });

    formmdEliminar.addEventListener("submit",(evt)=>{
        evt.preventDefault();
        if (formmdEliminar["usuarioDeleteAdmin"].value>0) {
            gestionAdmin.eliminarAdmin(formmdEliminar["usuarioDeleteAdmin"].value);
            console.log(formmdEliminar["usuarioDeleteAdmin"].value);
            formmdEliminar["usuarioDeleteAdmin"].value   =""
            formmdEliminar["usuarioDeleteDocente"].value =""
            $("#mdDeleteUsuario").modal("hide");
        }

        if (formmdEliminar["usuarioDeleteDocente"].value >0) {
            gestionDocente.eliminarProfesor(formmdEliminar["usuarioDeleteDocente"].value);
            formmdEliminar["usuarioDeleteDocente"].value = ""
            formmdEliminar["usuarioDeleteAdmin"].value   = ""
            $("#mdDeleteUsuario").modal("hide");
        }

    })

 
    /*FIN SECCION ADMINISTRADOR*/






    /*SECCION DOCENTE */
    formNewDocente["duiDocente"].addEventListener("input",(evt)=>{
        formNewDocente["usuarioDocente"].value = evt.target.value;
    });

    formNewDocente.addEventListener("submit", (evt) => {
        evt.preventDefault()
        gestionDocente.agregarDocente()
        setTimeout(()=>{
            tableListMateriasDocente.innerHTML=""
        }, 4000)
    });

    btnCancelActulizarDocente.addEventListener("click", (evt) => {
        gestionDocente.deshabilitarActualizacion()
        gestionDocente.clearFormDocente()
        setTimeout(()=>{
            tableListMateriasDocente.innerHTML=""
        }, 4000)
    });

    btnActulizarDocente.addEventListener("click", (evt) => {
        gestionDocente.editarDocente();
    
        gestionDocente.deshabilitarActualizacion()
        gestionDocente.clearFormDocente();
        setTimeout(()=>{
            tableListMateriasDocente.innerHTML=""
        }, 4000)
        
    });

    btnSelecMateraiDar.addEventListener("click",evt=>{
        gestionDocente.crearFilaTablaMateriasSelProfesor()
    });
    slcGradoDarMateria.addEventListener("change",(evt)=>{
        gestionDocente.cargarMateriaDar(evt.target.value)
    })
 

    /* FIN SECCION DOCENTE */
    

});











