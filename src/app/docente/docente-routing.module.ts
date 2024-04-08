import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiPerfilPageComponent } from './pages/mi-perfil-page/mi-perfil-page.component';
import { IngresoNotasPageComponent } from './pages/ingreso-notas-page/ingreso-notas-page.component';

const routes: Routes = [
  {
    path:'mi-perfil',
    component:MiPerfilPageComponent
  },
  {
    path:'ingreso-notas',
    component:IngresoNotasPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocenteRoutingModule { }
