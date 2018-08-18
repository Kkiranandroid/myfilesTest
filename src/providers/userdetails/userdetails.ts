import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController, Platform } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Network } from '@ionic-native/network';
declare var navigator: any;

@Injectable()
export class UserdetailsProvider {
loading:any;
toast:any;
fcmid = "";
deviceid= "";
transaction= false;
latitude: any;
longitude: any;
willenter= false;
signuproot= false;
 status= false;
//live url
//link="https://www.cloopcard.com:8080/";
link="https://www.cloopcard.com:8000/";
//link="https://www.cloopcard.com:8080/";

//local url
//link= "http://192.168.1.26:3001/";

  constructor( public http: Http,public loadingCtrl: LoadingController, public toastCtrl: ToastController, private fcm: FCM, public platform:Platform, private uniqueDeviceID: UniqueDeviceID, private network: Network) {
 
    console.log('Hello UserdetailsProvider Provider');
	this.platform.ready().then(() => {
	this.Setfcmid(); 
	this.setdeviceid();
	 });
	 
	 
  }
  
  
  
   Setfcmid(){
            //uncoment below
            if (this.platform.is('cordova')){
                this.fcm.getToken().then(token=>{
                  console.log("token");
                  console.log(token);
                  if(token==null || token==""){
                      this.Setfcmid();
                  }
                  else{
                      this.fcmid=token;
                  }
                })
            }
           
       }
	   
	   setdeviceid(){
	  
	     if (this.platform.is('cordova')){
	   this.uniqueDeviceID.get().then((uuid: any) =>{
	   console.log("device id= "+ uuid);
	   if(uuid==null || uuid==""){
                      this.setdeviceid();
                  }
                  else{
                      this.deviceid=uuid;
                  }
	   })
            }
	   }

ShowLoading(){
            this.loading = this.loadingCtrl.create({
                content: 'Please wait...'
            });//Create loading
            this.loading.present();//Start loading symbol
        }

        HideLoading(){
            this.loading.dismiss();
        }
		
		
		 CheckConnection(){
       
            if(navigator.connection!=undefined){
                if(navigator.connection.type=="none"){
                    this.ShowToast("Internet is disabled, please enable internet",3000)
                    return false;
                }
                else{
                    return true;
                }
            }
            else{
                //if opened in browser
                return true;
            }
        }


 ShowToast(mes,duration){
        if(duration==null||duration==undefined||duration==""){
            duration=3000;
        }
   

        this.toast = this.toastCtrl.create({
            message: mes,
            duration: duration,
            position: 'bottom',
           
          });

        this.toast.onDidDismiss(() => {
          });
         this.toast.present();
    }
		
	 SomethingWentWrongAlert(){
            this.ShowToast("Something went wrong, please try again",5000)
                    return false;
        }	



}
