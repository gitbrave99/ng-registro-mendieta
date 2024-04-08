import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudianteRoutingModule } from './estudiante-routing.module';
import { MiPerfilPageComponent } from './pages/mi-perfil-page/mi-perfil-page.component';
import { CardPerfilComponent } from './components/card-perfil/card-perfil.component';
import { MdResumenNotasComponent } from './components/md-resumen-notas/md-resumen-notas.component';
import { MisNotasPageComponent } from './pages/mis-notas-page/mis-notas-page.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MiPerfilPageComponent,
    MisNotasPageComponent,
    CardPerfilComponent,
    MdResumenNotasComponent,
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [

  ]
})
export class EstudianteModule { }
