import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profesor } from '../interfaces/Profesor.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { GradoResponsable } from '../interfaces/GradoResponsable.interface';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {

  private baseUrl: string = environment.baseUrl

  constructor(
    private http:HttpClient
  ) { }

  public cargarPefil():Observable<Profesor> {
    return this.http.get<Profesor>(`${this.baseUrl}/profesor/2`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }
  
  public cargarGradoResponsagle():Observable<GradoResponsable> {
    return this.http.get<GradoResponsable>(`${this.baseUrl}/profesor/gradoencargado/2`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

}
