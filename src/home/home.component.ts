import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { single } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
title = 'Home Page';
customClass = 'title-class'

public user = {};

public l_signal = signal(45);

ngOnInit(){
  console.warn('s',this.l_signal());
  this.l_signal.set(6)
    console.warn('set values',this.l_signal());
      this.l_signal.update(val=>val+1)
       console.warn('update values',this.l_signal());
}

lFN_Change(){
  this.title = 'Title changed'
  console.warn('called');
  
}
}
