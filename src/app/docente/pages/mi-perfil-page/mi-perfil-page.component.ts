import { Component } from '@angular/core';
import { DocenteService } from '../../services/docente.service';
import { Profesor } from '../../interfaces/Profesor.interface';

@Component({
  selector: 'app-mi-perfil-page',
  templateUrl: './mi-perfil-page.component.html',
  styleUrl: './mi-perfil-page.component.css'
})
export class MiPerfilPageComponent {

  perfil:Profesor={} as Profesor

  constructor(
    private docenteService:DocenteService
  ){
    this.cargarPerfil()
  }

  cargarPerfil(){
    this.docenteService.cargarPefil().subscribe({
      next:(rep)=>{
        console.log("perfil ", rep);
       this.perfil = rep 
      },
      error:(error)=>{
        console.error("error", error);
      }
    })
  }


}
