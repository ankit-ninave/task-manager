import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/authservice.service';
import { GNotificationService } from '../../core/services/notification.service';
import { ThemeService } from '../../core/services/theme.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomCommonShared } from '../../shared/shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CustomCommonShared],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
constructor(public l_AuthService:AuthService,public l_Router:Router,public l_GNotificationService:GNotificationService,
  public l_ThemeService:ThemeService
){}
lFN_Logout(){
this.l_AuthService.lFN_logout();
this.l_Router.navigate(['/login']);
this.l_GNotificationService.lFN_ShowError('Logout Sucessful')
}

lFN_ToggleTheme() {
  this.l_ThemeService.lFN_ToggleTheme();
}
}
