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
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
}
.loader::before,
.loader::after {    
  content:"";
  grid-area: 1/1;
  --c:no-repeat radial-gradient(farthest-side,#25b09b 92%,#0000);
  background: 
    var(--c) 50%  0, 
    var(--c) 50%  100%, 
    var(--c) 100% 50%, 
    var(--c) 0    50%;
  background-size: 12px 12px;
  animation: l12 1s infinite;
}
.loader::before {
  margin: 4px;
  filter: hue-rotate(45deg);
  background-size: 8px 8px;
  animation-timing-function: linear
}

@keyframes l12 { 
  100%{transform: rotate(.5turn)}
}
  `]
})
export class LoaderComponent {
loading$!: Observable<boolean>; // declare without initializing
  constructor(private ui: UiService) {
  this.loading$ = this.ui.loading$; // assign AFTER ui is initialized

  }
}