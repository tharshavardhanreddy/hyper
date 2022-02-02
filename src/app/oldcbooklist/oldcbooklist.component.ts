import { OldcustomerService } from './../oldcustomer.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-oldcbooklist',
  templateUrl: './oldcbooklist.component.html',
  styleUrls: ['./oldcbooklist.component.css']
})
export class OldcbooklistComponent implements OnInit {
  status = false;
  admins:any
  isSubmitted = false;
  errormessage:any
  mobilenumber:any
  customerid:any;
  mobile:any;
  dataa:any;
  constructor(private location:Location, private oldservice:OldcustomerService,private activer:ActivatedRoute
    ,private route:Router,private firedb : AngularFireDatabase) { }

  ngOnInit(): void {
    this.activer.queryParams.subscribe(params =>{
      this.mobilenumber=params.mobile;
      this.customerid = params.number

    })

    this.oldservice.fetchDetailsfromMobile().pipe(map(data => data.reverse())).subscribe(data =>{
      this.mobile = data.filter((ele:any) => ele.mobile ===  this.mobilenumber);
      console.log(this.mobile);
      
      // this.dataa = this.mobile;
     })

  }

  locat(){
    this.location.back();
  }

  deleteadmin(id:any){
    this.route.navigate(['/bookingdetail'],{ queryParams: {bookingid: id}})
  }



}
