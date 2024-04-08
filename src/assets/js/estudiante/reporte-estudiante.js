// ============================================================
// CONSTRUCCION DE REPORTES RELACIONADOS A ESTUDIANTES
// ============================================================
// CONFIGURACION DE PAGINA
// 'p': VERTICAL
// 'l': HORIZONTAL
// ============================================================
window.jsPDF = window.jspdf.jsPDF;

const config = {
    orientation: 'p',
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

// ============================================
// NOMINA DE ALUMNOS
// ============================================
const printStudents = () => {
    // ============================================
    // Remove active class from button when clicked
    // ============================================
    document
        .getElementById('btnEstudiante')
        .addEventListener('mouseout', () => {
            document
                .getElementById('btnEstudiante')
                .parentElement.classList.remove('active');
        });
    // ============================================================
    // LLAMADA DE GENERALIDADES O ESTABLECIMIENTO DE LAS MISMAS
    // ============================================================
    const doc = new jsPDF({ ...config });
    const utils = new Utils();
    const logo = utils.logoBase64;
    const fecha = utils.formatDate(new Date(), 'DD-MM-YYYY');
    const nombreInstitucion = utils.nombreInstitucion;
    /** ==========================================================
     * REPORTE: NOMINA DE ALUMNOS
     *
     * @data alumnos[] : Alumno
     * @data grado : string
     * @data seccion : string
     * @data docente : string
     *
     * ============================================================ */
    const nominaColumns = [
        'N.',
        'NIE',
        'Nombre',
        'Sexo',
        'F. Nacimiento',
        'F. Ingreso',
        'Responsable',
        'Dui',
        'Telefono',
    ];

    const studentRows = document
        .getElementById('tblistAlumnos')
        .querySelectorAll('tr');

    const students = [];

    if (studentRows.length == 1) {
        const message = new AllAlerts();
        message.Result('error', 'Selecciona un grado');
    } else {
        studentRows.forEach((row, index) => {
            const array = [];
            // ============================================================
            // ACCESS TO CELLS: EXCLUDE AND REORDER FOR PDF
            // ============================================================
            const nie = row.cells[1].textContent.trim();
            const studentName = row.cells[0].textContent.trim();
            const birthDate = row.cells[2].textContent.trim();
            const admissionDate = row.cells[3].textContent.trim();
            const sex =
                row.cells[4].textContent.trim() == 'Masculino' ? 'M' : 'F';
            const phone = row.cells[5].textContent.trim();
            const parent = row.cells[7].textContent.trim();
            const dui = row.cells[8].textContent.trim();

            array.push(
                index,
                nie,
                studentName,
                sex,
                birthDate,
                admissionDate,
                parent,
                dui,
                phone
            );

            students.push(array);
        });

        // ============================================================
        // BORRANDO EL PRIMER ELEMENTO DEL ARRAY (TIENE EL TH)
        students.shift();
        // ============================================================

        const { encargado, grado, seccion } = getNominaGradoProfesor();

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
        doc.text(`Nómina de Alumnos`, 40, 135);
        doc.setFontSize(10);
        doc.setFont('times', 'normal', 400);
        doc.text(`Fecha: ${fecha}`, 480, 135);
        doc.setFontSize(12);
        doc.setFont('times', 'normal', 'bold');
        doc.text(`Docente: ${encargado}`, 40, 170);
        doc.text(`${grado} ${seccion}`, 475, 170);
        doc.setFont('times', 'normal', 400);
        doc.autoTable({
            head: [nominaColumns],
            body: [...students],
            theme: 'grid',
            startY: 180,
            styles: {
                ...tableStylesConfig,
            },
            headStyles: {
                ...tableHeadConfig,
            },
        });
        doc.save(`Nómina de alumnos ${grado} ${seccion} ${fecha}`);
    }
};

// ============================================
// TRAYENDO LOS DATOS PARA LA TABLA ALUMNO
// ============================================
const getNominaGradoProfesor = () => {
    const data = JSON.parse(localStorage.getItem('profesorGrado'));
    return data;
};

// ============================================
// BOLETA DE NOTAS POR ALUMNO
// ============================================
const printBoletaAlumno = () => {
    // ============================================================
    // LLAMADA DE GENERALIDADES O ESTABLECIMIENTO DE LAS MISMAS
    // ============================================================
    const doc = new jsPDF({ ...config });
    const utils = new Utils();
    const logo = utils.logoBase64;
    const fecha = utils.formatDate(new Date(), 'DD-MM-YYYY');
    const nombreInstitucion = utils.nombreInstitucion;
    /** ==========================================================
     * REPORTE: BOLETA DE NOTAS POR ESTUDIANTE
     *
     * @data materias[] : materia
     * @data grado : string
     * @data seccion : string
     * @data docente : string
     * @data alumno : alumno
     *
     * ============================================================ */
    const boletaColumns = [
        'Materia',
        'Actividad 1',
        'Actividad 2',
        'Actividad 3',
        'Total',
    ];

    const notasHtml = document
        .getElementById('tbBoletaModalEstudiante')
        .querySelectorAll('tr');

    const notas = [];

    notasHtml.forEach((row) => {
        const arr = [];
        for (const cell of row.cells) {
            arr.push(cell.textContent);
        }

        notas.push(arr);
    });

    // ============================================
    // EXTRAYENDO DATA DEL LOCAL STORAGE
    // SUPER NECESARIA PARA HACER EL DOCUMENTO
    // EQUISDE
    // ============================================
    const alumnoStorage = JSON.parse(localStorage.getItem('alumnoData'));
    const { alumno, grado, nie, seccion, trimestre } = alumnoStorage;
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
    doc.text('Boleta de notas', doc.internal.pageSize.width / 2, 125, {
        align: 'center',
    });
    doc.text(trimestre, doc.internal.pageSize.width / 2, 145, {
        align: 'center',
    });
    doc.setFontSize(10);
    doc.setFont('times', 'normal', 400);
    doc.text(`Fecha: ${fecha}`, 480, 595);
    doc.setFontSize(12);
    doc.setFont('times', 'normal', 'bold');
    doc.text(`Alumno: ${alumno}`, 40, 185);
    doc.text(`${grado} ${seccion}`, 465, 185);
    doc.setFont('times', 'normal', 400);

    if (trimestre == 'Cierre escolar') {
        const cierreHead = [
            'Materia',
            'Trimestre I',
            'Trimestre II',
            'Trimestre III',
            'Promedio',
            'Nota Recuperacion',
            'Nota Final',
        ];
        doc.autoTable({
            head: [cierreHead],
            body: [...notas],
            theme: 'grid',
            startY: 200,
            styles: {
                ...tableStylesConfig,
            },
            headStyles: {
                ...tableHeadConfig,
            },
        });
    } else {
        doc.autoTable({
            head: [boletaColumns],
            body: [...notas],
            theme: 'grid',
            startY: 200,
            styles: {
                ...tableStylesConfig,
            },
            headStyles: {
                ...tableHeadConfig,
            },
        });
    }

    // ============================================
    // ASPECTOS DE CONDUCTA
    // ============================================
    const conductaHead = [
        {
            content: 'Aspectos de Conducta',
            colSpan: 2,
            styles: { halign: 'center' },
        },
    ];

    const conductaBody = document
        .getElementById('tbBoletaCoductaEstudiante')
        .querySelectorAll('tr');

    const conducta = [];
    conductaBody.forEach((row) => {
        const arr = [];
        for (const cell of row.cells) {
            arr.push(cell.textContent);
        }

        conducta.push(arr);
    });

    doc.autoTable({
        head: [conductaHead],
        body: [...conducta],
        theme: 'grid',
        startY: 445,
        styles: {
            ...tableStylesConfig,
        },
        headStyles: {
            ...tableHeadConfig,
        },
    });

    // ============================================
    // ASISTENCIA
    // ============================================
    const asistenciaVal = document.getElementById(
        'valorAsistenciaTrim'
    ).textContent;
    const asistenciaHead = ['Asistencia', asistenciaVal];

    doc.autoTable({
        head: [asistenciaHead],
        body: [],
        theme: 'grid',
        startY: 410,
        styles: {
            ...tableStylesConfig,
        },
        headStyles: {
            ...tableHeadConfig,
        },
    });

    doc.save(`Boleta de notas ${alumno} ${nie} ${trimestre}`);
};

// ============================================
// EVENT BINDING
// ============================================
const btnImprimirBoleta = document.getElementById('printBoletNotasEstudiantex');

btnImprimirBoleta.addEventListener('click', () => {
    printBoletaAlumno();
});
