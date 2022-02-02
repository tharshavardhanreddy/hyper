import { CreatecustomerService } from './../createcustomer/createcustomer.service';
import { SharedServiceService } from './../shared-service.service';
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-bookingdetails',
  templateUrl: './bookingdetails.component.html',
  styleUrls: ['./bookingdetails.component.css']
})
export class BookingdetailsComponent implements OnInit {
  mobile:any;
  game:string | undefined;
  timeslot:any;
  data:any;
  number:any;
  id:any;
  bookingid:any;
  constructor(private sharedservice: SharedServiceService,private localStorageService:LocalstorageService,
    private activer:ActivatedRoute, private custservice:CreatecustomerService,private route:Router,private firedb: AngularFireDatabase) { }
  ticketid = this.localStorageService.getticketid();

  ngOnInit(): void {

    this.activer.queryParams.subscribe(params =>{
      this.number=params.number;
      // console.log(this.number);
      this.bookingid = params?.bookingid
      
    })

    if(this.number){
      this.custservice.fetchDetailsfromMobile().pipe(map(data => data.reverse())).subscribe(data =>{
       this.mobile = data.filter((ele:any) => ele.mobile ===  this.number);
      //  console.log(this.mobile);
       this.data = this.mobile[0];
      })
    }else if(this.bookingid){
    this.firedb.object('/bookings/'+`${this.bookingid}`).valueChanges().subscribe(res => {
    this.data = res;
    })
    }
    else{
      this.custservice.fetchsinglebookingdetail().subscribe(res =>{
        // console.log(res);
      this.data = res;
      })
    }

   
   
    // this.activer.queryParams.subscribe(params =>{
    //   this.number=params.number;
    // })

    // if(this.activer.queryParams){
    //   console.log(this.number);
    //   this.sharedservice.fetchBookingDetail().subscribe((data)=>{
    //     console.log(data)
    //     this.score = data
    //     var keys = Object.keys(this.score);
    //     console.log(keys);
    //     for(var i=0; i<keys.length; i++){
    //       var k =keys[i];
    //       if(this.number === this.score[k].mobile )
    //       {
    //         this.id = k,
    //        this.bookingID = this.score[k]
    //        this.game = this.score[k].gamename;
    //        this.timeslot = this.score[k].slot;
    //       }
    //       console.log(this.bookingID);
    //     }
    //   },(error) => {
    //     alert('something went wrong!')
    //   })
    // }else{
    //   this.sharedservice.fetchBookingDetail().subscribe((data)=>{
    //     console.log(data)
    //     this.score = data
    //     var keys = Object.keys(this.score);
    //     console.log(keys);
    //     for(var i=0; i<keys.length; i++){
    //       var k =keys[i];
    //       if(this.mobile === this.score[k].mobile )
    //       {
    //         this.id = k,
    //        this.bookingID = this.score[k]
    //        this.game = this.score[k].gamename;
    //        this.timeslot = this.score[k].slot;
    //       }
    //       console.log(this.bookingID);
    //     }
    //   },(error) => {
    //     alert('something went wrong!')
    //   })
    // }
  }

  home(){
      this.route.navigate(['/controlpanel'])
  }

// private _fetchdetails(){
//   if(this.activer.queryParams){
//     alert(this.number)
//   }else{
//     this.sharedservice.fetchBookingDetail().subscribe((data)=>{
//       console.log(data)
//       this.score = data
//       var keys = Object.keys(this.score);
//       console.log(keys);
//       for(var i=0; i<keys.length; i++){
//         var k =keys[i];
//         if(this.mobile === this.score[k].mobile )
//         {
//           this.id = k,
//          this.bookingID = this.score[k]
//          this.game = this.score[k].gamename;
//          this.timeslot = this.score[k].slot;
//         }
//         console.log(this.bookingID);
//       }
//     },(error) => {
//       alert('something went wrong!')
//     })
//   }
// }

}
