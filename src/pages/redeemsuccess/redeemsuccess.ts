import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { redeem } from '../redeem/redeem';
@IonicPage()
@Component({
  selector: 'redeemsuccess',
  templateUrl: 'redeemsuccess.html',
})
export class redeemsuccess {
transactionid: any;
scannedtype: any;
price: any;
rewardMessage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
 
  this.transactionid= navParams.get('transactionid');
  this.scannedtype= navParams.get('scannedtype');
  this.price= navParams.get('price');
  this.rewardMessage= navParams.get('rewardMessage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad redeemsuccess');
  }


backToRedeem(){

if(this.scannedtype== "punch" && this.rewardMessage!= "" && this.rewardMessage!= undefined){
this.rewardAlert1();
}else{
this.navCtrl.setRoot( redeem );
}

}



rewardAlert1() {
  let alert = this.alertCtrl.create({
    title: this.rewardMessage,
	  cssClass: 'redeemMsg',
    buttons: [
      {
        text: 'Ok',
		handler: () => {
		
          this.navCtrl.setRoot( redeem );
        }
      }
    ]
  });
  alert.present();
  }
  
  
}
