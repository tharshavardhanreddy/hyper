import { OldcustomerService } from './../oldcustomer.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatecustomerService } from '.././createcustomer/createcustomer.service';
import { Location } from '@angular/common';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-createoldcbooking',
  templateUrl: './createoldcbooking.component.html',
  styleUrls: ['./createoldcbooking.component.css']
})
export class CreateoldcbookingComponent implements OnInit {
  slotForm!: FormGroup;
  isSubmitted = false;
  errormessage:any;
  mobilenumber:any
  customerid:any;
  isprice=false
  gamename: any;
  date:any;
  maindropdown:any[]=[];
  dropdownslot1:any[]=[];
  arr3:any[]=[];
  initialvalue:any;
  arr4:any;
  slotvalue:any;
  holdres:any;
  minDate:any;
  pusharr:any[]=[];
  dropdownslot2:any[] =[{"slot":"10:00 - 10:30","noofpeople":0},{"slot":"10:35 - 11:05","noofpeople":0},{"slot":"11:10 - 11:40","noofpeople":0},{"slot":"11:45 - 12:15","noofpeople":0}];
  addpersons:any;

  
  update2(value: string) {
    this.date = value;
    console.log(this.date)
  }

  update3(value: string) {
    this.slotvalue = value;
    console.log(this.slotvalue)
  }

  constructor(private formbuilder: FormBuilder,private customerservice : CreatecustomerService,private activer:ActivatedRoute,
    private route:Router, private cbook:OldcustomerService,private locatio:Location,private firedb : AngularFireDatabase) { }

  ngOnInit(): void {
    this.minDate= new Date().toISOString().slice(0,10);

    this.activer.queryParams.subscribe(params =>{
      this.mobilenumber=params.mobile;
      this.customerid = params.number

    })

    this._initForm();
  }

  timeout(){
    setTimeout(() => {
      this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.date}/`+`${this.slotvalue}`).valueChanges().subscribe((res)=>{
        // console.log(res);
        if(res !== null){
          this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.date}/`+`${this.slotvalue}`).remove()
          alert("Booking time has been exceded, kindly book again!")
        }
      });
      }, 100000);
     }

  devent(event: any){
    this.gamename = event.target.value;
  }

  onsubmit(){
    this.isSubmitted = true;
    if (this.slotForm.invalid) return;
    const registerData = {
      customerID:this.customerid,
      mobile:this.mobilenumber,
      gamename:this.slotFormcontrol.gamename.value,
      date: this.slotFormcontrol.date.value,
      slot: this.slotFormcontrol.slot.value,
      noofpeople: this.slotFormcontrol.noofpeople.value,
      status:'Booked',
      timestamp:Date.now()
    };
    // console.log(registerData);
    const transactiondata ={
      price: this.slotFormcontrol.price.value,
      modeofpayment: this.slotFormcontrol.modeofpayment.value,
      transactionid: this.slotFormcontrol.transactionid.value,
    }
    // console.log(transactiondata);
    this.cbook.createslot(registerData,transactiondata,this.customerid).then(res =>{
      console.log(res);
      this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.date}/`+`${this.slotvalue}`).remove()
      this.route.navigate(['/oldcbookingdetail']);
    },(error) => { 
          this.errormessage = error.error.error.message;
        })

        // this.firedb.object('/timeslots/'+`${this.gamename}/`+ `${this.slotFormcontrol.date.value}/`+`${this.slotFormcontrol.slot.value}`).valueChanges().subscribe((res:any) =>{
        //   if(res === null){
        //     this.initialvalue = 0
        //   } else {
        //     this.initialvalue = res              
        //   }
        // })

        // setTimeout(() => {
        //   if(this.initialvalue === 0){
        //     this.firedb.object('/timeslots/'+`${this.gamename}/`+ `${this.slotFormcontrol.date.value}/`+`${this.slotFormcontrol.slot.value}`).set({slot:this.slotFormcontrol.slot.value,noofpeople: this.slotFormcontrol.noofpeople.value})
        //   } else {
        //     this.addpersons = parseInt(this.initialvalue.noofpeople) + parseInt(this.slotFormcontrol.noofpeople.value);
        //     this.firedb.object('/timeslots/'+`${this.gamename}/`+ `${this.slotFormcontrol.date.value}/`+`${this.slotFormcontrol.slot.value}`).update({slot:this.slotFormcontrol.slot.value,noofpeople: this.addpersons})
        //   }
        // }, 1000);
        this.firedb.object('/timeslots/'+`${this.gamename}/`+ `${this.slotFormcontrol.date.value}/`+`${this.slotFormcontrol.slot.value}`).valueChanges().pipe(take(1)).subscribe((res:any) =>{
          if(res === null){
            this.firedb.object('/timeslots/'+`${this.gamename}/`+ `${this.slotFormcontrol.date.value}/`+`${this.slotFormcontrol.slot.value}`).set({slot:this.slotFormcontrol.slot.value,noofpeople: this.slotFormcontrol.noofpeople.value})
          }else {
            this.addpersons = parseInt(res.noofpeople) + parseInt(this.slotFormcontrol.noofpeople.value);
            this.firedb.object('/timeslots/'+`${this.gamename}/`+ `${this.slotFormcontrol.date.value}/`+`${this.slotFormcontrol.slot.value}`).update({slot:this.slotFormcontrol.slot.value,noofpeople: this.addpersons})                }
        })
  }

  fetchslots(){
      
    this.firedb.list('/timeslots/'+`${this.gamename}/`+`${this.date}`).valueChanges().subscribe((res:any) =>{
      // console.log(res);
      this.dropdownslot1 = res;
      console.log(this.dropdownslot1);
       this.arr3 = this.dropdownslot1.map((x:any) => x.slot);
    //  console.log(this.arr3);
      this.arr4 = this.dropdownslot2.map((x:any) => x.slot);
    //  console.log(this.arr4);

      this.pusharr = this.arr4.filter((x:any) => !this.arr3.includes(x));
      // console.log(this.pusharr);
      
      this.maindropdown.push(...this.pusharr)
      // console.log(this.maindropdown);

    })
  }

  fetchprice(){
    this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.date}/`+`${this.slotvalue}`).valueChanges().subscribe((res)=>{
      if(res === null){
       this.holdres = "OPEN"
       this.isprice=true
      } else{
        this.holdres ="PEND"
      }
    })

    setTimeout(() => {
      if(this.holdres === "OPEN"){
   this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.date}/`+`${this.slotvalue}`).set({slot:this.slotFormcontrol.slot.value,slotstatus: "PENDING"})
   this.timeout();
}
else{
        alert("This slot is in pending state!, Kindly wait/choose other slot")
}
    }, 1000);



  }


  fetch2price(){
    this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.date}/`+`${this.slotvalue}`).valueChanges().pipe(take(1)).subscribe((res:any)=>{
      console.log("holdslots :" , res);
      
      if(res === null){
        this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.date}/`+`${this.slotvalue}`).set({slot:this.slotFormcontrol.slot.value,slotstatus: "PENDING"})
        this.isprice=true
        this.timeout();
      }
      else{
      alert("This slot is in pending state!, Kindly wait/choose other slot")
     }
    })
  }

  locat(){
this.locatio.back();
  }

  private _initForm(){
    this.slotForm = this.formbuilder.group({
      gamename:['', Validators.required],
      date: ['', Validators.required],
      slot: ['', Validators.required],
      noofpeople: ['', Validators.required],
      price: ['', Validators.required],
      modeofpayment: ['', Validators.required],
      transactionid: ['', Validators.required],
    })
      }
    
      get slotFormcontrol() {
        return this.slotForm.controls;
      }

}
