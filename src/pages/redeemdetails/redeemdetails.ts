import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { redeem } from '../redeem/redeem';
import { redeemsuccess } from '../redeemsuccess/redeemsuccess';

@IonicPage()
@Component({
  selector: 'redeemdetails',
  templateUrl: 'redeemdetails.html',
})
export class redeemdetails {
scannedCode: any="";
price: any="";
totalcoins: any="";
scannedtype: any;
image: any;
merchantuid: any;
merchantid: any;
submitted = false;
link = this.userdetailsProv.link;
carddate: any;
cardtitle: any;
rewardMessage: any;
validDecimal= false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public userdetailsProv: UserdetailsProvider, public http: Http) {
  this.submitted = false;

 
  this.scannedCode = navParams.get('scandata');
  this.scannedtype = navParams.get('scannedtype');
  this.image = navParams.get('image');
  
  this.merchantuid= navParams.get('merchantuid');
  this.merchantid= navParams.get('merchantid');
  
  this.carddate= navParams.get('carddate');
  this.cardtitle= navParams.get('cardtitle');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad redeemdetails');
  }
  
  
  
  showAlert1() {
  let alert = this.alertCtrl.create({
    title: 'Redeem Successful',
	  cssClass: 'redeemMsg',
    buttons: [
      {
        text: 'Ok',
		handler: () => {
		
          this.navCtrl.pop();
        }
      }
    ]
  });
  alert.present();
  }
  
showAlert2() {
  let alert = this.alertCtrl.create({
    title: 'Card Not Found',
	message: 'Card Not Found',
	  cssClass: 'redeemMsg',
    buttons: [
      {
        text: 'Ok',
        role: 'cancel'
      }
    ]
  });
  alert.present();
  }
  
   showAlert3(unsuccess) {
  let alert = this.alertCtrl.create({
    title: unsuccess,
	  cssClass: 'redeemMsg',
    buttons: [
      {
        text: 'Ok',
        handler: () => {
		if(this.scannedtype== "gift" || this.scannedtype== "store"){
        this.price= "";
        }
          
        }
      }
    ]
  });
  alert.present();
  }
  
