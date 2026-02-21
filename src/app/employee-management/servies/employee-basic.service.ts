import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/apiservice';

@Injectable({
  providedIn: 'root'
})
export class EmployeeBasicService {

  constructor(public l_ApiService:ApiService) { }
 private l_Url = 'https://api.escuelajs.co/api/v1/products';
  lFN_GetEmployeeListing(){
  return this.l_ApiService.lFN_Get(this.l_Url)
  }
}
