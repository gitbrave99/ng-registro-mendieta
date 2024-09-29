import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { GradoCalificar } from '../../interfaces/GradoCalificar.interface';
import { ScrollUtils } from '../../../shared/utils/ScrollUtils';

@Component({
  selector: 'app-card-lista-grados',
  templateUrl: './card-lista-grados.component.html',
  styleUrl: './card-lista-grados.component.css'
})
export class CardListaGradosComponent {


  @Input() gradosCalificar: GradoCalificar[] = [];
  @Output() onCargarCalificacionesPorGrado= new EventEmitter<number>();
  
  constructor() { }
  
  cargarCalificacionesByGrado(pIdGrado:number) {
    this.onCargarCalificacionesPorGrado.emit(pIdGrado);
    ScrollUtils.fScrollIntoView("pnllisStudents")
  }

}
