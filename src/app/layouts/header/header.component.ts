import { Component } from '@angular/core';
import { AuthService } from '../../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
constructor(public l_AuthService:AuthService,public l_Router:Router){}
lFN_Logout(){
this.l_AuthService.lFN_logout();
this.l_Router.navigate(['/login']);
}
}
