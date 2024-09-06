import { Component, Input } from '@angular/core';
import { GradoResponsable } from '../../interfaces/GradoResponsable.interface';
import { DocenteService } from '../../services/docente.service';

@Component({
  selector: 'app-card-grado-responsable',
  templateUrl: './card-grado-responsable.component.html',
  styleUrl: './card-grado-responsable.component.css'
})
export class CardGradoResponsableComponent {
  
  gradoresponsable:GradoResponsable={} as GradoResponsable

  constructor(
    private docenteService:DocenteService
  ){
    this.cargarPerfil()
  }

  cargarPerfil(){
    this.docenteService.cargarGradoResponsagle().subscribe({
      next:(rep)=>{
        console.log("grado responsable ", rep);
        this.gradoresponsable= rep
      },
      error:(error)=>{
        console.error("error", error);
      }
    })
  }
}
