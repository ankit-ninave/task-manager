import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {









































  // title = 'task-manager';
  // constructor(private userSource: UserSourceService){}
  // //favoriteColorControl = new FormControl()
  // // name = new FormControl('',Validators.required)
  // // setvalue(){
  // //   this.name.setValue('Angular dev')
  // //  // this.name.patchValue('Mike');
  // // }
  // // resetvalue(){
  // //   this.name.reset();
  // // }


  // logindetails = new FormGroup({
  //   name: new FormControl('',[Validators.required,Validators.minLength(3)]),
  //   email: new FormControl('',[Validators.required,Validators.minLength(10),Validators.email])
  // })

  // // getControl(currentvalue:string){
  // //   return this.logindetails.get(currentvalue) as FormControl
  // // }

  // Submit(){
  //   if(this.logindetails.invalid){
  //     this.logindetails.markAllAsTouched();
  //     console.warn('this.logindetails',this.logindetails);
  //     return;
  //   }
  // }

  // setValues(){
  //   this.logindetails.setValue({
  //     name:'ankit',
  //     email:'ankit1@gmail.com',
  //   })
  // }

  // resetValues(){
  //   this.logindetails.reset()
  // }


  
  // subscribe() {
  //   this.userSource.subject_ob.subscribe(value => {
  //     console.log('Component received:', value);
  //   });
  // }

  // emit() {
  //   const val = Math.floor(Math.random() * 100);
  //   this.userSource.lFN_GetValues(val);
  // }

  
}
