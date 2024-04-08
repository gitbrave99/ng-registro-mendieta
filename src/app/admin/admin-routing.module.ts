import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiPerfilPageComponent } from './pages/mi-perfil-page/mi-perfil-page.component';
import { BoletaGestionGradosPageComponent } from './pages/boleta-gestion-grados-page/boleta-gestion-grados-page.component';
import { GestionUsuariosPageComponent } from './pages/gestion-usuarios-page/gestion-usuarios-page.component';
import { GestionCalificacionesPageComponent } from './pages/gestion-calificaciones-page/gestion-calificaciones-page.component';
import { YearLectivoPageComponent } from './pages/year-lectivo-page/year-lectivo-page.component';

const routes: Routes = [
  {
    path:'mi-perfil',
    component:MiPerfilPageComponent
  },
  {
    path:'boleta-gestion-grados',
    component:BoletaGestionGradosPageComponent
  },
  {
    path:'gestion-usuarios',
    component:GestionUsuariosPageComponent
  },
  {
    path:'gestion-calificaciones',
    component:GestionCalificacionesPageComponent
  },
  {
    path:'lectivo',
    component:YearLectivoPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
