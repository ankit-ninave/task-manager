import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCommonModule } from "@angular/material/core";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatCommonModule,ReactiveFormsModule,FormsModule
  ],
  exports:[
        CommonModule,MatCommonModule,ReactiveFormsModule,FormsModule

  ]
})
export class CustomCommonShared { }
