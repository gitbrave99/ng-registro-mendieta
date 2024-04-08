import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/Usuario.interface';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SesionToken } from '../interfaces/SesionToken.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _usuario!: Usuario;
  constructor(
    private http: HttpClient
  ) { }

  login(usuario:string, clave:string){
    const url= `${this.baseUrl}/usuario/sesion`;

    const body={usuario,clave};
    return this.http.post<SesionToken>(url,body)
    .pipe(
      tap(resp=>{
        console.log("respuesta: ", resp);
        
        // if (resp.ok) {
        //   localStorage.setItem("token", "token");
        // }
      }),
      // map(resp=> resp?.ok),
      catchError(err=>of(err.error.msg))
    )
  }
  

}
