import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class AuthLoginPage {

  public loginMessage: string = "Usuario o contraseñas incorrectos";
  public isLoggedIn: boolean = false;

  public myForm: FormGroup = this.formsBuilder.group({
    email: ['ejemplo@gmail.cm', [Validators.required, Validators.email]],
    password: ['clave', [Validators.required]]
  })



  constructor(
    private formsBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
  }


  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    console.log("errors", this.myForm.controls[field].errors);


    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracters.`;
        case 'email':
          return `Email inválido`;
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      this.isLoggedIn = false;
      return;
    }

    this.authService.login("IsaacGo","123").subscribe({
      next:(data)=>{
        console.log("data ", data);
        
      }
    })

    // consumir servicio 

    // ERROR EN LOGIN CON EL SERVICIO
    this.isLoggedIn = true;
    this.loginMessage="mensaje de error login"

    // EXITO EN LOGIN 
    this.myForm.reset();
    this.router.navigateByUrl('/escuela/estudiante/mi-perfil')
  }

}
