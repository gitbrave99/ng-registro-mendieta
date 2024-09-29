import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { GradoCalificar } from '../../interfaces/GradoCalificar.interface';
import { CalificacionEstudiante } from '../../interfaces/CalificacionEstudiante.interface';

@Component({
  selector: 'app-ingreso-notas-page',
  templateUrl: './ingreso-notas-page.component.html',
  styleUrl: './ingreso-notas-page.component.css'
})
export class IngresoNotasPageComponent implements OnInit {

  gradosCalificar: GradoCalificar[] = [];
  calificacionSociales: CalificacionEstudiante[] = [];
  calificacionCiencias: CalificacionEstudiante[] = [];
  calificacionMatematica: CalificacionEstudiante[] = [];
  calificacionLenguaje: CalificacionEstudiante[] = [];
  calificacionEducFisica: CalificacionEstudiante[] = [];
  calificacionMoral: CalificacionEstudiante[] = [];
  calificacionIngles: CalificacionEstudiante[] = [];
  calificacionEducArtistica: CalificacionEstudiante[] = [];
  constructor(
    private docenteService: DocenteService
  ) {
  }

  ngOnInit(): void {
    this.cargarGradoEncargado();
    this.cargarGradosCalificar();
  }

  public cargarGradoEncargado(): void {
    this.docenteService.cargarGradoResponsagle().subscribe({
      next: (response) => {
        console.log("GRADO ENCARGADRO", response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  //crear funcion para llamada cargarGradosCalificar y que llame a metodo del servicio cargarGradosCalificar
  public cargarGradosCalificar(): void {
    this.docenteService.cargarGradosCalificar().subscribe({
      next: (response) => {
        this.gradosCalificar = response
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  public calificacionesPorGrado(pIdGrado: number): void {
    //SOCIALES
    this.docenteService.cargarCalificacionPorGrado(pIdGrado, 1).subscribe({
      next: (response) => {
        if (!Array.isArray(response)) return;
        this.calificacionSociales = response
      }, error: (error) => { console.log(error); }
    });
    //CIENCIAS
    this.docenteService.cargarCalificacionPorGrado(pIdGrado, 2).subscribe({
      next: (response) => {
        if (!Array.isArray(response)) return;
        this.calificacionCiencias = response
      }, error: (error) => { console.log(error); }
    });
    //MATEMÁTICAS
    this.docenteService.cargarCalificacionPorGrado(pIdGrado, 3).subscribe({
      next: (response) => {
        if (!Array.isArray(response)) return;
        this.calificacionMatematica = response
      }, error: (error) => { console.log(error); }
    });
    //LENGUAJE
    this.docenteService.cargarCalificacionPorGrado(pIdGrado, 4).subscribe({
      next: (response) => {
        if (!Array.isArray(response)) return;
        this.calificacionLenguaje = response
      }, error: (error) => { console.log(error); }
    });
    //EDUC FISICA
    this.docenteService.cargarCalificacionPorGrado(pIdGrado, 5).subscribe({
      next: (response) => {
        if (!Array.isArray(response)) return;
        this.calificacionEducFisica = response
      }, error: (error) => { console.log(error); }
    });
    //MORAL
    this.docenteService.cargarCalificacionPorGrado(pIdGrado, 6).subscribe({
      next: (response) => {
        if (!Array.isArray(response)) return;
        this.calificacionMoral = response
      }, error: (error) => { console.log(error); }
    });
    // INGLES
    this.docenteService.cargarCalificacionPorGrado(pIdGrado, 7).subscribe({
      next: (response) => {
        if (!Array.isArray(response)) return;
        this.calificacionIngles = response
      }, error: (error) => { console.log(error); }
    });
    // EDUC. ARTISTICA
    this.docenteService.cargarCalificacionPorGrado(pIdGrado, 8).subscribe({
      next: (response) => {
        if (!Array.isArray(response)) return;
        this.calificacionEducArtistica = response
      }, error: (error) => { console.log(error); }
    })
  }
}
