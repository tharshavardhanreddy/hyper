import { CreatecustomerService } from './../createcustomer/createcustomer.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-removetoken',
  templateUrl: './removetoken.component.html',
  styleUrls: ['./removetoken.component.css']
})
export class RemovetokenComponent implements OnInit {
  bookings:any;
  errormessage:any;
  constructor(private cservice:CreatecustomerService,private location:Location) { }

  ngOnInit(): void {
    this._bookingsList();
  }

  locat(){
    this.location.back();
  }

  private _bookingsList(){
this.cservice.fetchDetailsfromMobile().subscribe(data => {
  this.bookings = data
},(error)=>{
  this.errormessage = error.error.error.message;
})
  }

  remove(id :any){
this.cservice.removeticketid(id).then((res:any) =>{
  console.log(res);
})
  }

}
