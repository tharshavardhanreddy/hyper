import { SharedServiceService } from './../shared-service.service';
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from '../localstorage.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, take } from 'rxjs/operators';
@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.css']
})
export class ControlpanelComponent implements OnInit {
  filter:any; 
   score:any;
  game:string | undefined;
  timeslot:any;
  bookingID:any;
  number:any;
  bookedcount:any;
  myData:any;
  bookedStatus:any;
  count:any;
  slots:any[] = [];
  mathnumber: any;
  constructor(private sharedservice: SharedServiceService, private localStorageService:LocalstorageService,private route:Router,private firedb : AngularFireDatabase) { }
  localId = this.localStorageService.getlocalid();
  role = this.localStorageService.getrole();
  
  ngOnInit(): void {
    this._fetchdetails();
    // console.log(this.localStorageService.getrole());

    // this.firedb.list('/bookings',ref => ref.orderByChild('timestamp')).valueChanges().pipe(map(data => data.reverse())).subscribe((res:any) =>{
    //   console.log(res);
    // })

  }

  private _fetchdetails(){
    this.sharedservice.fetchBookingDetail().pipe(map(data => data.reverse())).subscribe((data)=>{
      // console.log(data);
      this.count = data.length
      this.myData = data
      this.bookedStatus = data.filter((ele:any) => ele.status === "Booked")
      this.bookedcount = this.bookedStatus.length
    })

    

    // this.sharedservice.fetchBookingDetail().subscribe((data)=>{
    //   console.log(data)
    //   this.score = data
    //   var keys = Object.keys(this.score);
    //   console.log(keys);
    //   this.slots = keys
    //   this.count = this.slots.length
    //   var myData = Object.keys(data).map(key => {
    //     return data[key];
    // })
    // console.log(myData);
    // this.ids = myData
    


    // },(error) => {
    //   alert('something went wrong!')
    // })
}





details(id:any){
  this.route.navigate(['/details'],{ queryParams: {number:id}}) 
}


admins(){  
  this.route.navigate(['/admins'])
}

logout(){
  window.localStorage.clear();
  this.route.navigate([''])
}

}


      // if(this.mobile === this.score[k].mobile )
        // {
        //   this.id = k,
        //  this.bookingID = this.score[k]
        //  this.game = this.score[k].gamename;
        //  this.timeslot = this.score[k].slot;
        // }