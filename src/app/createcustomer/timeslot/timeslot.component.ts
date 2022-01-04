// import { map } from '@firebase/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService } from 'src/app/localstorage.service';
import { CreatecustomerService } from '../createcustomer.service';
import { Location } from '@angular/common';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: 'app-timeslot',
  templateUrl: './timeslot.component.html',
  styleUrls: ['./timeslot.component.css']
})
export class TimeslotComponent implements OnInit {
  slotForm!: FormGroup;
  isSubmitted = false;
  errormessage:any;
  isprice=false;
  gamename:any;
  value : any;
  slotvalue:any;
  maindropdown:any[]=[];
  dropdownslot1:any[]=[];
  arr3:any[]=[];
  arr4:any;
  holdres:any;
  minDate:any;
  pusharr:any[]=[];
  dropdownslot2:any[] =[{"slot":"10:00 - 10:30","noofpeople":0},{"slot":"10:35 - 11:05","noofpeople":0},{"slot":"11:10 - 11:40","noofpeople":0},{"slot":"11:45 - 12:15","noofpeople":0}];
  addpersons:any;
  initialvalue:any;
  update2(value: string) {
    this.value = value;
    console.log(this.value)
  }

    update3(value: string) {
    this.slotvalue = value;
    console.log(this.slotvalue)
  }

  

  constructor(private formbuilder: FormBuilder,private firedb : AngularFireDatabase,private customerservice : CreatecustomerService,private activer:ActivatedRoute,
    private route:Router, private localStorageService:LocalstorageService,private locatio:Location ) { }

    // newticketid = this.localStorageService.getnewticketid()
    // todayDate=this.datepipe.transform(new Date(), 'yyyy-MM-dd');
      
    //  minDate= new Date().toISOString().slice(0,10);

      

    ngOnInit(): void {
       this.minDate= new Date().toISOString().slice(0,10);
      // console.log(this.minDate);

      this.activer.queryParams.subscribe(params =>{
        this.gamename=params.game;
        // console.log(this.gamename);
        
      })
      this._initForm();
    }

   timeout(){
  setTimeout(() => {
    this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.value}/`+`${this.slotvalue}`).valueChanges().subscribe((res)=>{
      // console.log(res);
      if(res !== null){
        this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.value}/`+`${this.slotvalue}`).remove()
        alert("Booking time has been exceeded, kindly book again!")
      }
    });
    }, 120000);
   }
 
  
    onsubmit(){
      this.isSubmitted = true;
      if (this.slotForm.invalid) return;
      const registerData = {
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
      this.customerservice.createslot(registerData,transactiondata).then(res =>{
        // console.log(res);
        this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.value}/`+`${this.slotvalue}`).remove()
        this.route.navigate(['/bookingdetail']);
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
      
      this.firedb.list('/timeslots/'+`${this.gamename}/`+`${this.value}`).valueChanges().subscribe((res:any) =>{
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
      // this.arr3 = this.dropdownslot1
      // console.log(this.arr3);
      
      // this.maindropdown = this.dropdownslot1.slot
      // console.log(this.maindropdown);
      // this.arr3 = this.dropdownslot1.map((x:any) => x.slot);
      //  console.log(this.arr3);
      //  this.arr4 = this.dropdownslot2.map((x:any) => x.slot);
      //  console.log(this.arr4);

      //   this.pusharr = this.arr3.filter((x:any) => !this.arr4.includes(x));
      //   this.maindropdown.push(...this.pusharr)


      // this.firedb.list('/slots/-Mr0NEHQ3OgBMYJuBMva').valueChanges().subscribe(res =>{
      //   console.log(res);
      //   this.dropdownslot2 = res;
      // })
      // let arr3 = this.dropdownslot1.map((x:any) => x.slot);
      //  console.log(arr3);
      // let arr4 = this.dropdownslot2.filter((x:any) => !arr3.includes(x));
      // this.maindropdown=arr3.push(...arr4)
      // console.log(this.maindropdown);
    }

    fetchprice(){
      this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.value}/`+`${this.slotvalue}`).valueChanges().subscribe((res)=>{
        // console.log(res);
        if(res === null){
          // console.log("im in null");   
         this.holdres = "OPEN"
         this.isprice=true
        } else{
                    // console.log("im in else1");   
          this.holdres ="PEND"
        }
      })

      setTimeout(() => {
        if(this.holdres === "OPEN"){
            // console.log("im in null2");   

     this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.value}/`+`${this.slotvalue}`).set({slot:this.slotFormcontrol.slot.value,slotstatus: "PENDING"})
     this.timeout();
}
else{
            // console.log("im in else2");   

          alert("This slot is in pending state!, Kindly wait/choose other slot")
}
      }, 1000);



    }


    fetch2price(){
      this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.value}/`+`${this.slotvalue}`).valueChanges().pipe(take(1)).subscribe((res:any)=>{
        console.log("holdslots :" , res);
        
        if(res === null){
          this.firedb.object('/holdslots/'+`${this.gamename}/`+`${this.value}/`+`${this.slotvalue}`).set({slot:this.slotFormcontrol.slot.value,slotstatus: "PENDING"})
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
  