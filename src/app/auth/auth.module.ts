import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginPage } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AuthLoginPage
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  exports:[
    AuthLoginPage
  ]
})
export class AuthModule { }
