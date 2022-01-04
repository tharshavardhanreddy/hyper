import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SharedServiceService } from '../shared-service.service';

@Component({
  selector: 'app-detailedbooking',
  templateUrl: './detailedbooking.component.html',
  styleUrls: ['./detailedbooking.component.css']
})
export class DetailedbookingComponent implements OnInit {
  errormessage:any
  number:any;
  bookingdata:any;
  cusdata:any;
  transdata:any;
  constructor(private location:Location,private activer:ActivatedRoute,private sharedservice: SharedServiceService) { }

  ngOnInit(): void {
    this.activer.queryParams.subscribe(params =>{
      this.number=params.number;
      // console.log(this.number);
    })

    this.sharedservice.detailedBooking(this.number).subscribe((data:any) =>{
      // console.log(data);
      this.bookingdata = data;
      this.sharedservice.customerdata(data.customerID).subscribe((dataa:any) => {
        // console.log(dataa);
        this.cusdata = dataa;
        console.log(data.transactionid);
        this.sharedservice.transactiondata(data.transactionid).subscribe((res:any)=>{
          // console.log(res);
          this.transdata = res
        })
      })
    })
  }

  locat(){
    this.location.back();
  }

}
