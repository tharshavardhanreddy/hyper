import { SharedServiceService } from './../shared-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreatecustomerService } from './createcustomer.service';
import { LocalstorageService } from '../localstorage.service';
import { Location } from '@angular/common';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-createcustomer',
  templateUrl: './createcustomer.component.html',
  styleUrls: ['./createcustomer.component.css']
})
export class CreatecustomerComponent implements OnInit {
  customerForm!: FormGroup;
  isSubmitted = false;
  errormessage:any;
  otp:any;
  Mcheck:any;
  constructor(private formbuilder: FormBuilder,private customerservice : CreatecustomerService,private locatio:Location,
    private route:Router,private localStorageService:LocalstorageService,private sservice:SharedServiceService,    private firedb: AngularFireDatabase,
    ) { }

  ngOnInit(): void {
    this._initForm();
  }

  onsubmit(){
    this.isSubmitted = true;
    if (this.customerForm.invalid) return;

     this.firedb.list('/bookings').valueChanges().subscribe((data) => {
      this.Mcheck = data.filter((ele:any) => ele.mobile ===  this.customerFormcontrol.mobile.value);
      console.log(this.Mcheck);
      
      if(this.Mcheck[0]){
        console.log('inside');
        
        this.errormessage = "Mobile number already exists" ;
        return
      } else {
        const signupdata ={
          email:this.customerFormcontrol.email.value,
          password:'1234567890'
        }
        // console.log(signupdata)
      this.sservice.signup(signupdata).subscribe((data) => {
        // console.log(data);
        if(data.localId){
          this.localStorageService.setLocalid(data.localId);
          this.otp=Math.random().toString().slice(2,6)
          const registerData = {
            name: this.customerFormcontrol.name.value,
            mobile: this.customerFormcontrol.mobile.value,
            email: this.customerFormcontrol.email.value,
            status:false,
            customerid:data.localId,
            otp:this.otp
          };
          // console.log(registerData)
          this.localStorageService.setMobile(this.customerFormcontrol.mobile.value)
    
          this.customerservice.createNewCustomer(registerData,data.localId)
          this.route.navigate(['createcustomer/otp'],{ queryParams: {number: data.localId}})
          }
        },(error) =>{
            this.errormessage = error.error.error.message;
      })
      }
     })



  }
 
    // this.customerservice.createNewCustomer(registerData).then(res =>{
    //   console.log(res);

      
    // },(error) =>{
    //   this.errormessage = error.error.error.message;
    // })
    // this.customerservice.createCustomer(registerData).subscribe((data)=>{
    //   console.log(data)
    //   if(data.name){
    //     this.localStorageService.setMobile(this.customerFormcontrol.mobile.value)
    //     this.route.navigate(['createcustomer/otp'])
    //   } else{
    //     alert('Something went wrong');
    //   }
    // },(error) => { 
    //   console.error('error caught in component')
    //   alert('Something went wrong')
    // })

    locat(){
      this.locatio.back();
          }
  

  private _initForm(){
    this.customerForm = this.formbuilder.group({
      name: ['', Validators.required],
      mobile: ['',  [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
    })
      }
    
      get customerFormcontrol() {
        return this.customerForm.controls;
      }

}
