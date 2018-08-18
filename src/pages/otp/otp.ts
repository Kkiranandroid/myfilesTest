import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, Platform  } from 'ionic-angular';
import { viewcards } from '../viewcards/viewcards';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AndroidPermissions } from '@ionic-native/android-permissions';
declare var window: any;
declare var SMS:any;
@IonicPage()
@Component({
  selector: 'otp',
  templateUrl: 'otp.html',
})
export class otp {
 otp = "";
 public mobilenumber: any;
 link = this.userdetailsProv.link;
 errorOTP = "";
 zone:any;
 resendCount = 0;
    isSubmit = false;
 firstPageData = this.navParams.get("homeObj");
 Ses_OTP = this.firstPageData.OTP;
fcmid= this.userdetailsProv.fcmid;
email: any;
name:any;
deviceid= this.userdetailsProv.deviceid;
language: any;
areaCode: any;
verifymessage: any;
userid: any;
ostype: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events:Events, public userdetailsProv: UserdetailsProvider, public http: Http, public menu: MenuController, public platform:Platform, private androidPermissions: AndroidPermissions) {

 
 let constructor_instance = this;
 //zone used to reflect changes in UI in text box
        this.zone = new NgZone({ enableLongStackTrace: false });
 console.log(JSON.stringify(this.navParams.get("homeObj")));

 this.mobilenumber = this.navParams.get("homeObj").mobilenumber;
 this.areaCode = this.navParams.get("homeObj").areaCode;
 
 // this.otp= this.navParams.get("homeObj").OTP;

 this.Ses_OTP = this.firstPageData.OTP
 
        //To Start SMS Read on sms arives
        console.log("sesotp" + this.Ses_OTP)
  		if (window.SMS) window.SMS.startWatch(function () {
            console.log('watching started');
        }, function () {
                console.log('failed to start watching');
            });
        constructor_instance.otp="";
		//constructor_instance.otp= this.otp;
        
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
                //this.navCtrl.push(this.navCtrl.getActive().component);
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
   
   } //constructor

    bindOTP(otp){
    
        console.log("bind otp");
        this.zone.run(() => {
            this.otp = otp;
        });
    }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad otp');
  } //ionviewdidiload
  
  viewcards(userfulldata){

   if (this.userdetailsProv.CheckConnection()) {
  
           
            this.isSubmit = true;
            this.errorOTP = "";
			
			 if (this.otp != "") {
			 if (this.otp == this.Ses_OTP) {
			
			 	 
			// localStorage.setItem("SesUserData", JSON.stringify(this.firstPageData));
			localStorage.setItem("SesUserData", userfulldata);
			
			 var data= JSON.parse(localStorage.getItem("SesUserData"));
			 var sesuid= data.userId;
			 
			 if(localStorage.getItem("languagedata")==null){
			 localStorage.setItem("languagedata", data.language);
			 localStorage.removeItem("merchantlanguage");
			 }
			 // this.navCtrl.push(viewcards);
			  this.navCtrl.setRoot( viewcards );
			  
			 }else{
                    this.errorOTP = "Please enter valid otp"
                }
			 
			 } else {
                this.errorOTP = "Please enter otp"
            }
		
	 
  } //internet
}

lnkResendOTPClick() {

        if (this.userdetailsProv.CheckConnection()) {
            this.userdetailsProv.ShowLoading();
            //To Start SMS Read on sms arives
            console.log("sesotp" + this.Ses_OTP)
            if (window.SMS) window.SMS.startWatch(function () {
                console.log('watching started');
            }, function () {
                    console.log('failed to start watching');
            });
            let btn_instance = this;
            this.resendCount = this.resendCount + 1;
			
            this.getOTP(this.mobilenumber);
        }
    }
	
	
	 getOTP(mobile) {

   console.log("fcmid"+ this.fcmid);
   console.log("deviceid"+ this.deviceid);
   let mobilenum=JSON.parse('['+JSON.stringify(mobile.toString())+']');
    console.log(mobilenum);
   
   let btn_instance= this;
        if (this.userdetailsProv.CheckConnection()) {
            var methodInstance = this;
         let headers = new Headers({
             
				'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
        
     
	 let body= {"phone":mobilenum, "country":this.areaCode};
		
		let data= JSON.stringify(body);
		 console.log(data);

            return this.http.post(this.link+'sendotp', data, options)
                .subscribe(function (response) {
				
			
            let data = JSON.parse(response["_body"]);
                 console.log(data.OTP);
				  btn_instance.Ses_OTP = data.OTP;
				 // btn_instance.otp= btn_instance.Ses_OTP;
				  btn_instance.userdetailsProv.HideLoading();
				   
                }, function (error) {
                    btn_instance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                btn_instance.userdetailsProv.SomethingWentWrongAlert();
            }  );
        }
    } //getotp

verifyotp(mobile) {
  

   let mobilenum=JSON.parse('['+JSON.stringify(mobile.toString())+']');
    console.log(mobilenum);
   
   let btn_instance= this;
        if (this.userdetailsProv.CheckConnection()) {
            var methodInstance = this;
         let headers = new Headers({
              
				'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
        
    
	// let body= {"phone":mobilenum, "email": this.firstPageData.email, "deviceid": this.deviceid, "fcmid": this.fcmid, "name": this.firstPageData.name, "country":this.areaCode, "ostype": this.ostype};
		
         let body= {"phone":mobilenum, "country":this.areaCode, "name": this.firstPageData.name, "email": this.firstPageData.email, "password": this.firstPageData.password, "fcmid": this.fcmid, "ostype": this.ostype, "deviceid":this.deviceid};
         
		let data= JSON.stringify(body);
		 console.log(data);
		 	console.log(this.link+'verifyotp');
            return this.http.post(this.link+'verifyotp', data, options)
                .subscribe(function (response) {
				
			
            let data = JSON.parse(response["_body"]);
			if(data.success!= false){
					
					btn_instance.verifymessage= data.message;
					btn_instance.userid= data.userId;
					btn_instance.language= data.language;
					 btn_instance.userdetailsProv.HideLoading();
				 btn_instance.viewcards(JSON.stringify(data));
				   }else{
				   btn_instance.userdetailsProv.HideLoading();
				   btn_instance.userdetailsProv.ShowToast(data.message,3000);
				   }
				   
                }, function (error) {
                    btn_instance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                btn_instance.userdetailsProv.SomethingWentWrongAlert();
            }  );
        }
    } //verifyotp





ionViewWillEnter()
{


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






	
}
