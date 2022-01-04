import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  // APIURL = environment.apiURL;
  key='AIzaSyCzJ1uY96lNoNWTNjOUn4nGe5pXI5xAZww'
  constructor(private http:HttpClient, private firedb : AngularFireDatabase) { }


  signIn(email: string, password: string){
    let searchparams = new HttpParams();
    searchparams =searchparams.append('Key',this.key);

    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUfhn-bzN96eJM2nT5NJyIKWayKiEr_V0`,
      { email, password }
    );
  }

  checksignin(data:any){
    return this.firedb.object('/admins/'+`${data}`).valueChanges()
  }

  fetchBookingDetail(){
    return this.firedb.list('/bookings',ref => ref.orderByChild('timestamp')).valueChanges()
  }





  signup(data:any){
    return this.http.post<any>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUfhn-bzN96eJM2nT5NJyIKWayKiEr_V0`,
      data
    );
  }

  completesignup(payload:any ,id:any){
    return this.firedb.object('/admins/'+`${id}`).set(payload)
  // const dbRef = this.firedb.list('/admins/'+`${id}`)
  //    return  dbRef.push(payload).then(res =>{
  //         payload.id = res.key
  //         this.firedb.object('/admins/'+`${payload.id}`).update(payload)
  //       })
  }

  listofAdmins(){
    return this.firedb.list('/admins').valueChanges()
  }

  verifyAdmin(id:any){
    const data ={
      status:true,
    }
    return this.firedb.object('/admins/'+`${id}`).update(data)
  }

  deleteAdmin(id:any){
  return this.firedb.object('/admins/'+`${id}`).remove()
  }

  detailedBooking(id:any){
return this.firedb.object('/bookings/'+`${id}`).valueChanges();
  }

  customerdata(id:any){
    return this.firedb.object('/customers/'+`${id}`).valueChanges();
  }

  transactiondata(id:any){
    return this.firedb.object('/transactions/'+`${id}`).valueChanges();
  }
  // firebaseConfig = {
  //   apiKey: "AIzaSyARQPpP1kCu4kIg42kvM0j3KcIt40JdMV8",
  //   authDomain: "hyperdemo-bc53a.firebaseapp.com",
  //   projectId: "hyperdemo-bc53a",
  //   storageBucket: "hyperdemo-bc53a.appspot.com",
  //   messagingSenderId: "738926178169",
  //   appId: "1:738926178169:web:e08529dde351490c43c9a8",
  //   measurementId: "G-8CTQSCF0H3"
  // };
}
