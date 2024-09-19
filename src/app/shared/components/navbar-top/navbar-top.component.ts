import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'shared-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrl: './navbar-top.component.css'
})
export class NavbarTopComponent {

  constructor(private authService: AuthService) {
    
  }

  getPathProfile(): string {
    return this.authService.getPathProfile();
  }

}
