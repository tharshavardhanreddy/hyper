import { LocalstorageService } from './../../localstorage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreatecustomerService } from '../createcustomer.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-choosegame',
  templateUrl: './choosegame.component.html',
  styleUrls: ['./choosegame.component.css']
})
export class ChoosegameComponent implements OnInit {
  customerForm!: FormGroup;
  isSubmitted = false;
  errormessage:any
  constructor(private formbuilder: FormBuilder,private customerservice : CreatecustomerService,
    private route:Router, private localStorageService:LocalstorageService, private locatio:Location
    ) { }
    customerID = this.localStorageService.getlocalid();
    mobile = this.localStorageService.getMobile();
  ngOnInit(): void {
    this._initForm();
  }

  onsubmit(){
    this.isSubmitted = true;
    if (this.customerForm.invalid) return;
    const registerData = {
      gamename: this.customerFormcontrol.gamename.value,
      customerID:this.customerID,
      mobile:this.mobile
    };
    // console.log(registerData,this.customerID);
    this.customerservice.chooseGame(registerData,this.customerID).then((res) =>{
      // console.log(res);
      this.route.navigate(['createcustomer/slot'],{ queryParams: {game:this.customerFormcontrol.gamename.value}})
    },(error) => { 
      this.errormessage = error.error.error.message;
      })
  }

  locat(){
    this.locatio.back();
        }

 cancel(){
  this.route.navigate(['/controlpanel'])
}      

  private _initForm(){
    this.customerForm = this.formbuilder.group({
      gamename: ['', Validators.required],
    })
      }
    
      get customerFormcontrol() {
        return this.customerForm.controls;
      }

}
