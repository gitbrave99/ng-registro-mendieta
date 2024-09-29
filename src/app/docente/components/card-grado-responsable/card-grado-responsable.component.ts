import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GradoResponsable } from '../../interfaces/GradoResponsable.interface';
import { DocenteService } from '../../services/docente.service';
import { ScrollUtils } from '../../../shared/utils/ScrollUtils';
import { CalificacionEstudiante } from '../../interfaces/CalificacionEstudiante.interface';

@Component({
  selector: 'app-card-grado-responsable',
  templateUrl: './card-grado-responsable.component.html',
  styleUrl: './card-grado-responsable.component.css'
})
export class CardGradoResponsableComponent {

  gradoresponsable: GradoResponsable = {} as GradoResponsable
  idgradoResponsable: number = 0;
  @Output() onCargarCalificacionesPorGrado= new EventEmitter<number>();

  constructor(
    private docenteService: DocenteService
  ) {
    this.cargarPerfil();
    if (localStorage.getItem("gradoresp") != null) {
      this.idgradoResponsable = Number(localStorage.getItem("gradoresp"))
      console.log("idgradoResponsable", this.idgradoResponsable);
    }
  }

  cargarPerfil() {
    this.docenteService.cargarGradoResponsagle().subscribe({
      next: (rep) => {
        console.log("grado responsable ", rep);
        this.gradoresponsable = rep
      },
      error: (error) => {
        console.error("error", error);
      }
    })
  }

  cargarCalificacionesGradoResponsable() {
    this.onCargarCalificacionesPorGrado.emit(this.idgradoResponsable);
    ScrollUtils.fScrollIntoView("pnllisStudents")
  }

}
