import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController, Platform } from 'ionic-angular';
import { login } from '../login/login';
import { signup } from '../signup/signup';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Http, Headers, RequestOptions } from '@angular/http';
import { LoginpagePage } from '../loginpage/loginpage';
@IonicPage()
@Component({
  selector: 'loginconfirmation',
  templateUrl: 'loginconfirmation.html',
})
export class loginconfirmation {

country: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,  public userdetailsProv: UserdetailsProvider, private diagnostic: Diagnostic, public alertCtrl: AlertController, public platform: Platform, public http: Http) {
  
	  this.menu.swipeEnable(false);
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login Confirmation');
  }

  login(){
	  this.navCtrl.push(login);
  }
  
  signup(){
  this.country= "United States";
  this.navCtrl.push(signup,{country: this.country});
  }

signin(){
this.country= "United States";
  this.navCtrl.push(LoginpagePage,{country: this.country});
}

        
}
