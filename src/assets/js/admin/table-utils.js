class TableUtils {
    rowAdmin(admin) {
        return `
            <tr>
                <td>${admin.nombre}</td>
                <td>${admin.email}</td>
                <td>${admin.genero}</td>
                <td>${admin.dui}</td>
                <td>${admin.telefono}</td>
                <td>${admin.dtusuarioUsuario}</td>
                <td>
                    <a class="btn btn-info btn-sm btnEditAdmin"
                        href="#panelsUsers"
                        onclick="gestionAdmin.cargarAdminModificar(${admin.id_profesor})">
                        <i class="material-icons">edit</i>
                    </a>
                    <button type="button"
                        class="btn btn-danger btn-sm btnDelAdmin"
                        data-toggle="modal"
                        data-target="#mdDeleteUsuario"
                        onclick="gestionAdmin.prepararAdminEliminar(${admin.id_profesor})">
                        <i class="material-icons">delete_forever</i>
                    </button>
                    <button type="button"
                        class="btn btn-warning btn-sm"
                        data-toggle="modal"
                        data-target="#mdConfirmResetPasword">
                        <i class="material-icons">lock_open</i>
                    </button>
                </td>
            </tr>`;
    }

    rowDocente(docente) {
        return `
        <tr>
            <td>${docente.nombre}</td>
            <td>${docente.email}</td>
            <td>${docente.genero}</td>
            <td>${docente.dui}</td>
            <td>${docente.telefono}</td>
            <td>${docente.nip}</td>
            <td>${docente.dtusuarioUsuario}</td>
            <td>${docente.dtgradoDescripcion} ${docente.dtgradoSeccionDescripcion}</td>
            <td>
                <a class="btn btn-info btn-sm btnEditDocente"
                    href="#panelsUsers"
                    onclick="gestionDocente.cargarDocenteModificar(${docente.id_profesor})">
                    <i class="material-icons">edit</i>
                </a>
                <button type="button"
                    class="btn btn-danger btn-sm btnDelDocente"
                    data-id="rztwBkAzPFDFIAzQtFzx"
                    data-toggle="modal"
                    data-target="#mdDeleteUsuario"
                    onclick="gestionDocente.prepararDocenteEliminar(${docente.id_profesor})">
                    <i class="material-icons">delete_forever</i>
                </button>
                <button type="button"
                    class="btn btn-warning btn-sm"
                    data-toggle="modal"
                    data-target="#mdConfirmResetPasword">
                    <i class="material-icons">lock_open</i>
                </button>
            </td>
        </tr>`;
    }

    rowGrado(grado) {
        return `<tr>
        <td class="text-center">${grado.gradoDescripcion}</td>
        <td class="text-center">${grado.seccionDescripcion}</td>
        <td class="text-center">${grado.dtprofesorNombre}</td>
        <td class="text-center">${grado.cantidad_alumnos}</td>
        <td class="text-center">
            <button type="button" class="btn btn-warning btn-sm btnEditGrado" onclick="cargarDtaModificar(${grado.id_grado}, ${grado.cantidad_alumnos})">
                <i class="material-icons">edit</i>
            </button>

            <a href="#pnllisStudents" class="btn btn-primary btn-sm" onclick="cargarAlumnos(${grado.id_grado},'${grado.gradoDescripcion}','${grado.seccionDescripcion}');">
                <i class="material-icons">remove_red_eye</i>
            </a>
        </td>
    </tr>`;
    }

    rowGradoCalificaciones(grado) {
        return `<tr>
        <td class="text-center">${grado.gradoDescripcion}</td>
        <td class="text-center">${grado.seccionDescripcion}</td>
        <td class="text-center">${grado.dtprofesorNombre}</td>
        <td class="text-center">${grado.cantidad_alumnos}</td>
        <td class="text-center">


            <a href="#pnllisStudents" class="btn btn-primary btn-sm" onclick="cargarAlumnosCalificaciones(${grado.id_grado},'${grado.gradoDescripcion}','${grado.seccionDescripcion}')">
                <i class="material-icons">remove_red_eye</i>
            </a>
        </td>
    </tr>`;
    }

    rowAlumno(alumno) {
        return `
        <tr>
            <td class="text-center">${alumno.apellido} ${alumno.nombre}</td>
            <td class="text-center">${alumno.nie}</td>
            <td class="text-center">${alumno.fecha_nacimiento}</td>
            <td class="text-center">${alumno.fecha_ingreso}</td>
            <td class="text-center">${alumno.genero}</td>
            <td class="text-center">${alumno.telefono}</td>
            <td class="text-center">${alumno.dtusuarioUsuario}</td>
            <td class="text-center">${alumno.encargado_nombre}</td>
            <td class="text-center">${alumno.encargado_dui}</td>
            <td class="text-center">
            <button type="button" class="btn btn-primary" data-toggle="modal"
                data-target="#mdPrevImpresion" onclick="cargarCalificacionResumen(${alumno.id_alumno})">
                <i class="material-icons">print</i> Boletas
                <div class="ripple-container"></div>
            </button>
            </td>
        </tr>
        `;
    }

    rowtbCierreEscolar(alumno) {
        return `
        <tr>
            <td class="text-center">${alumno.apellido} ${alumno.nombre}</td>
            <td class="text-center">${alumno.nie}</td>
            <td class="text-center">${alumno.fecha_nacimiento}</td>
            <td class="text-center">${alumno.fecha_ingreso}</td>
            <td class="text-center">${alumno.genero}</td>
            <td class="text-center">${alumno.telefono}</td>
            <td class="text-center">${alumno.dtusuarioUsuario}</td>
            <td class="text-center">${alumno.encargado_nombre}</td>
            <td class="text-center">${alumno.encargado_dui}</td>
            <td class="text-center">
            <button type="button" class="btn btn-primary" data-toggle="modal"
                data-target="#mdPrevImpresion" onclick="cargarCalificacionResumen(${alumno.id_alumno})">
                <i class="material-icons">print</i> Boletas
                <div class="ripple-container"></div>
            </button>
            </td>
        </tr>
        `;
    }

    rowCalificacionesedit(alumno, idmateria) {
        return `
        <tr>
            <td class="text-center">${alumno.nombre}</td>
            <td class="text-center">${alumno.calificacion1t1}</td>
            <td class="text-center">${alumno.calificacion2t1}</td>
            <td class="text-center">${alumno.calificacion3t1}</td>
            <td class="text-center">${alumno.totaltrimestre1}</td>
            <td class="text-center">${alumno.asistenciat1}</td>

            <td class="text-center">${alumno.calificacion1t2}</td>
            <td class="text-center">${alumno.calificacion2t2}</td>
            <td class="text-center">${alumno.calificacion3t2}</td>
            <td class="text-center">${alumno.totaltrimestre2}</td>
            <td class="text-center">${alumno.asistenciat2}</td>

            <td class="text-center">${alumno.calificacion1t3}</td>
            <td class="text-center">${alumno.calificacion2t3}</td>
            <td class="text-center">${alumno.calificacion3t3}</td>
            <td class="text-center">${alumno.totaltrimestre3}</td>
            <td class="text-center">${alumno.asistenciat3}</td>
            <td class="text-center">${utils.getColorIsNotaAprobada(
                alumno.notafinal
            )}</td>
            <td class="text-center">${utils.limitarDecimales(
                (alumno.asistenciat1 +
                    alumno.asistenciat2 +
                    alumno.asistenciat3) /
                    3
            )}</td>
            <td>
                <button class="btn btn-info btn-sm btnOpenAddEdiNotas"
                data-toggle="modal"
                data-target="#mdAgregarNota"
                onclick="prepararNotasModificar(event,${alumno.id_alumno},${
            alumno.id_materia
        })">
                    <i class="material-icons">library_add</i>
                </button>
                <a class="btn btn-info btn-sm btnAgregarAsistencia"
                data-toggle="modal"
                data-target="#mdAgregarAsistencia"
                onclick="prepararAsitenciaModificar(${alumno.id_alumno})">
                <i class="material-icons text-white">list</i>
                </a>
                <a class="btn btn-info btn-sm"
                data-toggle="modal"
                data-target="#mdAgregarConducta"
                onclick="cargarConductaAlumno(${alumno.id_alumno})">
                <i class="material-icons text-white">face</i>
                </a>
                <a class="btn btn-info btn-sm"
                    data-toggle="modal"
                    data-target="#mdAgregarNotaRecuperacion"
                    onclick="setIdalumodalnotarecuper(${
                        alumno.id_alumno
                    },${idmateria})">
                    <i class="material-icons text-white">book</i>
                </a>
            </td>
        </tr>
        `;
    }

    rowAlumnoEditar(alumno) {
        return `
        <tr>
            <td class="text-center">${alumno.apellido} ${alumno.nombre}</td>
            <td class="text-center">${alumno.nie}</td>
            <td class="text-center">${alumno.fecha_nacimiento}</td>
            <td class="text-center">${alumno.fecha_ingreso}</td>
            <td class="text-center">${alumno.genero}</td>
            <td class="text-center">${alumno.telefono}</td>
            <td class="text-center">${alumno.dtusuarioUsuario}</td>
            <td class="text-center">${alumno.encargado_nombre}</td>
            <td class="text-center">${alumno.encargado_dui}</td>
            <td>
                <a class="btn btn-info btn-sm btnEditDocente"
                    href="#panelsUsers"
                    onclick="gestionAlumno.cargarAlumnoModificar(${alumno.id_alumno})">
                    Editar
                </a>
                <button type="button"
                        class="btn btn-warning btn-sm"
                        data-toggle="modal"
                        data-target="#mdConfirmResetPasword">
                        <i class="material-icons">lock_open</i>
                </button>
            </td>
        </tr>
        `;
    }

    rowCierreAlumnoResumenFinal(alumno) {
        return `
        <tr>
            <td class="text-center">${alumno.nombre}</td>
            <td class="text-center">${alumno.evidenciAfcycdlpaz1}</td>
            <td class="text-center">${alumno.aceptaYvl2}</td>
            <td class="text-center">${alumno.tomaDdfayr3}</td>
            <td class="text-center">${alumno.seEypcr4}</td>
            <td class="text-center">${alumno.muestraSpypnc5}</td>
            <td class="text-center">${alumno.sociales}</td>
            <td class="text-center">${alumno.ciencias}</td>
            <td class="text-center">${alumno.matematica}</td>
            <td class="text-center">${alumno.lenguaje}</td>
            <td class="text-center">${alumno.educfisica}</td>
            <td class="text-center">${alumno.moralurbanidadciv}</td>
            <td class="text-center">${alumno.ingles}</td>
            <td class="text-center">${alumno.educartistica}</td>
        </tr>
        `;
    }

    rowMateriDarDocente(idgrado, grado, idmateria, materia) {
        return `
        <tr>

            <td class="text-center ">${grado}
            <span style="display:none" class="idsgradodar">${idgrado}</span>
            <span style="display:none" class="idsmateriasdar">${idmateria}</span>
            </td>
            <td class="text-center">${materia}</td>
            <td>
                <button type="button" class="btn btn-danger btn-sm btnEditDocente"
                    href="#"
                    onclick="gestionDocente.borrarFilaMateriaDar(event)">
                    Eliminar
                </button>
            </td>
        </tr>
        `;
    }

    theadBoletaNotasSimples() {
        return `<thead class="text-center">
                    <th scope="col">Materia</th>
                    <th scope="col">35%</th>
                    <th scope="col">35%</th>
                    <th scope="col">30%</th>
                    <th scope="col">Total</th>
                </thead>`;
    }
    rowNotFinalResumen(nota) {
        return `
        <tr>
             <td>${nota.materia}</td>
             <td>${nota.nota1}</td>
             <td>${nota.nota2}</td>
             <td>${nota.nota3}</td>
             <td>${utils.getColorIsNotaAprobada(nota.totalTrimestre)}</td>
        </tr>`;
    }

    theadBoletaNotasFnRecuperacion() {
        return `<thead class="text-center">
                    <th scope="col">Materia</th>
                    <th scope="col">Trimestre I</th>
                    <th scope="col">Trimestre II</th>
                    <th scope="col">Trimestre III</th>
                    <th scope="col">Promedio</th>
                    <th scope="col">Nota Recuperación</th>
                    <th scope="col">Nota Final</th>
                </thead>`;
    }

    rowBoletaNotFinalRecuperResumen(nota) {
        return `
            <tr>
                 <td>${nota.materia}</td>
                 <td>${nota.totalt1}</td>
                 <td>${nota.totalt2}</td>
                 <td>${nota.totalt3}</td>
                 <td>${nota.promedio}</td>
                 <td>${utils.notaRecupNoRealiz(nota.notaRecuperacion)}</td>
                 <td>${nota.notalFinal}</td>
            </tr>`;
    }

    rowConductaBoletaResumen(conducta) {
        return `
            <tr>
                 <td>${conducta.conducta}</td>
                 <td>${conducta.valor}</td>
            </tr>`;
    }

    vaciarTabla(table) {
        table.innerHTML = '';
    }

    rellenarTableAdmins(listado, table) {
        table.innerHTML = '';
        listado.forEach((admin) => {
            table.innerHTML += this.rowAdmin(admin);
            // this.rowAdmin(admin)
        });
    }

    rellenarTablaMateriasDocente(idgrado, grado, idmateria, materia, table) {
        table.innerHTML += this.rowMateriDarDocente(
            idgrado,
            grado,
            idmateria,
            materia
        );
    }

    rellenarTablaMateriasDocenteEditarMatCalificar(listado, table) {
        table.innerHTML = '';
        listado.forEach((mt) => {
            table.innerHTML += this.rowMateriDarDocente(
                mt.idGrado,
                mt.grado + ' ' + mt.seccion,
                mt.idMateria,
                mt.materia
            );
        });
    }

    rellenarTableDocentes(listado, table) {
        table.innerHTML = '';
        listado.forEach((docente) => {
            if (!docente.dtgradoDescripcion) {
                docente.dtgradoDescripcion = '';
            }
            if (!docente.dtgradoSeccionDescripcion) {
                docente.dtgradoSeccionDescripcion = '';
            }
            table.innerHTML += this.rowDocente(docente);
            // this.rowDocente(docente)
        });
    }

    rellenarTablaGrados(listado, tabla) {
        tabla.innerHTML = '';
        listado.forEach((grado) => {
            if (!grado.dtprofesorNombre) {
                grado.dtprofesorNombre = '';
            }
            tabla.innerHTML += this.rowGrado(grado);
        });
    }

    rellenarTablaGradosCalificaciones(listado, tabla) {
        tabla.innerHTML = '';
        listado.forEach((grado) => {
            if (!grado.dtprofesorNombre) {
                grado.dtprofesorNombre = '';
            }
            tabla.innerHTML += this.rowGradoCalificaciones(grado);
        });
    }

    rellenarTablaAlumnos(listado, tabla) {
        tabla.innerHTML = '';
        listado.forEach((alumno) => {
            tabla.innerHTML += this.rowAlumno(alumno);
        });
    }

    rellenarTablaAlumnosEditar(listado, tabla) {
        tabla.innerHTML = '';
        listado.forEach((alumno) => {
            tabla.innerHTML += this.rowAlumnoEditar(alumno);
        });
    }

    rellenarTablaAlumnosCalificaciones(listado, tabla, idmateria) {
        tabla.innerHTML = '';
        listado.forEach((alumno) => {
            tabla.innerHTML += this.rowCalificacionesedit(alumno, idmateria);
        });
    }

    rellenarTbCalificacionResumen(listado, tabla, tipoHead) {
        tabla.innerHTML = '';
        listado.forEach((nota) => {
            if (parseInt(tipoHead) < 4) {
                tabla.innerHTML += this.rowNotFinalResumen(nota);
            } else {
                tabla.innerHTML += this.rowBoletaNotFinalRecuperResumen(nota);
            }
        });
    }

    rellenarTbResumenFinalCierre(listado, tabla) {
        tabla.innerHTML = '';
        listado.forEach((nota) => {
            tabla.innerHTML += this.rowCierreAlumnoResumenFinal(nota);
        });
    }

    rellenarTablaAlumnoBoletaConducta(listado, tabla) {
        tabla.innerHTML = '';
        listado.forEach((alumno) => {
            tabla.innerHTML += this.rowConductaBoletaResumen(alumno);
        });
    }
}
