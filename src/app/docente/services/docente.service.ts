import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profesor } from '../interfaces/Profesor.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { GradoResponsable } from '../interfaces/GradoResponsable.interface';
import { GradoCalificar } from '../interfaces/GradoCalificar.interface';
import { CalificacionEstudiante } from '../interfaces/CalificacionEstudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  private baseUrl: string = environment.baseUrl

  constructor(
    private http:HttpClient
  ) { }

  public cargarPefil():Observable<Profesor> {
    return this.http.get<Profesor>(`${this.baseUrl}/profesor/1`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }
  
  public cargarGradoResponsagle():Observable<GradoResponsable> {
    return this.http.get<GradoResponsable>(`${this.baseUrl}/profesor/gradoencargado/1`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

  public cargarGradosCalificar():Observable<GradoCalificar[]> {
    return this.http.get<GradoCalificar[]>(`${this.baseUrl}/profesor/gradoscalificar/1`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }
  
  public cargarCalificacionEstudiantePorGrado(pidGrado:number):Observable<CalificacionEstudiante[]> {
    return this.http.get<CalificacionEstudiante[]>(`${this.baseUrl}/calificacion/calificaciongradomateriaprofe/${pidGrado}/1/1`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

}
