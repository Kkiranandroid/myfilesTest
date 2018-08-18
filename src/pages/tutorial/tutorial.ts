import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { loginconfirmation } from '../loginconfirmation/loginconfirmation';
import { viewcards } from '../viewcards/viewcards';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {
skipbutton: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TutorialPage');
  }


skip(){


if(localStorage.getItem("SesUserData")!=null){
this.navCtrl.setRoot(viewcards);
 }else{
this.navCtrl.push(loginconfirmation);
 }

}



}