cardtransactionapigift(type){
  debugger;

if (this.userdetailsProv.CheckConnection()) {

if(this.scannedtype!= type){
this.price= '';
}
this.scannedCode= this.scannedCode.trim();
if(type=="coins"){

}

 
 if(this.price!= ""){
 
 
         var decimalregex=/^\d*\.?\d+$/;
         
                    if(!decimalregex.test(this.price))
                    {
                    this.validDecimal=true;
                    }
                    else
                    {
                    this.validDecimal=false;
                    this.submitted = false;
                    }



    }else{
    this.submitted = false;
    }

if (this.scannedCode!= "" &&  this.scannedCode.length== 10 && this.price!="" && !this.validDecimal) {
if(this.navParams.get('scandata')== this.scannedCode){
this.submitted = false;

 this.price= Math.round( (this.price) * 100 ) / 100;               
this.userdetailsProv.ShowLoading();
               
  let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
    let options = new RequestOptions({
                headers: headers
            });
    
       let body={"merchantemployeeid": this.merchantuid, "merchantid": this.merchantid,"price":this.price};
     let data= JSON.stringify(body);
     console.log(body);
        console.log(data);
    
            return this.http.post(this.link+'cardtransaction/'+this.scannedCode+'/'+ this.scannedtype, data, options)
       .subscribe(function (response) {
      
        methodInstance.userdetailsProv.HideLoading();
         let data = JSON.parse(response["_body"]);
         if(data.success!= false){
         var transactionid= data.TransactionId;
               methodInstance.rewardMessage= data.rewardMessage;
        // methodInstance.showAlert1();
        methodInstance.navCtrl.push(redeemsuccess, { transactionid: transactionid, scannedtype: methodInstance.scannedtype, price: methodInstance.price, rewardMessage: methodInstance.rewardMessage});
         }else{
         var unsuccess= data.message;
               
         methodInstance.showAlert3(unsuccess);
      }
                }, function (error) {
         methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
  }//if (scanned code check)
else{
this.showAlert2();
}
}else{
this.submitted = true;
}//validation check

 } //internet
}
cardtransactionapicoins(type){
  debugger;

if (this.userdetailsProv.CheckConnection()) {

if(this.scannedtype!= type){
this.totalcoins= '';
}
this.scannedCode= this.scannedCode.trim();
 
 if(this.price!= ""){
 
 
         var decimalregex=/^\d*\.?\d+$/;
         
                    if(!decimalregex.test(this.totalcoins))
                    {
                    this.validDecimal=true;
                    }
                    else
                    {
                    this.validDecimal=false;
                    this.submitted = false;
                    }



    }else{
    this.submitted = false;
    }

if (this.scannedCode!= "" &&  this.scannedCode.length== 10 && this.totalcoins!="" && !this.validDecimal) {
if(this.navParams.get('scandata')== this.scannedCode){
this.submitted = false;

 this.totalcoins= Math.round( (this.totalcoins) * 100 ) / 100;               
this.userdetailsProv.ShowLoading();
               
	let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
		let options = new RequestOptions({
                headers: headers
            });
		
       let body={"merchantemployeeid": this.merchantuid, "merchantid": this.merchantid,"price":this.totalcoins};
	   let data= JSON.stringify(body);
	   console.log(body);
        console.log(data);
		
            return this.http.post(this.link+'cardtransaction/'+this.scannedCode+'/'+ this.scannedtype, data, options)
			 .subscribe(function (response) {
			
			  methodInstance.userdetailsProv.HideLoading();
			   let data = JSON.parse(response["_body"]);
			   if(data.success!= false){
			   var transactionid= data.TransactionId;
               methodInstance.rewardMessage= data.rewardMessage;
			  // methodInstance.showAlert1();
			  methodInstance.navCtrl.push(redeemsuccess, { transactionid: transactionid, scannedtype: methodInstance.scannedtype, price: methodInstance.totalcoins, rewardMessage: methodInstance.rewardMessage});
			   }else{
			   var unsuccess= data.message;
               
			   methodInstance.showAlert3(unsuccess);
			}
                }, function (error) {
				 methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
	}//if (scanned code check)
else{
this.showAlert2();
}
}else{
this.submitted = true;
}//validation check

 } //internet
}




cardtransactionapi(){

if (this.userdetailsProv.CheckConnection()) {

/*if(this.scannedtype!= "gift" || this.scannedtype!= "store"){
this.price= '';
}*/
this.price= '';
this.scannedCode= this.scannedCode.trim();
if (this.scannedCode!= "" &&  this.scannedCode.length== 10 ) {
this.submitted = false;
if(this.navParams.get('scandata')== this.scannedCode){

this.userdetailsProv.ShowLoading();

	let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
		let options = new RequestOptions({
                headers: headers
            });
		
       let body={"merchantemployeeid": this.merchantuid, "merchantid": this.merchantid,"price":this.price};
	   let data= JSON.stringify(body);
        console.log(data);
		console.log(this.link+'cardtransaction/'+this.scannedCode+'/'+ this.scannedtype);
            return this.http.post(this.link+'cardtransaction/'+this.scannedCode+'/'+ this.scannedtype, data, options)
			 .subscribe(function (response) {
			
			  methodInstance.userdetailsProv.HideLoading();
			   let data = JSON.parse(response["_body"]);
			   if(data.success!= false){
			   var transactionid= data.TransactionId;
              
               methodInstance.rewardMessage= data.rewardMessage;
               
			   
			  methodInstance.navCtrl.push(redeemsuccess, { transactionid: transactionid, scannedtype: methodInstance.scannedtype, price: methodInstance.price, rewardMessage: methodInstance.rewardMessage});
			   }else{
			   var unsuccess= data.message;
			   methodInstance.showAlert3(unsuccess);
			}
		
			
                }, function (error) {
				 methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
	}//if (scanned code check)
else{
this.showAlert2();
}
}else{
this.submitted = true;
}//validation check

}
 } //internet


 getroundedcoins(coins){

   if(coins){
     let coin=coins.toFixed(2);

  return parseFloat(coin);
}else{

  return "";
}


  }
}