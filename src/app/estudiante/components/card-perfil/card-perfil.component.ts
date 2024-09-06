import { Component, Input } from '@angular/core';
import { Estudiante } from '../../interfaces/Estudiante.interface';

@Component({
  selector: 'app-card-perfil',
  templateUrl: './card-perfil.component.html',
  styleUrl: './card-perfil.component.css'
})
export class CardPerfilComponent {

  @Input() estudiante: Estudiante={} as Estudiante;

}
