import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../localstorage.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fetchid',
  templateUrl: './fetchid.component.html',
  styleUrls: ['./fetchid.component.css']
})
export class FetchidComponent implements OnInit {
 customerForm!: FormGroup;
  isSubmitted = false;
  constructor(private formbuilder: FormBuilder,
    private route:Router, private localStorageService:LocalstorageService,private locatio:Location,
    ) { }
    fetchmobile = this.localStorageService.getMobile();

  ngOnInit(): void {
    this._initForm();
  }

  locat(){
    this.locatio.back();
        }

  onsubmit(){
    this.isSubmitted = true;
    if (this.customerForm.invalid) return;
    const registerData = {
      mobile: this.customerFormcontrol.mobile.value,
    };
    // console.log(registerData);
    this.localStorageService.setFetchMobile(registerData);
    this.route.navigate(['/bookingdetail'],{ queryParams: {number: this.customerFormcontrol.mobile.value}})
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
