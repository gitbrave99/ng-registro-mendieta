import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BoletaGestionGradosPageComponent } from './pages/boleta-gestion-grados-page/boleta-gestion-grados-page.component';
import { MiPerfilPageComponent } from './pages/mi-perfil-page/mi-perfil-page.component';
import { GestionUsuariosPageComponent } from './pages/gestion-usuarios-page/gestion-usuarios-page.component';
import { GestionCalificacionesPageComponent } from './pages/gestion-calificaciones-page/gestion-calificaciones-page.component';
import { YearLectivoPageComponent } from './pages/year-lectivo-page/year-lectivo-page.component';
import { SharedModule } from '../shared/shared.module';
import { MdGestionGradoComponent } from './components/md-gestion-grado/md-gestion-grado.component';
import { MdResumenNotasComponent } from './components/md-resumen-notas/md-resumen-notas.component';
import { MdGestionNotaComponent } from './components/md-gestion-nota/md-gestion-nota.component';
import { MdGestionAsistenciaComponent } from './components/md-gestion-asistencia/md-gestion-asistencia.component';
import { MdGestionNotaRecuperacionComponent } from './components/md-gestion-nota-recuperacion/md-gestion-nota-recuperacion.component';
import { MdGestionConductaComponent } from './components/md-gestion-conducta/md-gestion-conducta.component';


@NgModule({
  declarations: [
    BoletaGestionGradosPageComponent,
    MiPerfilPageComponent,
    GestionUsuariosPageComponent,
    GestionCalificacionesPageComponent,
    YearLectivoPageComponent,
    MdGestionGradoComponent,
    MdResumenNotasComponent,
    MdGestionNotaComponent,
    MdGestionAsistenciaComponent,
    MdGestionNotaRecuperacionComponent,
    MdGestionConductaComponent,
 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
