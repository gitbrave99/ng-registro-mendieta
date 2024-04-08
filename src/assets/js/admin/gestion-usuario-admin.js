class GestionUsuarioAdmin {

    constructor(token, formAdmin, tableAdmin, btnAgregar, btnActualizar, btnCancelar) {
        this.utils = new Utils();
        this.alerts=  new AllAlerts();
        this.tableUtils = new TableUtils();
        this.formsUtils = new FormUtils();
        this.formAdmin = formAdmin;
        this.tableAdmin = tableAdmin;
        this.apiadmin = new ApiUtils(this.utils.baseUrl, token);
        this.btnAgregar = btnAgregar;
        this.btnActualizar = btnActualizar;
        this.btnCancelar = btnCancelar

    }

    set setInputIdEliminar(input) {
        this.inputIdEliminar = input
    }

    cargarAdmins() {
        this.apiadmin.getctk("admin/listadodto")
            .then((listado) => {
                this.tableUtils.rellenarTableAdmins(listado, this.tableAdmin);
            }).catch((error) => {
                console.log("error? " + error);
            });
    }

    eliminarAdmin(id) {
        this.apiadmin.delete(`admin/eliminar/${id}`)
            .then((response) => {
                if (response.estado === "eliminado correctamente") {
                    this.alerts.Result("success","Eliminado correctamente")
                } else {
                    this.alerts.Result("error","No se pudo eliminar")
                }
                this.cargarAdmins();
            }).catch((error) => {
                console.log("error? " + error);
            });
    }

    prepararAdminEliminar(id) {
        this.inputIdEliminar.value = id
    }

    cargarAdminModificar(id) {
        this.apiadmin.getctk(`admin/data/${id}`)
            .then((admin) => {
                console.log(admin);
                this.cargarDatosFormAdmin(admin)
                this.habilitarActualizacion()
            })
            .catch((error) => {
                console.log("error? " + error);
            });
    }


    cargarDatosFormAdmin(datos) {
        console.log(datos);
        this.formAdmin["dataadmin"].value = datos.id_profesor
        this.formAdmin["nombreAdmin"].value = datos.nombre
        this.formAdmin["telefonoAdmin"].value = datos.telefono
        this.formAdmin["duiAdmin"].value = datos.dui
        this.formAdmin["emailAdmin"].value = datos.email
        this.formAdmin["generoAdmin"].value = datos.genero
        this.formAdmin["usuarioAdmin"].value = datos.dtusuarioUsuario
    }


    agregarAdmin() {
        let datos = {}
        datos.nombre = this.formAdmin["nombreAdmin"].value
        datos.genero = this.formAdmin["generoAdmin"].value
        datos.dui = this.formAdmin["duiAdmin"].value
        datos.email = this.formAdmin["emailAdmin"].value
        datos.telefono = this.formAdmin["telefonoAdmin"].value
        datos.dtusuarioUsuario = this.formAdmin["usuarioAdmin"].value

        this.apiadmin.post("admin/guardar", datos).
            then((response) => {
                console.log(response);
                if (response.estado === "agregado correctamente") {
                    this.alerts.Result("success","Agregado correctamente")
                    this.formsUtils.clearFormData(this.formAdmin);
                } else if(response.estado ==="error al guardar"){
                    this.alerts.Result("error","No se pudo guardar")
                }else{
                    this.alerts.Result("error",response.estado)
                }
                this.cargarAdmins();
            })
            .catch((error) => {
                console.log("error= " + error);
            })
    }

    editarAdmin() {
        let datos = {}
        datos.id_profesor = this.formAdmin["dataadmin"].value
        datos.nombre = this.formAdmin["nombreAdmin"].value
        datos.genero = this.formAdmin["generoAdmin"].value
        datos.dui = this.formAdmin["duiAdmin"].value
        datos.email = this.formAdmin["emailAdmin"].value
        datos.telefono = this.formAdmin["telefonoAdmin"].value
        datos.dtusuarioUsuario = this.formAdmin["usuarioAdmin"].value

        this.apiadmin.put("admin/actualizar", datos).
            then((response) => {
                
                if (response.estado === "actualizado correctamente") {
                    this.alerts.Result("success","Actualizado correctamente")
                } else {
                    this.alerts.Result("error","No se pudo actualizar")
                }
                this.formsUtils.clearFormData(this.formAdmin);
                this.deshabilitarActualizacion()
                this.cargarAdmins();
            })
            .catch((error) => {
                console.log("error= " + error);
            })
    }


    clearFormAdmin() {
        this.formsUtils.clearFormData(this.formAdmin);
    }
    habilitarActualizacion() {
        this.utils.disableButton(this.btnAgregar)
        this.utils.enableButton(this.btnActualizar)
        this.utils.enableButton(this.btnCancelar)
        this.formAdmin["duiAdmin"].disabled = true;
    }

    deshabilitarActualizacion() {
        this.utils.enableButton(this.btnAgregar)
        this.utils.disableButton(this.btnActualizar)
        this.utils.disableButton(this.btnCancelar)
        this.formAdmin["duiAdmin"].disabled = false;
    }
}