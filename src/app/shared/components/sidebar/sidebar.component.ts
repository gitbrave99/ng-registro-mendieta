import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Menu } from '../../interfaces/Menu.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public menuList: Menu[] = [];

  constructor(public sharedService: SharedService,
    public authService: AuthService
  ) {

  }

  ngOnInit() {
    this.menuList = this.sharedService.menuByUser
  }

  public logout(): void {
    this.authService.logout();
  }



}
