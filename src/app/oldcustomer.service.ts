import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OldcustomerService {
  mathnumber:any;
  newticketid:any;
  constructor(private http:HttpClient, private firedb : AngularFireDatabase) { }

  FetchCustomerID(){
    return this.firedb.list('/customers').valueChanges()

  }

  createslot(slotdata: any,transactiondata:any,id:any){
    this.mathnumber =Math.random().toString().slice(2,17);
    console.log(this.mathnumber);

    return this.firedb.object('/bookings/'+`${this.mathnumber}`).set(slotdata)
    .then(res =>{
      console.log(res);
      const data ={
        id:this.mathnumber,
      } 
            this.firedb.object('/bookings/'+`${this.mathnumber}`).update(data).then(res =>{
        const data ={
          ticketid:this.mathnumber,
        }       
        console.log(data,id);
        this.firedb.object('/customers/'+`${id}`+'/tickets/'+`${this.mathnumber}`).set(data).then(res =>{
          this.newticketid =this.mathnumber
          console.log(this.newticketid);
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
      })
    })

  


  //  return this.firedb.object('/bookings/'+`${this.mathnumber}`).set(slotdata).then(res =>{
  //    console.log(res);
  //     this.firedb.list('/transactions').push(transactiondata).then(res =>{
  //      transactiondata.id = res.key
  //      const data ={
  //        ticketid :this.mathnumber,
  //        id:transactiondata.id
  //      } 
  //      this.firedb.object('/transactions/'+`${transactiondata.id}`).update(data).then(res =>{
  //        const newdata ={
  //          transactionid:transactiondata.id
  //        }
  //        this.firedb.object('/bookings/'+`${this.mathnumber}`).update(newdata)
  //      })
  //    })
  //  })
  }

  fetchbookingDetails(){
    return this.firedb.object('/bookings/'+`${this.newticketid}`).valueChanges()
  }

}
