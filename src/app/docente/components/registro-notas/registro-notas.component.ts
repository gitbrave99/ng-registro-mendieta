import { Component, Input } from '@angular/core';
import { CalificacionEstudiante } from '../../interfaces/CalificacionEstudiante.interface';

@Component({
  selector: 'app-registro-notas',
  templateUrl: './registro-notas.component.html',
  styleUrl: './registro-notas.component.css'
})
export class RegistroNotasComponent {

  @Input() calificacionSociales: CalificacionEstudiante[] = [];
  // @Input() calificacionCiencias: CalificacionEstudiante[] = [];
  // @Input() calificacionMatematica: CalificacionEstudiante[] = [];
  // @Input() calificacionLenguaje: CalificacionEstudiante[] = [];
  // @Input() calificacionEducFisica: CalificacionEstudiante[] = [];
  // @Input() calificacionMoral: CalificacionEstudiante[] = [];
  // @Input() calificacionIngles: CalificacionEstudiante[] = [];
  // @Input() calificacionEducArtistica: CalificacionEstudiante[] = [];

  public asistenciaFinal(n1:number,n2:number,n3:number): number {
    console.log("asistenciaFinal CALCULANDO");
    return n1+n2+n3;
  }

}
