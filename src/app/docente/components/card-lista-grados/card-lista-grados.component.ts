import { Component, Input, input } from '@angular/core';
import { GradoCalificar } from '../../interfaces/GradoCalificar.interface';

@Component({
  selector: 'app-card-lista-grados',
  templateUrl: './card-lista-grados.component.html',
  styleUrl: './card-lista-grados.component.css'
})
export class CardListaGradosComponent {


  @Input() gradosCalificar: GradoCalificar[] = [];

  constructor() { }


}
