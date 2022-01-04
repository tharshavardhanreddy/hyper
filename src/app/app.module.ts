import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SinginComponent } from './singin/singin.component';
import { BookingdetailsComponent } from './bookingdetails/bookingdetails.component';
import { FetchidComponent } from './fetchid/fetchid.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { environment } from 'src/environments/environment';
import { AdminsComponent } from './admins/admins.component';
import { RemovetokenComponent } from './removetoken/removetoken.component';
import { DetailedbookingComponent } from './detailedbooking/detailedbooking.component';
import { OldcustomerComponent } from './oldcustomer/oldcustomer.component';
import { CreateoldcbookingComponent } from './createoldcbooking/createoldcbooking.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OldcbookingdetailsComponent } from './oldcbookingdetails/oldcbookingdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    SinginComponent,
    BookingdetailsComponent,
    FetchidComponent,
    SignupComponent,
    AdminsComponent,
    RemovetokenComponent,
    DetailedbookingComponent,
    OldcustomerComponent,
    CreateoldcbookingComponent,
    OldcbookingdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
