import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { LocalstorageService } from '../localstorage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreatecustomerService {
  // APIURL = environment.apiURL;
  newticketid :any;
  mathnumber:any;
  constructor(private http: HttpClient,private firedb : AngularFireDatabase,private localStorageService:LocalstorageService) { }


  createNewCustomer(payload:any,id:any){
    return this.firedb.object('/customers/'+`${id}`).set(payload).then(res =>{
      console.log(res);
    })
  }

  // createCustomer(customerdata: any): Observable<any>{
  //   return this.http.post<any>(
  //     `${this.APIURL}customers.json`,
  //     customerdata
  //   );  }

   chooseGame(choosedata: any,customerID:any){
    this.mathnumber =Math.random().toString().slice(2,17);
    console.log(this.mathnumber);
    return this.firedb.object('/bookings/'+`${this.mathnumber}`).set(choosedata)
    .then(res =>{
      console.log(res);
      const data ={
        id:this.mathnumber,
      } 
            this.firedb.object('/bookings/'+`${this.mathnumber}`).update(data).then(res =>{
        const data ={
          ticketid:this.mathnumber,
        }       
        console.log(data,customerID);
        this.firedb.object('/customers/'+`${customerID}`+'/tickets/'+`${this.mathnumber}`).set({ticketid:this.mathnumber}).then(res =>{
         this.newticketid =this.mathnumber
          console.log(this.newticketid);
        })
      })
    })
   } 


   createslot(slotdata: any,transactiondata:any){
     console.log(this.newticketid);
    return this.firedb.object('/bookings/'+`${this.newticketid}`).update(slotdata).then(res =>{
      console.log(res);
       this.firedb.list('/transactions').push(transactiondata).then(res =>{
        transactiondata.id = res.key
        const data ={
          ticketid :this.newticketid,
          id:transactiondata.id
        } 
        this.firedb.object('/transactions/'+`${transactiondata.id}`).update(data).then(res =>{
          const newdata ={
            transactionid:transactiondata.id
          }
          this.firedb.object('/bookings/'+`${this.newticketid}`).update(newdata)
        })
      })
    })
   } 

   fetchsinglebookingdetail(){
    console.log(this.newticketid);
    return this.firedb.object('/bookings/'+`${this.newticketid}`).valueChanges()
  }

fetchOtp(id:any){
return this.firedb.object('/customers/'+`${id}`).valueChanges()
}

fetchDetailsfromMobile(){
  return this.firedb.list('/bookings',ref => ref.orderByChild('timestamp')).valueChanges()
}

removeticketid(id:any){
  return this.firedb.object('/bookings/'+`${id}`).remove()
}


// fetchslots(){
//   this.firedb.list('/timeslots/'+`battlecove/`+`2021-12-20`).valueChanges().pipe(map((x:any)=>x.slot))
// }

  //  createOtp(number:any){
  //   return this.http.post<any>(
  //     `https://frozen-woodland-23865.herokuapp.com/sms`,
  //     {"phonenumber":number}
  //   );
  //  }

  //  deleteOtp(){
  //   return this.http.delete<any>(
  //     `https://testhyper-cc76a-default-rtdb.firebaseio.com/otp.json`
  //   );
  //  }
}
