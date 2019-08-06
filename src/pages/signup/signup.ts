import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

 
  signup={
    name:'',
    emailid:'',
    password:'',
    mobilenumber:'',
    college:''
};

  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl: ToastController,public loadingCtrl: LoadingController,private http:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  add(){
    console.log(this.signup.name);
    this.http.post("http://localhost:8080/signup",{name:this.signup.name,emailid:this.signup.emailid,password:this.signup.password,mobilenumber:this.signup.mobilenumber,college:this.signup.college})
    .subscribe((data)=>{
        console.log(data);
    })
  }
  
 
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Account Created!',
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
    this.navCtrl.push(LoginPage);
  }
  
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
  
    setTimeout(() => {
      loading.dismiss();
    }, 1);
  }
  }

