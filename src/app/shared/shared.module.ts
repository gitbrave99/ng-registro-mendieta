import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarTopComponent } from './components/navbar-top/navbar-top.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { MdConfirmComponent } from './components/md-confirm/md-confirm.component';
import { CalcasistenciaPipe } from './pipes/calcasistencia.pipe';



@NgModule({
  declarations: [
    NotFoundPageComponent,
    SidebarComponent,
    NavbarTopComponent,
    HomePageComponent,
    MdConfirmComponent,
    CalcasistenciaPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    SidebarComponent,
    NavbarTopComponent,
    HomePageComponent,
    CalcasistenciaPipe
  ]
})
export class SharedModule { }
