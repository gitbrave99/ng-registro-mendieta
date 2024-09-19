import { Component, OnInit } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { GradoCalificar } from '../../interfaces/GradoCalificar.interface';
import { CalificacionEstudiante } from '../../interfaces/CalificacionEstudiante.interface';

@Component({
  selector: 'app-ingreso-notas-page',
  templateUrl: './ingreso-notas-page.component.html',
  styleUrl: './ingreso-notas-page.component.css'
})
export class IngresoNotasPageComponent implements OnInit{

  gradosCalificar: GradoCalificar[] = [];
  calificacionSociales:CalificacionEstudiante[] = [];
  constructor(
    private docenteService: DocenteService
  ){
  }

  ngOnInit(): void {
    this.cargarGradoEncargado();
    this.cargarGradosCalificar();
  }

  public cargarGradoEncargado(): void {
    this.docenteService.cargarGradoResponsagle().subscribe({
      next: (response) => {
        console.log("GRADO ENCARGADRO",response);
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
        this.gradosCalificar= response
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  public calificacionesPorGrado(idGrado: number): void {
    this.docenteService.cargarCalificacionEstudiantePorGrado(idGrado).subscribe({
      next: (response) => {
        console.log("CALIFICACIONES POR GRADO",response);
        this.calificacionSociales = response
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
