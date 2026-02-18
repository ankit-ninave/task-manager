import { Observable } from "rxjs";
import { UiService } from "../../../core/services/ui.service";
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
<div *ngIf="loading$ | async" class="overlay">
  <div class="loader"></div>
</div>
  `,
  styles: [`
/* Full screen overlay */
.overlay {
  position: fixed;
  top:0; left:0; right:0; bottom:0;
  background: rgba(0,0,0,0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* Super fancy animated loader */
.loader {
    width: 40px;
    height: 40px;
    --c:no-repeat linear-gradient(orange 0 0);
    background: var(--c),var(--c),var(--c),var(--c);
    background-size: 21px 21px;
    animation: l5 1.5s infinite cubic-bezier(0.3,1,0,1);
}

@keyframes l5 {
   0%   {background-position: 0    0,100% 0   ,100% 100%,0 100%}
   33%  {background-position: 0    0,100% 0   ,100% 100%,0 100%; width:60px; height:60px}
   66%  {background-position: 100% 0,100% 100%,0    100%,0 0   ; width:60px; height:60px}
   100% {background-position: 100% 0,100% 100%,0    100%,0 0   }
}
  `]
})
export class LoaderComponent {
loading$!: Observable<boolean>; // declare without initializing
  constructor(private ui: UiService) {
  this.loading$ = this.ui.loading$; // assign AFTER ui is initialized

  }
}