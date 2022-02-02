import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/localstorage.service';
import { CreatecustomerService } from '../createcustomer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  customerForm!: FormGroup;
  isSubmitted = false;
  otpnumber:any;
  id:any;
  errormessage:any
  successmessage:any
  constructor(private formbuilder: FormBuilder,private customerservice : CreatecustomerService, private locatio:Location,
    private route:Router, private localStorageService:LocalstorageService,private activer:ActivatedRoute
    ) { }
    mobile = this.localStorageService.getMobile();

  ngOnInit(): void {
    this._initForm();

    this.activer.queryParams.subscribe(params =>{
        this.id=params.number;
      })
 this.customerservice.fetchOtp(this.id).subscribe((data:any) =>{
   console.log(data);
   this.otpnumber = data.otp
 },(error) => { 
  this.errormessage='Customer not found!'
      })
//     this.customerservice.createOtp(this.mobile).subscribe((data)=>{
// console.log(data);
// if(data.status === 200){
// this.otpnumber = data.otp
// }
//     },(error) => { 
//       alert('Otp not generated')
//     })

  }

  locat(){
    this.locatio.back();
        }

  onsubmit(){
    this.isSubmitted = true;
    if (this.customerForm.invalid) return;   
    console.log(this.customerFormcontrol.otp.value);
    console.log(this.otpnumber);    
 if(this.otpnumber == this.customerFormcontrol.otp.value ){
  this.successmessage='Success! user mobile got verified'
   this.route.navigate(['createcustomer/choose'])
 }else{
  this.errormessage = 'OTP not verified';
 }
  }

  private _initForm(){
    this.customerForm = this.formbuilder.group({
      otp: ['', Validators.required],
    })
      }
    
      get customerFormcontrol() {
        return this.customerForm.controls;
      }

}
