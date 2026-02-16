import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn:"root"
})

export class UserSourceService {
constructor(){

}
  // 1️⃣ Private BehaviorSubject with initial value 0
  private subject = new BehaviorSubject<number>(0);

  // 2️⃣ Exposed observable (read-only)
  subject_ob = this.subject.asObservable();

  // 3️⃣ Emit a new value
  lFN_GetValues(value: number) {
    console.log('Service emitted:', value); // Optional, for console
    this.subject.next(value);
  }



}