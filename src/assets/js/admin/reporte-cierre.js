// ============================================
// REPORTE RESUMEN AÑO LECTIVO
// ============================================
// CONFIGURACION DE PAGINA
// 'p': VERTICAL
// 'l': HORIZONTAL
// ============================================================
window.jsPDF = window.jspdf.jsPDF;

const config = {
    orientation: 'l',
    unit: 'pt',
};

const tableStylesConfig = {
    font: 'times',
};

const tableHeadConfig = {
    fillColor: false,
    textColor: '#000000',
    cellPadding: 5,
    lineWidth: 1,
};

const printYearLectivo = () => {
    /** ========================================================
     * REPORTE: CIERRE ESCOLAR
     *
     * @data alumnos[] : Alumno
     * @data escolaryear: number
     * @data docente: string
     * @data grado: string
     * @data seccion: string
     *
     * ========================================================= */
    // LLAMADA DE GENERALIDADES O ESTABLECIMIENTO DE LAS MISMAS
    // ============================================================
    const doc = new jsPDF({ ...config });
    const utils = new Utils();
    const logo = utils.logoBase64;
    const fecha = utils.formatDate(new Date(), 'DD-MM-YYYY');
    const nombreInstitucion = utils.nombreInstitucion;

    const headerDOM = document
        .getElementById('cierreHeaderTable')
        .querySelectorAll('th');

    const head = [];

    headerDOM.forEach((title) => {
        head.push(title.textContent.trim());
    });

    const bodyDOM = document
        .getElementById('cierreBodyTable')
        .querySelectorAll('tr');
    const body = [];

    bodyDOM.forEach((entry) => {
        const arr = [];
        for (const cell of entry.cells) {
            arr.push(cell.textContent.trim());
        }

        body.push(arr);
    });

    // ============================================
    // TRAYENDO DATOS PARA EL REPORTE
    // ============================================
    const info = JSON.parse(localStorage.getItem('cierreVals'));
    const { grado, year } = info;
    // ============================================================
    // BUILD DOCUMENT
    // ============================================================
    doc.setFont('times', 'normal', 'bold');
    doc.setFontSize(16);
    doc.text(nombreInstitucion, doc.internal.pageSize.width / 2, 55, {
        align: 'center',
    });
    doc.addImage(logo, 'WEBP', 40, 20, 60, 80);
    doc.setFontSize(14);
    doc.text(
        `RESUMEN DE AÑO ESCOLAR ${grado} ${year}`,
        doc.internal.pageSize.width / 2,
        125,
        {
            align: 'center',
        }
    );
    doc.setFontSize(12);
    doc.setFont('times', 'normal', 'normal');
    doc.text('DESCRIPCION:', 40, 160);
    doc.text(
        '1. EVIDENCIA ACTITUDES FAVORABLES PARA LA CONVIVENCIA Y CULTURA DE PAZ',
        40,
        180
    );
    doc.text('2. ACEPTA Y VALORA LA DIVERSIDAD', 40, 195);
    doc.text('3. TOMA DECISIONES DE FORMA AUTÓNOMA Y RESPONSABLE', 40, 210);
    doc.text('4. SE EXPRESA Y PARTICIPA CON RESPETO', 40, 225);
    doc.text(
        '5. MUESTRA SENTIDO DE PERTENENCIA Y RESPETO POR NUESTRA CULTURA',
        40,
        240
    );

    doc.autoTable({
        head: [head],
        body,
        theme: 'grid',
        startY: 270,
        styles: {
            ...tableStylesConfig,
        },
        headStyles: {
            ...tableHeadConfig,
        },
    });

    doc.save(`Resumen de año escolar ${grado} ${year}`);
};

const btnPrint = document.getElementById('btnImprimirResumenFinal');

btnPrint.addEventListener('click', () => {
    printYearLectivo();
});
