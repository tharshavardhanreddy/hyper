import { SharedServiceService } from './../shared-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  customerForm!: FormGroup;
  isSubmitted = false;
  minDate: any;
  couponnumber:any;
  errormessage:any
  successmsg:any;
  constructor(private formbuilder: FormBuilder,private location:Location,private shareds :SharedServiceService) { }

  ngOnInit(): void {
    this.minDate = new Date().toISOString().slice(0, 10);
    this._initForm();

  }

  locat(){
    this.location.back();
  }

  reversed(){
    this.customerForm.reset();
  }

  onsubmit(){
    this.isSubmitted = true;
    if (this.customerForm.invalid) return;
    this.couponnumber =Math.random().toString().slice(2,8);

    const couponData = {
      couponname: this.customerFormcontrol.couponname.value,
      date:this.customerFormcontrol.date.value,
      appliedfor:this.customerFormcontrol.appliedfor.value,
      discount:this.customerFormcontrol.discount.value,
      description:this.customerFormcontrol.description.value,
      couponid:this.couponnumber
    };
    this.shareds.createCoupons(couponData ,this.couponnumber).then((res) =>{
      console.log(res);
      this.customerForm.reset();
      this.successmsg = "Coupon Created Successfully";
    },(error) => { 
      this.errormessage = error.error.error.message;
    })
  }


  private _initForm(){
    this.customerForm = this.formbuilder.group({
      couponname: ['', Validators.required],
      date: ['', Validators.required],
      appliedfor: ['', Validators.required],
      discount: ['', Validators.required],
      // empid:['', Validators.required],
      // arena:['', Validators.required],
    })
      }


  get customerFormcontrol() {
    return this.customerForm.controls;
  }

}
