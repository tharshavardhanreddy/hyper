import { CouponsComponent } from './coupons/coupons.component';
import { OldcbookingdetailsComponent } from './oldcbookingdetails/oldcbookingdetails.component';
import { CreateoldcbookingComponent } from './createoldcbooking/createoldcbooking.component';
import { OldcustomerComponent } from './oldcustomer/oldcustomer.component';
import { DetailedbookingComponent } from './detailedbooking/detailedbooking.component';
import { RemovetokenComponent } from './removetoken/removetoken.component';
import { AdminsComponent } from './admins/admins.component';
import { SignupComponent } from './signup/signup.component';
import { FetchidComponent } from './fetchid/fetchid.component';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';
import { SinginComponent } from './singin/singin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OldcbooklistComponent } from './oldcbooklist/oldcbooklist.component';

const routes: Routes = [
  {path: '' , component:SinginComponent},
  {path: 'signin' , component:SinginComponent},
  {path: 'signup' , component:SignupComponent},
  {path: 'admins' , component:AdminsComponent},
  {path: 'fetch' , component:FetchidComponent},
  {path: 'fetchCustomer' , component:OldcustomerComponent},
  {path: 'Cbooking' , component:CreateoldcbookingComponent},
  {path: 'bookingdetail' , component:BookingdetailsComponent},
  {path: 'oldcbookingdetail' , component:OldcbookingdetailsComponent},
  {path: 'details' , component:DetailedbookingComponent},
  {path: 'removetoken' , component:RemovetokenComponent},
  {path: 'cbokkinglist' , component:OldcbooklistComponent},
  {path: 'ccoupons' , component:CouponsComponent},


  {
    path: 'controlpanel',
    loadChildren: () =>
      import('./controlpanel/controlpanel.module').then(
        (m) => m.ControlpanelModule
      ),
  },
  {
    path: 'createcustomer',
    loadChildren: () =>
      import('./createcustomer/createcustomer.module').then(
        (m) => m.CreatecustomerModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
