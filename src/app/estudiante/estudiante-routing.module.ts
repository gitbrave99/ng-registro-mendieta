import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiPerfilPageComponent } from './pages/mi-perfil-page/mi-perfil-page.component';
import { MisNotasPageComponent } from './pages/mis-notas-page/mis-notas-page.component';

const routes: Routes = [
      {
        path:'mi-perfil',
        component:MiPerfilPageComponent
      },
      {
        path:'mis-notas',
        component:MisNotasPageComponent
      }
  // {
  //   path:'**',
  //   redirectTo:'mi-perfil'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
