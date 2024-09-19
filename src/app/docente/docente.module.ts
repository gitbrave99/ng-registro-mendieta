import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocenteRoutingModule } from './docente-routing.module';
import { MiPerfilPageComponent } from './pages/mi-perfil-page/mi-perfil-page.component';
import { IngresoNotasPageComponent } from './pages/ingreso-notas-page/ingreso-notas-page.component';
import { CardGradoResponsableComponent } from './components/card-grado-responsable/card-grado-responsable.component';
import { CardListaGradosComponent } from './components/card-lista-grados/card-lista-grados.component';
import { RegistroNotasComponent } from './components/registro-notas/registro-notas.component';
import { MdAgregarNotaComponent } from './components/md-agregar-nota/md-agregar-nota.component';
import { MdAgregarAsistenciaComponent } from './components/md-agregar-asistencia/md-agregar-asistencia.component';
import { MdImprimirNotasComponent } from './components/md-imprimir-notas/md-imprimir-notas.component';
import { MdAgregarNotaRecuperacionComponent } from './components/md-agregar-nota-recuperacion/md-agregar-nota-recuperacion.component';
import { MdAgregarConductaComponent } from './components/md-agregar-conducta/md-agregar-conducta.component';
import { CalcasistenciaPipe } from '../shared/pipes/calcasistencia.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MiPerfilPageComponent,
    IngresoNotasPageComponent,
    CardGradoResponsableComponent,
    CardListaGradosComponent,
    RegistroNotasComponent,
    MdAgregarNotaComponent,
    MdAgregarAsistenciaComponent,
    MdImprimirNotasComponent,
    MdAgregarNotaRecuperacionComponent,
    MdAgregarConductaComponent,
  ],
  imports: [
    CommonModule,
    DocenteRoutingModule,
    SharedModule
  ]
})
export class DocenteModule { }
