import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/pages/not-found-page/not-found-page.component';
import { AuthLoginPage } from './auth/pages/login/login.component';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';

const routes: Routes = [
  {
    path:'',
    component:AuthLoginPage
  },
  {
    path:'',
    component:HomePageComponent,
    children:[
      {
        path:'estudiante',
        loadChildren:()=>import('./estudiante/estudiante.module').then(m=>m.EstudianteModule)
      },
      {
        path:'docente',
        loadChildren:()=>import('./docente/docente.module').then(d=>d.DocenteModule)
      },
      {
        path:'admin',
        loadChildren:()=>import('./admin/admin.module').then(a=>a.AdminModule)
      },
    ]
  },
 
  // {
  //   path:'docente',
  // },
  // {
  //   path:'admin',
  //   loadChildren:()=>import('./admin/admin.module').then(a=>a.AdminModule)
  // },
  {
    path:'**',
    component:NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
