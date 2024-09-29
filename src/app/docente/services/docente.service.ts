import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profesor } from '../interfaces/Profesor.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { GradoResponsable } from '../interfaces/GradoResponsable.interface';
import { GradoCalificar } from '../interfaces/GradoCalificar.interface';
import { CalificacionEstudiante } from '../interfaces/CalificacionEstudiante.interface';
import { SesionToken } from '../../auth/interfaces/SesionToken.interface';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  private baseUrl: string = environment.baseUrl
  private idprofe: number = 0;
  constructor(
    private http: HttpClient
  ) {
    if (localStorage.getItem("userlogged")) {
      let userdata: SesionToken = JSON.parse(localStorage.getItem("userlogged")!)
      this.idprofe = userdata.userlogin;
    }
  }

  public cargarPefil(): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.baseUrl}/profesor/${this.idprofe}`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

  public cargarGradoResponsagle(): Observable<GradoResponsable> {
    return this.http.get<GradoResponsable>(`${this.baseUrl}/profesor/gradoencargado/${this.idprofe}`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

  public cargarGradosCalificar(): Observable<GradoCalificar[]> {
    return this.http.get<GradoCalificar[]>(`${this.baseUrl}/profesor/gradoscalificar/${this.idprofe}`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

  public cargarCalificacionPorGrado(pIdGrado: number, pIdMateria: number): Observable<CalificacionEstudiante[]> {
    return this.http.get<CalificacionEstudiante[]>(`${this.baseUrl}/calificacion/calificaciongradomateriaprofe/${pIdGrado}/${pIdMateria}/${this.idprofe}`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

}
