import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/Usuario.interface';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { SesionToken } from '../interfaces/SesionToken.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl
  private _usuario!: Usuario;
  public pathHomeUser:string="";
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(usuario:string, clave:string){
    const url= `${this.baseUrl}/usuario/sesion`;

    const body={usuario,clave};
    return this.http.post<SesionToken>(url,body)
    .pipe(
      tap(resp=>{
        console.log("respuesta: ", resp);
        if (resp) {
          localStorage.setItem("userlogged", JSON.stringify(resp));
          localStorage.setItem("usertype", resp.tipoUsuario);
          localStorage.setItem("tokenuser", resp.token);
          this.getHomePageByUserType(Number(resp.tipoUsuario));
        }
      }),
      // map(resp=> resp?.ok),
      catchError(err=>{
        return throwError(()=>err.error);
      })
    )
  }
  
  logout(){
    localStorage.removeItem('userlogged');
    localStorage.removeItem('usertype');
    localStorage.removeItem('tokenuser');
    localStorage.removeItem('gradoresp');
    this.router.navigateByUrl('');
  }

  getPathProfile(): string {
    let lstemp= localStorage.getItem("usertype")
    if (!lstemp) return "auth/login"; 
    this.getHomePageByUserType(Number(lstemp));
    return this.pathHomeUser;
  }

  getHomePageByUserType(rol:number):void {
    switch (rol) {
      case 3:
        this.pathHomeUser= 'estudiante/mi-perfil';
        break
      case 2:
        this.pathHomeUser= 'docente/mi-perfil';
        break
      case 1:
        this.pathHomeUser= 'admin/mi-perfil';
        break
      default:
        this.pathHomeUser= 'auth/login';
        break
    }
  }

}
