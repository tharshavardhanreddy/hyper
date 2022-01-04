import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setrole(data:any){
    localStorage.setItem('role',data);
  }

  getrole(){
    return localStorage.getItem('role')
  }

  setLocalid(data:any){
    localStorage.setItem('localid',data);
  }

  getlocalid(){
    return localStorage.getItem('localid')
  }

  setticketid(data:any){
    localStorage.setItem('ticketid',data);
  }

  getticketid(){
    return localStorage.getItem('ticketid')
  }

  setMobile(data:any){
    localStorage.setItem('mobile',data);
  }

  getMobile(){
    return localStorage.getItem('mobile')
  }

  setFetchMobile(data:any){
    localStorage.setItem('fetchmobile',data);
  }

  getFetchMobile(){
    return localStorage.getItem('fetchmobile')
  }

  setBookingId(data: any){
    localStorage.setItem('bookingid',data);
  }

  getBookingId(){
    return localStorage.getItem('bookingid')
  }


  

}
