class TableUtils {



    rowGradoCalificar(grado) {
        return `<tr>
        <td class="text-center">${grado.descripcion}</td>
        <td class="text-center">${grado.seccionDescripcion}</td>
        <td class="text-center">${grado.cantidad_alumnos}</td>
        <td class="text-center">            
            <a href="#pnllisStudents" class="btn btn-primary btn-sm" onclick="cargarAlumnosCalificaciones(${grado.id_grado},'${grado.descripcion}','${grado.seccionDescripcion}')">
                <i class="material-icons">remove_red_eye</i>
            </a>
        </td>
    </tr>`;
    }

    
     

    rowCalificacionesedit(alumno,idmateria) {
        return `
        <tr>
            <td class="text-center">${alumno.nombre}</td>
            <td class="text-center">${alumno.calificacion1t1}</td>
            <td class="text-center">${alumno.calificacion2t1}</td>
            <td class="text-center">${alumno.calificacion3t1}</td>
            <td class="text-center">${alumno.totaltrimestre1}</td> 
            <td class="text-center">${alumno.asistenciat1}%</td>

            <td class="text-center">${alumno.calificacion1t2}</td>
            <td class="text-center">${alumno.calificacion2t2}</td>
            <td class="text-center">${alumno.calificacion3t2}</td>
            <td class="text-center">${alumno.totaltrimestre2}</td>
            <td class="text-center">${alumno.asistenciat2}%</td>

            <td class="text-center">${alumno.calificacion1t3}</td>
            <td class="text-center">${alumno.calificacion2t3}</td>
            <td class="text-center">${alumno.calificacion3t3}</td>
            <td class="text-center">${alumno.totaltrimestre3}</td>
            <td class="text-center">${alumno.asistenciat3}%</td>
            <td class="text-center">${utils.getColorIsNotaAprobada(alumno.notafinal)}</td>
            <td class="text-center">${utils.limitarDecimales((alumno.asistenciat1 +alumno.asistenciat2 +alumno.asistenciat3) /3)}</td>
            <td>
                <button class="btn btn-info btn-sm btnOpenAddEdiNotas"
                data-toggle="modal"
                data-target="#mdAgregarNota"
                onclick="prepararNotasModificar(${alumno.id_alumno},${alumno.id_materia})">
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
                onclick="setIdalumodalnotarecuper(${alumno.id_alumno},${idmateria})">
                <i class="material-icons text-white">book</i>
            </a>
            </td>
        </tr>
        `;
    }

 


    vaciarTabla(table){
        table.innerHTML = '';
    };
 
 

    rellenarTablaGradosCalificar(listado,tabla) {
        tabla.innerHTML='';
        listado.forEach(grado => {
            tabla.innerHTML+=this.rowGradoCalificar(grado);
        });
    };
 

    rellenarTablaAlumnosCalificaciones(listado,tabla,idmateria){
        tabla.innerHTML=''
        listado.forEach(alumno => {
            tabla.innerHTML+=this.rowCalificacionesedit(alumno,idmateria);
        });
    };


}
