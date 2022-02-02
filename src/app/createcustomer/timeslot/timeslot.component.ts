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
  styleUrls: ['./timeslot.component.css'],
})
export class TimeslotComponent implements OnInit {
  slotForm!: FormGroup;
  isSubmitted = false;
  errormessage: any;
  isprice = false;
  gamename: any;
  value: any;
  slotvalue: any;
  maindropdown: any[] = [];
  dropdownslot1: any[] = [];
  arr3: any[] = [];
  arr4: any;
  holdres: any;
  minDate: any;
  pusharr: any[] = [];
  dropdownslot2: any[] = [
    { slot: '10:00 - 10:30', noofpeople: 0 },
    { slot: '10:35 - 11:05', noofpeople: 0 },
    { slot: '11:10 - 11:40', noofpeople: 0 },
    { slot: '11:45 - 12:15', noofpeople: 0 },
  ];
  addpersons: any;
  initialvalue: any;
  update2(value: string) {
    this.value = value;
    // console.log(this.value)
  }

  update3(value: string) {
    this.slotvalue = value;
    // console.log(this.slotvalue)
  }

  constructor(
    private formbuilder: FormBuilder,
    private firedb: AngularFireDatabase,
    private customerservice: CreatecustomerService,
    private activer: ActivatedRoute,
    private route: Router,
    private localStorageService: LocalstorageService,
    private locatio: Location
  ) {}

  ngOnInit(): void {
    this.minDate = new Date().toISOString().slice(0, 10);

    this.activer.queryParams.subscribe((params) => {
      this.gamename = params.game;
    });
    this._initForm();
  }

  timeout() {
    setTimeout(() => {
      this.firedb
        .object(
          '/holdslots/' +
            `${this.gamename}/` +
            `${this.value}/` +
            `${this.slotvalue}`
        )
        .valueChanges()
        .subscribe((res) => {
          if (res !== null) {
            this.firedb
              .object(
                '/holdslots/' +
                  `${this.gamename}/` +
                  `${this.value}/` +
                  `${this.slotvalue}`
              )
              .remove();
            alert('Booking time has been exceeded, kindly book again!');
          }
        });
    }, 120000);
  }

  cancel(){
    this.customerservice.cancelBooking();
    this.firedb
              .object(
                '/holdslots/' +
                  `${this.gamename}/` +
                  `${this.value}/` +
                  `${this.slotvalue}`
              )
              .remove();
    this.route.navigate(['/controlpanel']);
  } 

  onsubmit() {
    this.isSubmitted = true;
    if (this.slotForm.invalid) return;

    this._slotbookingfunction();
  }

  fetchslots() {
    this.firedb
      .list('/timeslots/' + `${this.gamename}/` + `${this.value}`)
      .valueChanges()
      .subscribe((res: any) => {
        this.dropdownslot1 = res;
        console.log(this.dropdownslot1);
        this.arr3 = this.dropdownslot1.map((x: any) => x.slot);
        this.arr4 = this.dropdownslot2.map((x: any) => x.slot);
        this.pusharr = this.arr4.filter((x: any) => !this.arr3.includes(x));
        this.maindropdown.push(...this.pusharr);
      });
  }

  fetch2price() {

    if(!(this.value && this.slotvalue)){
      alert(
        'Kindly fill all details to get price'
          );
          return
    }

    this.firedb
      .object(
        '/timeslots/' +
          `${this.gamename}/` +
          `${this.slotFormcontrol.date.value}/` +
          `${this.slotFormcontrol.slot.value}`
      )
      .valueChanges()
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res === null) {
          this.initialvalue = 0;
        } else {
          this.initialvalue = res.noofpeople;
        }
        this.addpersons =
          parseInt(this.initialvalue) +
          parseInt(this.slotFormcontrol.noofpeople.value);
        if (this.addpersons > 4) {
          alert(
            'Maximum no.of persons for this slot has-been exceeded! , Kindly choose another Slot'
              );
        } else {
          this.firedb
            .object(
              '/holdslots/' +
                `${this.gamename}/` +
                `${this.value}/` +
                `${this.slotvalue}`
            )
            .valueChanges()
            .pipe(take(1))
            .subscribe((res: any) => {
              console.log('holdslots :', res);

              if (res === null) {
                this.firedb
                  .object(
                    '/holdslots/' +
                      `${this.gamename}/` +
                      `${this.value}/` +
                      `${this.slotvalue}`
                  )
                  .set({
                    slot: this.slotFormcontrol.slot.value,
                    slotstatus: 'PENDING',
                  });
                this.isprice = true;
                this.timeout();
              } else {
                alert(
                  'This slot is in pending state!, Kindly wait/choose other slot'
                );
              }
            });
        }
      });
  }

  locat() {
    this.locatio.back();
  }

  private _initForm() {
    this.slotForm = this.formbuilder.group({
      date: ['', Validators.required],
      slot: ['', Validators.required],
      noofpeople: ['', Validators.required],
      price: ['', Validators.required],
      modeofpayment: ['', Validators.required],
      transactionid: ['', Validators.required],
    });
  }

  get slotFormcontrol() {
    return this.slotForm.controls;
  }

  private _slotbookingfunction() {
    const registerData = {
      date: this.slotFormcontrol.date.value,
      slot: this.slotFormcontrol.slot.value,
      noofpeople: this.slotFormcontrol.noofpeople.value,
      status: 'Booked',
      timestamp: Date.now(),
    };
    // console.log(registerData);
    const transactiondata = {
      price: this.slotFormcontrol.price.value,
      modeofpayment: this.slotFormcontrol.modeofpayment.value,
      transactionid: this.slotFormcontrol.transactionid.value,
    };
    // console.log(transactiondata);
    this.customerservice.createslot(registerData, transactiondata).then(
      (res) => {
        // console.log(res);
        this.firedb
          .object(
            '/holdslots/' +
              `${this.gamename}/` +
              `${this.value}/` +
              `${this.slotvalue}`
          )
          .remove();
        this.route.navigate(['/bookingdetail']);
      },
      (error) => {
        this.errormessage = error.error.error.message;
      }
    );

    this.firedb
      .object(
        '/timeslots/' +
          `${this.gamename}/` +
          `${this.slotFormcontrol.date.value}/` +
          `${this.slotFormcontrol.slot.value}`
      )
      .valueChanges()
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res === null) {
          this.firedb
            .object(
              '/timeslots/' +
                `${this.gamename}/` +
                `${this.slotFormcontrol.date.value}/` +
                `${this.slotFormcontrol.slot.value}`
            )
            .set({
              slot: this.slotFormcontrol.slot.value,
              noofpeople: this.slotFormcontrol.noofpeople.value,
            });
        } else {
          this.addpersons =
            parseInt(res.noofpeople) +
            parseInt(this.slotFormcontrol.noofpeople.value);
          this.firedb
            .object(
              '/timeslots/' +
                `${this.gamename}/` +
                `${this.slotFormcontrol.date.value}/` +
                `${this.slotFormcontrol.slot.value}`
            )
            .update({
              slot: this.slotFormcontrol.slot.value,
              noofpeople: this.addpersons,
            });
        }
      });
  }
}
