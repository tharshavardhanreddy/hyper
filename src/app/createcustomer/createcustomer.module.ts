import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatecustomerRoutingModule } from './createcustomer-routing.module';
import { CreatecustomerComponent } from './createcustomer.component';
import { OtpComponent } from './otp/otp.component';
import { ChoosegameComponent } from './choosegame/choosegame.component';
import { TimeslotComponent } from './timeslot/timeslot.component';


@NgModule({
  declarations: [
    CreatecustomerComponent,
    OtpComponent,
    ChoosegameComponent,
    TimeslotComponent
  ],
  imports: [
    CommonModule,
    CreatecustomerRoutingModule,
    SharedModule
  ]
})
export class CreatecustomerModule { }
