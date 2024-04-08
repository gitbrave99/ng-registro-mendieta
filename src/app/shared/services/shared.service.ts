import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/Menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {

  }

  private menuListEstudiante: Menu[] = [
    {
      title: 'Mi perfil',
      path: 'mi-perfil'
    },
    {
      title: 'Mis Notas',
      path: 'mis-notas'
    }
  ]

  private menuListDocente: Menu[] = [
    {
      title: 'Mi perfil',
      path: 'mi-perfil'
    },
    {
      title: 'Ingreso De Notas',
      path: 'ingreso-notas'
    }
  ]
  private menuListAdmin: Menu[] = [
    {
      title: 'Mi perfil',
      path: 'mi-perfil'
    },
    {
      title: 'Boleta y Gestión De Grados',
      path: 'boleta-gestion-grados'
    },
    {
      title: 'Gestión De Usuarios',
      path: 'gestion-usuarios'
    },
    {
      title: 'Gestión De Calificaciones',
      path: 'gestion-calificaciones'
    },
    {
      title: 'Año Lectivo',
      path: 'lectivo'
    }
  ]

}
