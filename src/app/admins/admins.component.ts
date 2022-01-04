import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedServiceService } from '../shared-service.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  status = false;
  admins:any
  customerForm!: FormGroup;
  isSubmitted = false;
  errormessage:any
  buttonclicked = false;
  constructor(private sservice:SharedServiceService,private formbuilder: FormBuilder,private location:Location) { }

  ngOnInit(): void {
    this._listofadmins();
    this._initForm();

  }

  buttoncl(){
    this.buttonclicked = true;
  }

  reversed(){
    this.buttonclicked = false;
  }

  locat(){
    this.location.back();
  }

  private _listofadmins(){
    this.sservice.listofAdmins().subscribe((data: any) =>{
      console.log(data);
this.admins = data
    })
  }

  verify(id:any){
this.sservice.verifyAdmin(id)
  }

  deleteadmin(id:any){
    this.sservice.deleteAdmin(id)
  }

  onsubmit(){
    this.isSubmitted = true;
    if (this.customerForm.invalid) return;
    const signupdata ={
      email:this.customerFormcontrol.email.value,
      password:this.customerFormcontrol.password.value
    }
    console.log(signupdata)

    this.sservice.signup(signupdata).subscribe((data) => {
      console.log(data);
      if(data.localId){
        const registerData = {
          name: this.customerFormcontrol.name.value,
          mobile: this.customerFormcontrol.mobile.value,
          email: this.customerFormcontrol.email.value,
          empid: this.customerFormcontrol.empid.value,
          arena: this.customerFormcontrol.arena.value,
          status:false,
          refid:data.localId
        };
        console.log(registerData);
        this.sservice.completesignup(registerData,data.localId)
        this.buttonclicked = false;
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
