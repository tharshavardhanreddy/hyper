import { SharedServiceService } from './../shared-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CreatecustomerService } from './createcustomer.service';
import { LocalstorageService } from '../localstorage.service';
import {AngularFireDatabase} from '@angular/fire/compat/database'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  customerForm!: FormGroup;
  isSubmitted = false;
  errormessage:any
  constructor(private formbuilder: FormBuilder,
    private route:Router,private localStorageService:LocalstorageService,
    private sservice : SharedServiceService,private router: Router
    ) { }

  ngOnInit(): void {
    this._initForm();
  }

  onsubmit(){
    this.isSubmitted = true;
    if (this.customerForm.invalid) return;
    const signupdata ={
      email:this.customerFormcontrol.email.value,
      password:this.customerFormcontrol.password.value
    }
    // console.log(signupdata)

    this.sservice.signup(signupdata).subscribe((data) => {
      // console.log(data);
      if(data.localId){
        const registerData = {
          name: this.customerFormcontrol.name.value,
          mobile: this.customerFormcontrol.mobile.value,
          email: this.customerFormcontrol.email.value,
          empid: this.customerFormcontrol.empid.value,
          arena: this.customerFormcontrol.arena.value,
          role:'Arena Admin',
          status:false,
          refid:data.localId
        };
        // console.log(registerData);
        this.sservice.completesignup(registerData,data.localId)
        this.router.navigate(['/signin'])
      }
    },(error) => { 
        console.error(error);
        this.errormessage = error.error.error.message;
      })
  }

  private _initForm(){
    this.customerForm = this.formbuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      empid:['', Validators.required],
      arena:['', Validators.required],
    })
      }
    
      get customerFormcontrol() {
        return this.customerForm.controls;
      }

}
