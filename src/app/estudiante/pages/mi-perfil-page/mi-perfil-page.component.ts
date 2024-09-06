import { Component } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { Estudiante } from '../../interfaces/Estudiante.interface';

@Component({
  selector: 'estudiante-mi-perfil-page',
  templateUrl: './mi-perfil-page.component.html',
  styleUrl: './mi-perfil-page.component.css'
})
export class MiPerfilPageComponent {

  estudiante:Estudiante={} as Estudiante

  constructor(
    public estudianteService: EstudianteService
  ) {
    console.log();
    
    this.estudianteService.cargarPefil().subscribe({
      next: (res) => {
        console.log(res)
        this.estudiante = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
