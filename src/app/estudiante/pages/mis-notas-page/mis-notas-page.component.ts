import { Component } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { Calificacion } from '../../interfaces/Calificacion.interface';
import { Estudiante } from '../../interfaces/Estudiante.interface';

@Component({
  selector: 'estudiante-mis-notas-page',
  templateUrl: './mis-notas-page.component.html',
  styleUrl: './mis-notas-page.component.css'
})
export class MisNotasPageComponent {

  public calificacion: Calificacion[] = []
  public perfil: Estudiante = {} as Estudiante

  constructor(
    public estudianteService: EstudianteService
  ) { 
    this.cargarNotas();
    this.cargarGradoEstudiante();

  }

  cargarNotas() {
    this.estudianteService.cargarNotas().subscribe({
      next: (resp) => {
        console.log(resp)
        this.calificacion=resp
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  cargarGradoEstudiante() {
    this.estudianteService.cargarPefil().subscribe({
      next: (resp) => {
        console.log(resp)
        this.perfil=resp
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}



