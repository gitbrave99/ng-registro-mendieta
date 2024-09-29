import { Component, Input } from '@angular/core';
import { CalificacionEstudiante } from '../../interfaces/CalificacionEstudiante.interface';

@Component({
  selector: 'app-registro-notas',
  templateUrl: './registro-notas.component.html',
  styleUrl: './registro-notas.component.css'
})
export class RegistroNotasComponent {

  @Input() calificacionSociales: CalificacionEstudiante[] = [];
  @Input() calificacionCiencias: CalificacionEstudiante[] = [];
  @Input() calificacionMatematica: CalificacionEstudiante[] = [];
  @Input() calificacionLenguaje: CalificacionEstudiante[] = [];
  @Input() calificacionEducFisica: CalificacionEstudiante[] = [];
  @Input() calificacionMoral: CalificacionEstudiante[] = [];
  @Input() calificacionIngles: CalificacionEstudiante[] = [];
  @Input() calificacionEducArtistica: CalificacionEstudiante[] = [];
 

}
