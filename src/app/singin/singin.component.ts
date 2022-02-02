import { SharedServiceService } from './../shared-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../localstorage.service';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css'],
})
export class SinginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  isSubmitted = false;
  errormessage:any
  constructor(private formbuilder: FormBuilder, private sservice:SharedServiceService,
    private router: Router, private localStorageService:LocalstorageService,) { }

  ngOnInit(): void {
    this._initFormgroup();
  }

  onsubmit(){
    this.isSubmitted = true;
    console.log(this.loginFormGroup.value.email,this.loginFormGroup.value.password)
    if (this.loginFormGroup.invalid) return;
this.sservice.signIn(this.loginFormGroup.value.email,this.loginFormGroup.value.password).subscribe(data =>{
// console.log(data)
if(data.localId){
  this.localStorageService.setLocalid(data.localId);
  this.sservice.checksignin(data.localId).subscribe((res:any) =>{
    // console.log(res);
    if(res.status === true){
      this.localStorageService.setrole(res.role);
   this.router.navigate(['/controlpanel']) 
    } else{
      this.errormessage ="Not approved yet!";
    }
  })
}
},(error) => {
  this.errormessage = error.error.error.message;
  return 
})
  }
  // this.router.navigate(['/controlpanel'])
  private _initFormgroup() {
    this.loginFormGroup = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get loginForm() {
    return this.loginFormGroup.controls;
  }

}