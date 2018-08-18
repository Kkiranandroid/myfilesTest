import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { viewcards } from '../viewcards/viewcards';
import { AndroidPermissions } from '@ionic-native/android-permissions';
declare var window: any;
declare var SMS:any;
@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

home = { confirm: '', password: '', otp: ''}; //initialising
fcmid=this.userdetailsProv.fcmid;
link = this.userdetailsProv.link;
deviceid= this.userdetailsProv.deviceid;
 resetPageData: any;
 Ses_OTP: any;
submitted= false; 
confpassword = false;
confOtp= false;
zone:any;
otp = "";
errorOTP: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userdetailsProv: UserdetailsProvider, public http: Http, public androidPermissions: AndroidPermissions, public platform:Platform) {
  
   this.resetPageData = this.navParams.get("homeObj");
 this.Ses_OTP = this.resetPageData.OTP;
 
 
 
 
 
 
 let constructor_instance = this;
 //zone used to reflect changes in UI in text box
        this.zone = new NgZone({ enableLongStackTrace: false });
 console.log(JSON.stringify(this.navParams.get("homeObj")));

 
 
 
        //To Start SMS Read on sms arives
        console.log("sesotp" + this.Ses_OTP)
  		if (window.SMS) window.SMS.startWatch(function () {
            console.log('watching started');
        }, function () {
                console.log('failed to start watching');
            });
        constructor_instance.otp="";
		
        
        document.addEventListener('onSMSArrive', function (e: any) {
           
           
            var sms = e.data;
            console.log(sms);
            console.log(sms.body);
            console.log(constructor_instance.Ses_OTP + " is your verification OTP.");
            var comparemsg = constructor_instance.Ses_OTP + " is your verification OTP.";
            if (sms.body == comparemsg) {
               
                setTimeout(() => {
                    //set txt box value
                    
                    constructor_instance.bindOTP(constructor_instance.Ses_OTP.toString())
                },50);
                if (window.SMS) window.SMS.stopWatch(function () {
                    console.log('watching stopped');
                }, function () {
                        console.log('failed to stop watching');
                    })
              
             }

        })
  
        //To kill auto read sms after few seconds
        setTimeout(() => {
            if (window.cordova) {
                if (window.SMS) window.SMS.stopWatch(function () {
                    console.log('watching stopped');
                }, function () {
                        console.log('failed to stop watching');
                    })
            }
       }, 10000000);
    
      
   
   
  this.readSmsOtp();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

    confirmed(form: NgForm){
    
    
    
 if (this.userdetailsProv.CheckConnection()) {
  this.submitted = true; //to display message
 
  var password= this.home.password;
  var confpassword= this.home.confirm;
  if(password!= confpassword) {
                    this.confpassword=true;
                    } else {
                    this.confpassword=false;
                    }
     
		 if (this.home.otp != this.Ses_OTP) {
			this.confOtp=true;
            }else{
            this.confOtp=false;
            }
			

	 if(form.valid && !this.confpassword && !this.confOtp){
                
	
     if (this.userdetailsProv.CheckConnection()) {
      this.userdetailsProv.ShowLoading();
     this.resetpassword(this.resetPageData.mobilenumber);
    
        } //internet
     
	  }
      
      
      
	 } //internet
  }
  
   close(){
  this.navCtrl.pop();
  }
  
  
  readSmsOtp(){
  
  
this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS)
.then((success) => {
console.log('Permission granted');

this.platform.ready().then((readySource) => {

if(SMS) SMS.startWatch(()=>{
           console.log('watching started');
        }, Error=>{
       console.log('failed to start watching');
   });

  document.addEventListener('onSMSArrive', (e:any)=>{

       var sms = e.data;
       console.log(sms);
       
       
       
        var comparemsg = this.Ses_OTP + " is your verification OTP.";
            if (sms.body == comparemsg) {
                
                setTimeout(() => {
                    //set txt box value
                    this.bindOTP(this.Ses_OTP.toString())
                },50);
                if (window.SMS) window.SMS.stopWatch(function () {
                    console.log('watching stopped');
                }, function () {
                        console.log('failed to stop watching');
                    })
             }
       });
       
    
       
     
    });

},err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
);

  }
  
  
   bindOTP(otp){
 
        console.log("bind otp");
        this.zone.run(() => {
            this.home.otp = otp;
        });
    }
  
  
  resetpassword(mobile) {
   let mobilenum=JSON.parse('['+JSON.stringify(mobile.toString())+']');

   let btn_instance= this;
        if (this.userdetailsProv.CheckConnection()) {
            var methodInstance = this;
         let headers = new Headers({
              
				'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
        
    
	
		
         let body= {"password": this.home.password, "fcmid": this.fcmid, "deviceid":this.deviceid, "phone": mobilenum};
         
		let data= JSON.stringify(body);
		 console.log(data);
		 	console.log(this.link+'resetpassword');
            return this.http.post(this.link+'resetpassword', data, options)
                .subscribe(function (response) {
				
			
            let data = JSON.parse(response["_body"]);
         
             btn_instance.userdetailsProv.HideLoading(); 
			 if(data.success!= false){
                 btn_instance.userdetailsProv.ShowToast("Password reset successfully",3000);
                     localStorage.setItem("SesUserData", JSON.stringify(data));
	           var userdata= JSON.parse(localStorage.getItem("SesUserData"));
	           var sesuid= userdata.userId;
               
	               if(localStorage.getItem("languagedata")==null){
	               localStorage.setItem("languagedata", data.language);
                    localStorage.removeItem("merchantlanguage");
                        }
                      
				   btn_instance.navCtrl.setRoot(viewcards);
                 
                
				   }else{
				  
				   btn_instance.userdetailsProv.ShowToast(data.message,3000);
				   }
				   
                }, function (error) {
                    btn_instance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error);
                btn_instance.userdetailsProv.SomethingWentWrongAlert();
            }  );
        }
    } 
}
