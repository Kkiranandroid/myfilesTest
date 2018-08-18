import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { otp } from '../otp/otp';
import { NgForm } from '@angular/forms';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FCM } from '@ionic-native/fcm';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { viewcards } from '../viewcards/viewcards';
import { AndroidPermissions } from '@ionic-native/android-permissions';
@IonicPage()
@Component({
  selector: 'signup',
  templateUrl: 'signup.html',
})
export class signup {

link = this.userdetailsProv.link;
home = { mobilenumber: '', name: '',email:'', OTP: '' , verifymessage: '', userid: '', language: '', country: '', mobpref: '', areaCode: '', password: ''}; //initialising
fcmid= this.userdetailsProv.fcmid;
deviceid= this.userdetailsProv.deviceid;
 submitted = false;
 validEmail=false;
 language: any;
 country: any;
 coderesult: any=[];
 nocode=false;
 areaCode: any;
 countryName: any;
 lsDetails: any;
 ostype: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userdetailsProv: UserdetailsProvider, public http: Http, private fcm: FCM, private uniqueDeviceID: UniqueDeviceID, public platform:Platform, public androidPermissions: AndroidPermissions) {
  
  this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS])
 .then(
  success => console.log('read sms Permission granted'),
  err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
);
 

  this.country= this.navParams.get('country');
 
   if (this.userdetailsProv.CheckConnection()) {
   this.userdetailsProv.ShowLoading();
  this.countrylistapi();
   }//if internet
  this.userdetailsProv.Setfcmid();
              if(this.fcmid== null || this.fcmid==""){
          
                this.fcm.getToken().then(token=>{
                
                  if(token==null || token==""){
                      this.userdetailsProv.Setfcmid();
                      this.fcmid=token;
                  }
                  else{
                      this.fcmid=token;
                  }
                })
            }else{
			 setTimeout(() => {
			this.userdetailsProv.Setfcmid();
				}, 5000);   
			}
			
	 
	  
	   this.userdetailsProv.setdeviceid();
              if(this.deviceid== null || this.deviceid==""){
                this.uniqueDeviceID.get().then((uuid: any) =>{
                  if(uuid==null || uuid==""){
                       this.userdetailsProv.setdeviceid();
                      this.deviceid=uuid;
                  }
                  else{
                      this.deviceid=uuid;
                  }
                })
            }else{
			 setTimeout(() => {
			this.userdetailsProv.setdeviceid();
				}, 5000);   
			}
			
	     this.platform.ready().then((readySource) => { 
        if (this.platform.is('android')) {
                console.log("running on Android device!");
                this.ostype= "Android";
            }
            if (this.platform.is('ios')) {
                console.log("running on iOS device!");
                this.ostype= "IOS";
            }
            
   });
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad signup');
	
	if(this.fcmid== null || this.fcmid==""){
                this.fcm.getToken().then(token=>{
                  if(token==null || token==""){
                      this.userdetailsProv.Setfcmid();
                      this.fcmid=token;
                  }
                  else{
                      this.fcmid=token;
                  }
                })
            }else{
			 setTimeout(() => {
			this.userdetailsProv.Setfcmid();
			}, 5000);   
			}
			 
			 
			 this.userdetailsProv.setdeviceid();
              if(this.deviceid== null || this.deviceid==""){
                this.uniqueDeviceID.get().then((uuid: any) =>{
                  if(uuid==null || uuid==""){
                      this.userdetailsProv.setdeviceid();
                      this.deviceid=uuid;
                  }
                  else{
                      this.deviceid=uuid;
                  }
                })
            }else{
			 setTimeout(() => {
			this.userdetailsProv.setdeviceid();
				}, 5000);   
			}
			
	  console.log("deviceid=" + this.deviceid);
  }
  
 

 otp(form: NgForm){
 
 console.log("fcmid=" + this.fcmid);
 
   if (this.userdetailsProv.CheckConnection()) {
  this.submitted = true; //to display message
  var email=this.home.email;
  if(email!= ""){
   var emailregex=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
                    if(!emailregex.test(email))
                    {
                    this.validEmail=true;
                    }
                    else
                    {
                    this.validEmail=false;
                    this.submitted = true;
                    }
    }else{
    this.validEmail=false;
    }
   if (form.valid && !this.validEmail) {
   
               // this.userdetailsProv.ShowLoading();
              //  this.register(this.home.mobilenumber);
              
               this.getOTP(this.home.mobilenumber);
               
            }
	  }//if internet
	  
  }
  
  
countrylistapi(){
this.country= this.country.toLowerCase();
let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
    	let body= "";
        
			
			console.log(this.link+'countrylist');
            return this.http.post(this.link+'countrylist', body, options)
			.subscribe(function (response) {
			
			
			   let coderesponse = JSON.parse(response["_body"]);
		          
                  methodInstance.userdetailsProv.HideLoading();
			  
					 for(var i=0; i< coderesponse.length; i++){
				if(coderesponse[i].countryName== "India" || coderesponse[i].countryName== "United States"){
                
					 if(coderesponse[i].areaCode!= ""){
						methodInstance.coderesult.push(coderesponse[i]);
					 }
					 
						if(methodInstance.country==coderesponse[i].countryName.toLowerCase()){
					// methodInstance.home.mobpref= coderesponse[i].areaCode;
					methodInstance.home.mobpref= coderesponse[i].countryCode;
					 if(methodInstance.home.mobpref== ""){
					 methodInstance.nocode= true;
					 }
					 } 
                     
                     }
                    }//for
					
			   
            }, function (error) {
				 methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
  }
  
  close(){
  this.navCtrl.pop();
  }
  
  
   getOTP(mobile) {
  

   let mobilenum=JSON.parse('['+JSON.stringify(mobile.toString())+']');
    
   
  
        if (this.userdetailsProv.CheckConnection()) {
            var methodInstance = this;
         let headers = new Headers({
              
				'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
        
    
	 let body= {"phone":mobilenum, "country":this.home.mobpref};
		
		let data= JSON.stringify(body);
		 console.log(data);
		 	console.log(this.link+'sendotp');
            return this.http.post(this.link+'sendotp', data, options)
                .subscribe(function (response) {
				
			
            let data = JSON.parse(response["_body"]);
			if(data.success!= false){
                 console.log(data.OTP);
				    methodInstance.home.OTP = data.OTP;
					methodInstance.home.areaCode = methodInstance.home.mobpref;
					
					 methodInstance.userdetailsProv.HideLoading();
				   methodInstance.navCtrl.push(otp, { homeObj: methodInstance.home  });
				   }else{
				   methodInstance.userdetailsProv.HideLoading();
				   methodInstance.userdetailsProv.ShowToast(data.message,3000);
				   }
				   
                }, function (error) {
                    methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
            }  );
        }
    } //getotp
  
 
}
