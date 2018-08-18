import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, MenuController } from 'ionic-angular';
import { redeemdetails } from '../redeemdetails/redeemdetails';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { Diagnostic } from '@ionic-native/diagnostic';
@IonicPage()
@Component({
  selector: 'redeem',
  templateUrl: 'redeem.html',
})
export class redeem {
mid: any;
merchantid: any;
merchantuid: any;
scannerSubscription: any;
textdata: any;
scannedCode: any="";
scannedtype: any;
image: any;
submitted = false;
card= false;
  options=null;
  link = this.userdetailsProv.link;
  checklanguage: any;
  apimessage: any;
  cardtitle: any;
  carddate: any;
  timeZone: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,  public events:Events, public menu: MenuController, private barcodeScanner: BarcodeScanner,  public userdetailsProv: UserdetailsProvider, public http: Http, public translate: TranslateService, private diagnostic: Diagnostic) {
  
   this.timeZone= Intl.DateTimeFormat().resolvedOptions().timeZone;
    
  
  let successCallback = (status) => { console.log('camera available ' + status); };
let errorCallback = (e) => console.error(e);
this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);

 this.submitted = false;
 this.card= false;
  
  this.menu.swipeEnable(true);
 /*
 if(localStorage.getItem("languagedata")!=null){
	  this.checklanguage= localStorage.getItem("languagedata");
	  
	  if(this.checklanguage== "en"){
	  this.translate.use('en');
	  }else if(this.checklanguage== "mexican"){
	  this.translate.use('mexican');
	  }
	  }
	*/
	
	if(localStorage.getItem("merchantlanguage")!=null){
	 
	  this.checklanguage= localStorage.getItem("merchantlanguage");
	   
	  
	  if(this.checklanguage== "en" || this.checklanguage== "english"){
	  this.translate.use('en');
	  }else if(this.checklanguage== "mexican" || this.checklanguage== "es"){
	  this.translate.use('mexican');
	  }
	  }
	  
	  else if(localStorage.getItem("languagedata")!=null){
	  
	  this.checklanguage= localStorage.getItem("languagedata");
	  
	  if(this.checklanguage== "en" || this.checklanguage== "english"){
	  this.translate.use('en');
	  }else if(this.checklanguage== "mexican" || this.checklanguage== "es"){
	  this.translate.use('mexican');
	  }
	  }
	  
	 // else{
	 // this.translate.use('en');
	 // }
	  
  if(localStorage.getItem("SesmerchantData")!=null){
		this.menu.enable(false, 'menuuser');
      	this.menu.enable(true, 'menumerchant');
     }
	 
	
		 if(localStorage.getItem("SesmerchantData")!=null){
		
		this.mid=JSON.parse(JSON.parse(localStorage.getItem("SesmerchantData")));
		this.merchantid= this.mid.merchantid;
		this.merchantuid= this.mid.merchantemployeeid;
		}
        
        
       
		
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad redeem');
  }
  
  scanQr(){
 
  if (this.userdetailsProv.CheckConnection()) {
  this.scannedCode= this.scannedCode.trim();
  
 if (this.scannedCode!= "" &&  this.scannedCode.length== 10) {
 this.submitted = false;
 this.userdetailsProv.ShowLoading();
  this.cardtransactionqrcodeapi();
	  }else{
	  this.submitted = true;
	  } 
 } //internet
  }
  
 

scanCode(){

if (this.userdetailsProv.CheckConnection()) {
this.options={
  prompt:"Place a QR code inside the rectangle to scan it."
  }
    this.barcodeScanner.scan(this.options).then(barcodeData => {
      this.scannedCode = barcodeData.text;
	  console.log("scannedCode length"+ this.scannedCode.length);
	  
	  this.scanQr();
    }, (err) => {
        console.log('Error: ', err);
    });
	 } //internet
  }
  
  cardtransactionqrcodeapi(){


  this.scannedCode= this.scannedCode.trim();
  console.log("this.scannedCode"+ this.scannedCode);

	
   let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
    	let body= {"merchantid":this.merchantid, "timeZone": this.timeZone};
        console.log(JSON.stringify(body));
			console.log(this.link+'cardtransactionqrcode/'+this.scannedCode);
            return this.http.post(this.link+'cardtransactionqrcode/'+this.scannedCode, body, options)
			.subscribe(function (response) {
			debugger;
			  methodInstance.userdetailsProv.HideLoading();
			   let scancoderesponse = JSON.parse(response["_body"]);
			   
			    if(scancoderesponse.success!= false){
			    	try{
			    		if(scancoderesponse.cardType=="coin"){
						methodInstance.scannedtype= scancoderesponse.cardType;
			    	}else{
			    		methodInstance.scannedtype= scancoderesponse.cardDetails.card_data.cardType;

			    	}
			    }catch(Exception){

			    }
			   
			   methodInstance.image= scancoderesponse.logo;

			   if(methodInstance.scannedtype=="coin"){
				methodInstance.cardtitle= "";
			   methodInstance.carddate= scancoderesponse.remainingCoins;
			   }else{
			   methodInstance.cardtitle= scancoderesponse.cardDetails.card_data.cardTitle;
			   methodInstance.carddate= scancoderesponse.cardDetails.card_data.expiryDate;
			   }
			   
			   
			   
			   methodInstance.navCtrl.push(redeemdetails, { scandata: methodInstance.scannedCode, scannedtype: methodInstance.scannedtype, image:  methodInstance.image, merchantuid: methodInstance.merchantuid, merchantid: methodInstance.merchantid, cardtitle: methodInstance.cardtitle, carddate: methodInstance.carddate   });
			   methodInstance.scannedCode= "";
			   }else{
			   methodInstance.card= true;
			   methodInstance.submitted= true;
			   methodInstance.apimessage= scancoderesponse.message;
			 //  methodInstance.alertmessage(scancoderesponse);
			   }
			   
            }, function (error) {
				 methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
  }
  
  alertmessage(scancoderesponse) {
  
  var message= scancoderesponse.message;
 
    let alert = this.alertCtrl.create({
      title: message,
	  cssClass: 'redeemMsg',
      buttons: ['OK']
    });
    alert.present();
	
  }
}
