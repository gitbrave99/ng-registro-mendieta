class GestionUsuarioAlumno {
    // selecgrados
    constructor(
        token,
        formAlumno,
        tableAlumno,
        selectAlumnoGrados,
        selecGradosalumnos,
        btnAgregar,
        btnActualizar,
        btnCancelar
    ) {
        this.utils = new Utils();
        this.tableUtils = new TableUtils();
        this.formsUtils = new FormUtils();
        this.alerts = new AllAlerts();
        this.formAlumno = formAlumno;
        this.tableAlumno = tableAlumno;
        this.btnAgregar = btnAgregar;
        this.btnActualizar = btnActualizar;
        this.btnCancelar = btnCancelar;
        this.apiadmin = new ApiUtils(this.utils.baseUrl, token);
        this.selectAlumnoGrados = selectAlumnoGrados;
        this.selecGradosalumnos = selecGradosalumnos;
    }

    cargarGrados() {
        this.apiadmin
            .getctk('grado/listadodto')
            .then((listado) => {
                // console.log(listado);
                this.rellanarSelectGradpos(listado);
            })
            .catch((error) => {
                console.log('error? ' + error);
            });
    }

    rellanarSelectGradpos(listado) {
        listado.forEach((grado) => {
            let option = document.createElement('option');
            option.value = grado.id_grado;
            option.text = grado.descripcion + ' ' + grado.seccionDescripcion;
            this.selectAlumnoGrados.appendChild(option);

            let optiongrcur = document.createElement('option');
            optiongrcur.value = grado.id_grado;
            optiongrcur.text =
                grado.descripcion + ' ' + grado.seccionDescripcion;
            this.selecGradosalumnos.appendChild(optiongrcur);
        });
    }

    cargarAlumnos(id, status = 1) {
        this.apiadmin
            .getctk(`grado/alumnosgrado/${id}/${status}`)
            .then((listado) => {
                if (listado.estado === 'No hay datos') {
                    this.tableAlumno.innerHTML = '';
                    return;
                }
                this.tableUtils.rellenarTablaAlumnosEditar(
                    listado,
                    this.tableAlumno
                );
            })
            .catch((error) => {
                console.log('error? ' + error);
            });
    }

    cargarAlumnoModificar(id) {
        console.log(id);
        this.apiadmin
            .getctk(`alumno/data/${id}`)
            .then((alumno) => {
                console.log(alumno);
                this.cargarDatosFormAlumno(alumno);
                this.habilitarActualizacion();
            })
            .catch((error) => {
                console.log('error? ' + error);
            });
    }

    cargarDatosFormAlumno(datos) {
        this.formAlumno['data'].value = datos.id_alumno;
        this.formAlumno['nombreAlumno'].value = datos.nombre;
        this.formAlumno['emailAlumnoAlumno'].value = datos.email;
        this.formAlumno['apellidoAlumno'].value = datos.apellido;
        this.formAlumno['nieAlumno'].value = datos.nie;
        this.formAlumno['fechanNaciAlumno'].value = datos.fecha_nacimiento;
        this.formAlumno['fechaIngresoAlumno'].value = datos.fecha_ingreso;
        this.formAlumno['generoAlumno'].value = datos.genero;
        this.formAlumno['slcGradoCursarAlumno'].value = datos.gradoIdGrado;
        this.formAlumno['nombreResonsbleAlumno'].value = datos.encargado_nombre;
        this.formAlumno['telefonoResponsableAlumno'].value = datos.telefono;
        this.formAlumno['duiResponsableAlumno'].value = datos.encargado_dui;
        this.formAlumno['usuarioAlumno'].value = datos.dtusuarioUsuario;
        this.formAlumno['estadoAlumno'].value = datos.es_activo;
    }

    agregarAlumno() {
        let datos = {};
        datos.nombre = this.formAlumno['nombreAlumno'].value;
        datos.apellido = this.formAlumno['apellidoAlumno'].value;
        datos.nie = this.formAlumno['nieAlumno'].value;
        datos.email = this.formAlumno['emailAlumnoAlumno'].value;
        datos.fecha_nacimiento = this.formAlumno['fechanNaciAlumno'].value;
        datos.fecha_ingreso = this.formAlumno['fechaIngresoAlumno'].value;
        datos.genero = this.formAlumno['generoAlumno'].value;
        datos.es_activo = this.formAlumno['estadoAlumno'].value;
        datos.dtusuarioUsuario = this.formAlumno['usuarioAlumno'].value;
        datos.gradoIdGrado = this.formAlumno['slcGradoCursarAlumno'].value;
        datos.encargado_nombre = this.formAlumno['nombreResonsbleAlumno'].value;
        datos.telefono = this.formAlumno['telefonoResponsableAlumno'].value;
        datos.encargado_dui = this.formAlumno['duiResponsableAlumno'].value;
        //datos.dtusuarioUsuario =
        this.apiadmin
            .post('alumno/guardar', datos)
            .then((response) => {
                if (response.estado === 'Agregado correctamente') {
                    this.alerts.Result('success', 'Agregado correctamente');
                    this.formsUtils.clearFormData(this.formAlumno);
                } else if (response.estado === 'No se pudo guardar') {
                    this.alerts.Result('error', 'No se pudo guardar');
                } else {
                    this.alerts.Result('error', response.estado);
                }
                //cargar alumnos del grado seleccionado
            })
            .catch((error) => {
                console.log('error= ' + error);
                this.alerts.Result('error', 'No se pudo guardar');
            });
    }

    editarAlumno() {
        let datos = {};
        datos.id_alumno = this.formAlumno['data'].value;
        datos.nombre = this.formAlumno['nombreAlumno'].value;
        datos.email = this.formAlumno['emailAlumnoAlumno'].value;
        datos.apellido = this.formAlumno['apellidoAlumno'].value;
        datos.nie = this.formAlumno['nieAlumno'].value;
        datos.fecha_nacimiento = this.formAlumno['fechanNaciAlumno'].value;
        datos.fecha_ingreso = this.formAlumno['fechaIngresoAlumno'].value;
        datos.genero = this.formAlumno['generoAlumno'].value;
        let statusselect = this.formAlumno['estadoAlumno'].value;
        datos.es_activo = statusselect == '1' ? 1 : 0;
        datos.dtusuarioUsuario = this.formAlumno['usuarioAlumno'].value;
        datos.gradoIdGrado = this.formAlumno['slcGradoCursarAlumno'].value;
        datos.encargado_nombre = this.formAlumno['nombreResonsbleAlumno'].value;
        datos.telefono = this.formAlumno['telefonoResponsableAlumno'].value;
        datos.encargado_dui = this.formAlumno['duiResponsableAlumno'].value;
        console.log(datos);
        this.apiadmin
            .put('alumno/actualizar', datos)
            .then((response) => {
                console.log(response);
                if (response.estado === 'Actualizado correctamente') {
                    this.alerts.Result('success', 'Actualizado correctamente');
                } else {
                    this.alerts.Result('error', 'No se pudo actualizar');
                }
                this.formsUtils.clearFormData(this.formAlumno);
                this.deshabilitarActualizacion();
                let gradoLastSelected = this.selecGradosalumnos.value;
                this.cargarAlumnos(gradoLastSelected);
            })
            .catch((error) => {
                console.log('error= ' + error);
                this.alerts.Result('error', 'No se pudo actualizar');
            });
    }

    clearFormAlumno() {
        this.formsUtils.clearFormData(this.formAlumno);
    }
    habilitarActualizacion() {
        this.utils.disableButton(this.btnAgregar);
        this.utils.enableButton(this.btnActualizar);
        this.utils.enableButton(this.btnCancelar);
        this.formAlumno['nieAlumno'].disabled = true;
    }

    deshabilitarActualizacion() {
        this.utils.enableButton(this.btnAgregar);
        this.utils.disableButton(this.btnActualizar);
        this.utils.disableButton(this.btnCancelar);
        this.formAlumno['nieAlumno'].disabled = false;
    }
}
