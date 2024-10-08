import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Estudiante } from '../interfaces/Estudiante.interface';
import { Calificacion } from '../interfaces/Calificacion.interface';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private baseUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  public cargarPefil():Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.baseUrl}/alumno/8`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }
  
  public cargarNotas():Observable<Calificacion[]> {
    return this.http.get<Calificacion[]>(`${this.baseUrl}/alumno/calificacion/8`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

}