import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private baseUrl: string = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  public cargarPefil() {
    this.http.get(`${this.baseUrl}/alumno/id`).pipe(
      catchError(err => throwError(() => err.error))
    )
  }

}