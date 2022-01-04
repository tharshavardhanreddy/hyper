
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { OldcustomerService } from '../oldcustomer.service';

@Component({
  selector: 'app-oldcbookingdetails',
  templateUrl: './oldcbookingdetails.component.html',
  styleUrls: ['./oldcbookingdetails.component.css']
})
export class OldcbookingdetailsComponent implements OnInit {
  mobile:any;
  game:string | undefined;
  timeslot:any;
  data:any;
  number:any;
  id:any;
  constructor(private oldcservice :OldcustomerService,
    private route:Router,
    ) { }

  ngOnInit(): void {
    
      this.oldcservice.fetchbookingDetails().subscribe((res:any)=>{
        this.data = res;
      })
 
  }

  home(){
    this.route.navigate(['/controlpanel'])
}

}
