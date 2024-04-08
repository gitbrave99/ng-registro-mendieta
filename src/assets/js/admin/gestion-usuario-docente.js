class GestionUsuarioDocente {
    // selecgrados 
    constructor(token, formDocente, tableDocente, tableMateriarDar, selectGradoResponsable, selectGradoMateria, selcMateriaDarDocente, btnAgregar, btnActualizar, btnCancelar, inputTotalMateriasReg) {
        this.utils = new Utils();
        this.tableUtils = new TableUtils();
        this.formsUtils = new FormUtils();
        this.alerts = new AllAlerts();
        this.formDocente = formDocente;
        this.tableDocente = tableDocente;
        this.tableMateriarDar = tableMateriarDar;
        this.btnAgregar = btnAgregar;
        this.btnActualizar = btnActualizar;
        this.btnCancelar = btnCancelar
        this.apiadmin = new ApiUtils(this.utils.baseUrl, token);
        this.selectGradoResponsable = selectGradoResponsable
        this.selectGradoMateria = selectGradoMateria
        this.selcMateriaDarDocente = selcMateriaDarDocente
        this.mateterisDar = [];
        this.mateterisDarEliminadas = [];
        this.inputTotalMateriasReg = inputTotalMateriasReg
    }

    set setInputIdEliminar(input) {
        this.inputIdEliminar = input
    }

    eliminarProfesor(id) {
        this.apiadmin.delete(`profesor/eliminar/${id}`)
            .then((response) => {
                if (response.estado === "eliminado correctamente") {
                    this.alerts.Result("success", "Eliminado correctamente")
                } else {
                    this.alerts.Result("error", "No se pudo eliminar")
                }
                this.cargarDocentes();
            }).catch((error) => {
                console.log("error? " + error);
            });
    }


    prepararDocenteEliminar(id) {
        this.inputIdEliminar.value = id
    }


    cargarGrados() {
        this.apiadmin.getctk("grado/listadodto")
            .then((listado) => {
                this.rellanarSelectGradosResponsables(listado)
            }).catch((error) => {
                console.log("error? " + error);
            });
    }


    cargarMateriaDar(idgrado) {
        this.apiadmin.getctk(`materia/${idgrado}`)
            .then((listado) => {
                this.rellanarSelectMateriaDar(listado, this.selcMateriaDarDocente);
            }).catch((error) => {
                console.log("error? " + error);
            });
    }

    cargarGradosyMateriasCalificar(profe) {
        this.apiadmin.getctk(`profesor/materiascalificar/${profe.id_profesor}`)
            .then((listado) => {
                this.inputTotalMateriasReg.value = listado.length
                this.tableUtils.rellenarTablaMateriasDocenteEditarMatCalificar(listado, this.tableMateriarDar)
                // this.tableListMateriasDocente.innerHTML+=this.tableUtils.rowMateriDarDocente(item.id_grado,item.descripcion,1,'test');
            })
            .catch((error) => {
                console.log(error);
                // this.tablesUtil.vaciarTabla(tableListGrado) 
            })
    }



    recargarListadoMateriasArray(idprofesor) {
        console.log("lid profe= ",idprofesor);
        console.log("total rows= ", this.inputTotalMateriasReg.value);
            Array.from(this.tableMateriarDar.children).forEach(row => {
                    let idgrado =   row.children[0].children[0].textContent;
                    let idmateria = row.children[0].children[1].textContent;
                    this.mateterisDar.push({ "idgrado": idgrado, "idmateria": idmateria,"idProfesor":idprofesor })
                });

        console.log("agregadas= ", this.mateterisDar);
        console.log("modificadas= ",this.mateterisDarEliminadas);
    }





    rellanarSelectGradosResponsables(listado) {
        listado.forEach((grado) => {
            let option = document.createElement("option");
            option.value = grado.id_grado
            option.text = grado.descripcion + " " + grado.seccionDescripcion
            this.selectGradoResponsable.appendChild(option);

            let optiongrcur = document.createElement("option");
            optiongrcur.value = grado.id_grado
            optiongrcur.text = grado.descripcion + " " + grado.seccionDescripcion
            this.selectGradoMateria.appendChild(optiongrcur);

        });
    }


    rellanarSelectMateriaDar(listado) {
        this.selcMateriaDarDocente.innerHTML = "";
        let optSel = document.createElement("option");
        optSel.value = null
        optSel.selected = true
        optSel.disabled = true
        optSel.text = "Seleccione uno"
        this.selcMateriaDarDocente.appendChild(optSel);
        listado.forEach((materia) => {
            let option = document.createElement("option");
            option.value = materia.idmateria
            option.text = materia.materia
            this.selcMateriaDarDocente.appendChild(option);

        });
    }



    cargarDocentes() {
        this.apiadmin.getctk("profesor/listadodto")
            .then((listado) => {
                this.tableUtils.rellenarTableDocentes(listado, this.tableDocente);
            }).catch((error) => {
                console.log("error? " + error);
            });
    }
    // 

    cargarDocenteModificar(id) {
        this.mateterisDar=[]
        this.apiadmin.getctk(`profesor/data/${id}`)
            .then((profe) => {
                this.cargarDatosFormProfesor(profe)
                this.cargarGradosyMateriasCalificar(profe)
                this.habilitarActualizacion()
            })
            .catch((error) => {
                console.log("error? " + error);
            });
    }


    /**usandolos */
    cargarDatosFormProfesor(datos) {
        this.formDocente["datadocente"].value = datos.id_profesor
        this.formDocente["nombreDocente"].value = datos.nombre
        this.formDocente["generoDocente"].value = datos.genero
        this.formDocente["emailDocente"].value = datos.email
        this.formDocente["duiDocente"].value = datos.dui
        this.formDocente["nipDocente"].value = datos.nip
        this.formDocente["telefonoDocente"].value = datos.telefono
        this.formDocente["usuarioDocente"].value = datos.dtusuarioUsuario
        this.formDocente["selectListGradoResponsable"].value = datos.dtgradoIdGrado
    }




    getlastIdProfesor() {
        let lastid = 0
        this.apiadmin.getctk("profesor/lastid")
            .then((response) => {
                lastid = response.lastid
                this.agregarMateriasEvaluar(lastid);
            })
            .catch((error) => {
                console.log("error? " + error);
            });
    }


    agregarMateriasDararry() {
        Array.from(this.tableMateriarDar.children).forEach(row => {
            let idgrado = row.children[0].children[0].textContent;
            let idmateria = row.children[0].children[1].textContent;
            this.mateterisDar.push({ "idgrado": idgrado, "idmateria": idmateria })
        });
        // console.log(this.mateterisDar);
        // this.agregarMateriasEvaluar()
    }

    crearFilaTablaMateriasSelProfesor() {
        let gradoSelected = this.formDocente["slcGradoDarMateria"].selectedIndex
        let materiaSelected = this.formDocente["selcMateriaDarDocente"].selectedIndex

        if (gradoSelected < 1 || materiaSelected < 1) {
            return
        }
        let grado = this.formDocente["slcGradoDarMateria"].options[gradoSelected].text;
        let idGrado = this.formDocente["slcGradoDarMateria"].options[gradoSelected].value;
        let materia = this.formDocente["selcMateriaDarDocente"].options[materiaSelected].text;
        let idMateria = this.formDocente["selcMateriaDarDocente"].options[materiaSelected].value;
        this.tableUtils.rellenarTablaMateriasDocente(idGrado, grado, idMateria, materia, this.tableMateriarDar)
    }

    borrarFilaMateriaDar(event) {
        event.stopPropagation();
        let boton = event.target;
        // Obtenemos la fila correspondiente al botón
        let fila = boton.parentNode.parentNode;
        if (this.inputTotalMateriasReg.value > 0) {
            console.log("eliminando");
            this.mateterisDarEliminadas.push({ "idgrado": fila.children[0].children[0].textContent, "idmateria": fila.children[0].children[1].textContent,"idProfesor":null })
        }
        // Obtenemos la tabla correspondiente a la fila
        let tabla = fila.parentNode.parentNode;
        // Eliminamos la fila de la tabla
        this.tableMateriarDar.deleteRow(fila.rowIndex - 1);
        console.log("array[eliminadas]: ",this.mateterisDarEliminadas);
    }

    agregarMateriasEvaluar(idprofesor, mensaje) {
        this.mateterisDar.forEach((mat) => {
            let datos = {}
            datos.idGrado = mat.idgrado
            datos.idMateria = mat.idmateria
            datos.idProfesor = idprofesor
            this.apiadmin.post("profesor/materias/guardar", datos).
                then((response) => {
                    console.log("guardango materias = response", response);
                        // if (response.estado.trim() == "agregado correctamente") {
                        //     console.log("materias agregadas");
                        // } else {
                        //     console.log("materoa no agregadas");
                        // }
                })
                .catch((error) => {
                    console.log("error= " + error);
                    this.alerts.Result("error", "No se pudo guardar")
                })
        });

    }

    modificarMateriasEvaluar(idprofesor) {
        this.mateterisDar.forEach((mat) => {
            let datos = {}
            datos.idGrado = mat.idgrado
            datos.idMateria = mat.idmateria
            datos.idProfesor = mat.idProfesor
            this.apiadmin.post("profesor/materias/guardar", datos).
                then((response) => {
                    if (response.estado.trim() == "agregado correctamente") {
                        this.alerts.Result("success", "Actualizado correctamente")
                    } else {
                        this.alerts.Result("error", "No se pudo actualizar")
                    }
                })
                .catch((error) => {
                    console.log("error= " + error);
                    this.alerts.Result("error", "No se pudo guardar")
                })
        });
    }





    agregarDocente() {
        let datos = {}
        datos.nombre = this.formDocente["nombreDocente"].value
        datos.genero = this.formDocente["generoDocente"].value
        datos.telefono = this.formDocente["telefonoDocente"].value
        datos.email = this.formDocente["emailDocente"].value
        datos.nip = this.formDocente["nipDocente"].value
        datos.dui = this.formDocente["duiDocente"].value
        if (parseInt(this.formDocente["selectListGradoResponsable"].value) > 0) {
            datos.dtgradoIdGrado = this.formDocente["selectListGradoResponsable"].value
        }else{
            datos.dtgradoIdGrado = null;
        }
        datos.dtusuarioUsuario = this.formDocente["usuarioDocente"].value
        this.apiadmin.post("profesor/guardar", datos).
            then((response) => {
                if (response.estado === "agregado correctamente") {
                    this.agregarMateriasDararry() // RECORRE TABLA MATERIAS DAR Y LOS METE A UN ARRAY
                    this.getlastIdProfesor()     // OBTIENE EL ULTIMO ID_PROFESOR Y LUEGO METE LAS MATERAIS RECORRIENDO EL ARRAY DEMATERIAS
                }
                if (response.estado === "agregado correctamente") {
                    this.alerts.Result("success", "Agregado correctamente")
                    this.formsUtils.clearFormData(this.formDocente);
                } else if (response.estado === "error al guardar"){
                    this.alerts.Result("error", "No se pudo guardar")
                }else{
                    this.alerts.Result("error",response.estado)
                }
                this.cargarDocentes()
            })
            .catch((error) => {
                console.log("error= " + error);
            });
    }

    editarDocente() {
        let datos = {}
        datos.id_profesor       = this.formDocente["datadocente"].value
        datos.nombre            = this.formDocente["nombreDocente"].value
        datos.telefono          = this.formDocente["telefonoDocente"].value
        datos.email             = this.formDocente["emailDocente"].value
        datos.genero            = this.formDocente["generoDocente"].value
        datos.nip               = this.formDocente["nipDocente"].value
        datos.dui               = this.formDocente["duiDocente"].value
        datos.dtusuarioUsuario  = this.formDocente["usuarioDocente"].value
        datos.dtgradoIdGrado    = this.formDocente["selectListGradoResponsable"].value
        this.apiadmin.put("profesor/actualizar", datos).
            then((response) => {
                if (response.estado == "actualizado correctamente") {
                    this.recargarListadoMateriasArray(datos.id_profesor);
                    this.mateterisDar.push(...this.mateterisDarEliminadas)
                    this.modificarMateriasEvaluar(datos.id_profesor)
                }
                this.formsUtils.clearFormData(this.formDocente);
                this.deshabilitarActualizacion()
                this.cargarDocentes();
                //cargar alumnos del grado seleccionado
            })
            .catch((error) => {
                console.log("error= " + error);
            })
    }


    clearFormDocente() {
        this.formsUtils.clearFormData(this.formDocente);
    }
    habilitarActualizacion() {
        this.utils.disableButton(this.btnAgregar)
        this.utils.enableButton(this.btnActualizar)
        this.utils.enableButton(this.btnCancelar)
        this.formDocente["duiDocente"].disabled = true;
    }

    deshabilitarActualizacion() {
        this.utils.enableButton(this.btnAgregar);
        this.utils.disableButton(this.btnActualizar);
        this.utils.disableButton(this.btnCancelar);
        this.formDocente["duiDocente"].disabled = false;
    }
}