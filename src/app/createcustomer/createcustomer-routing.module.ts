import { TimeslotComponent } from './timeslot/timeslot.component';
import { ChoosegameComponent } from './choosegame/choosegame.component';
import { OtpComponent } from './otp/otp.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatecustomerComponent } from './createcustomer.component';

const routes: Routes = [
  { path: '', component: CreatecustomerComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'choose', component: ChoosegameComponent },
  { path: 'slot', component: TimeslotComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreatecustomerRoutingModule { }
