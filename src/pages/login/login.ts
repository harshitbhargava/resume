import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { HttpHeaders } from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
// import { AngularFireAuth} from 'angularfire2/auth';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login={
    emailid:'',
    password:''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  // details()
  // {
  //   this.navCtrl.push(DetailsPage);

  // }
  // auth(login){
  //   try{
  //     const result=this.ofAuth.auth.signInWithEmailAndPassword(login.emailid,login.password)
  //     console.log(result);
  //     if(result){
  //       this.navCtrl.push(DetailsPage);
  //     }
  //   }
  //   catch(e){
  //     console.error(e);
  //   }
  // }
  // details(){
  //   this.navCtrl.push(DetailsPage);
  // }
 login1(body:any){
   console.log(this.login.emailid)
   console.log(this.login.password)
 return this.http.post("http://localhost:8080/login",{emailid:this.login.emailid,password:this.login.password},{
     observe:'body',
     headers:new HttpHeaders().append('content-Type','application/json')
   }).subscribe(
     data=>{console.log(data);this.navCtrl.push(DetailsPage);},
     error=>console.error(error)
   )
 }
}
