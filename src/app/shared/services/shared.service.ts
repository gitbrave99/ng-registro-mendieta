import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/Menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  menuByUser: Menu[] = [];

  constructor() {

    if (!localStorage.getItem('usertype')) { }
    const usertype = localStorage.getItem('usertype')
    this.menuByUser = this.getMenu(Number(usertype!));
  }

  private menuListEstudiante: Menu[] = [
    {
      title: 'Mi perfil',
      path: 'estudiante/mi-perfil'
    },
    {
      title: 'Mis Notas',
      path: 'estudiante/mis-notas'
    }
  ]

  private menuListDocente: Menu[] = [
    {
      title: 'Mi perfil',
      path: 'docente/mi-perfil'
    },
    {
      title: 'Ingreso De Notas',
      path: 'docente/ingreso-notas'
    }
  ]

  private menuListAdmin: Menu[] = [
    {
      title: 'Mi perfil',
      path: 'admin/mi-perfil'
    },
    {
      title: 'Boleta y Gestión De Grados',
      path: 'admin/boleta-gestion-grados'
    },
    {
      title: 'Gestión De Usuarios',
      path: 'admin/gestion-usuarios'
    },
    {
      title: 'Gestión De Calificaciones',
      path: 'admin/gestion-calificaciones'
    },
    {
      title: 'Año Lectivo',
      path: 'admin/lectivo'
    }
  ]

  // crear funcion que reciba el rol y devuelva el menu correspondiente 
  getMenu(rol: number = 1): Menu[] {
    console.log("user rol: ", typeof rol);
    switch (rol) {
      case 3:
        return this.menuListEstudiante;
      case 2:
        return this.menuListDocente;
      case 1:
        return this.menuListAdmin;
      default:
        return [];
    }
  }

}
