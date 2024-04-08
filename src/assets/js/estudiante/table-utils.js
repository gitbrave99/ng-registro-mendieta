class TableUtils {
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

  rowCalificacionesedit(alumno) {
    return `
        <tr>
            <td class="text-center">${alumno.materia}</td>
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
            <td class="text-center">${utils.getColorIsNotaAprobada(alumno.notafinal)}</td>
            <td class="text-center">${utils.limitarDecimales(
      (alumno.asistenciat1 +
        alumno.asistenciat2 +
        alumno.asistenciat3) /
      3
    )}</td>
        </tr>
        `;
  }

  rowConductaBoletaResumen(conducta) {
    return `
            <tr>
                 <td>${conducta.conducta}</td>
                 <td>${conducta.valor}</td>
            </tr>`;
  }

  vaciarTabla(table) {
    table.innerHTML = "";
  }

  rellenarTablaAlumnosCalificaciones(listado, tabla) {
    tabla.innerHTML = "";
    listado.forEach((alumno) => {
      tabla.innerHTML += this.rowCalificacionesedit(alumno);
    });
  }

  rellenarTbCalificacionResumen(listado, tabla, tipoHead) {
    tabla.innerHTML = "";
    listado.forEach((nota) => {
      if (parseInt(tipoHead) < 4) {
        tabla.innerHTML += this.rowNotFinalResumen(nota);
      } else {
        tabla.innerHTML += this.rowBoletaNotFinalRecuperResumen(nota);
      }
    });
  }


  rellenarTablaAlumnoBoletaConducta(listado, tabla) {
    tabla.innerHTML = "";
    listado.forEach((alumno) => {
      tabla.innerHTML += this.rowConductaBoletaResumen(alumno);
    });
  }

}
