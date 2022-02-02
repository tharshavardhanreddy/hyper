import { OldcustomerService } from './../oldcustomer.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-oldcustomer',
  templateUrl: './oldcustomer.component.html',
  styleUrls: ['./oldcustomer.component.css']
})
export class OldcustomerComponent implements OnInit {
  customerForm!: FormGroup;
  isSubmitted = false;
  id:any;
  customer:any;
  errormessage:any;
  constructor(private formbuilder: FormBuilder,private locatio:Location,
    private route:Router, private oldService:OldcustomerService) { }

  ngOnInit(): void {
    this._initForm();
  }

  onsubmit(){
    this.isSubmitted = true;
    if (this.customerForm.invalid) return;
    const registerData = {
      mobile: this.customerFormcontrol.mobile.value,
    };
    console.log(registerData);
    this.oldService.FetchCustomerID().subscribe((data:any)=>{
      if(!data.length){
        this.errormessage ="Customer details not found!";
        return
      }
      this.customer = data.filter((ele:any) => ele.mobile ===  this.customerFormcontrol.mobile.value);
      this.id = this.customer[0].customerid
        
        this.route.navigate(['/Cbooking'],{ queryParams: {number: this.id , mobile:this.customerFormcontrol.mobile.value}})
      
    },(error) => {      
    })
  }

  fetchclist(){
    this.isSubmitted = true;
    if (this.customerForm.invalid) return;
    const registerData = {
      mobile: this.customerFormcontrol.mobile.value,
    };
    console.log(registerData);
    this.oldService.FetchCustomerID().subscribe((data:any)=>{
      console.log(data);
      
      if(!data.length){
        this.errormessage ="Customer details not found!";
        return
      }
      this.customer = data.filter((ele:any) => ele.mobile ===  this.customerFormcontrol.mobile.value);
      this.id = this.customer[0].customerid
      this.route.navigate(['/cbokkinglist'],{ queryParams: {number: this.id , mobile:this.customerFormcontrol.mobile.value}})
    },(error) => {      
    })
  }


  locat(){
    this.locatio.back();
        }

  private _initForm(){
    this.customerForm = this.formbuilder.group({
      mobile: ['', Validators.required],
    })
      }
    
      get customerFormcontrol() {
        return this.customerForm.controls;
      }

}
