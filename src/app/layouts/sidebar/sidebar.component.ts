import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public l_IsCollapsed = signal(false);

  lFN_ToggleSideBar(){
    this.l_IsCollapsed.set(!this.l_IsCollapsed());
  }

}
