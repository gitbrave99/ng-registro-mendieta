import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private baseUrl:string = environment.baseUrl

  constructor(
    private http: HttpClient
  ) { }

  public cargarPefil(){}

}