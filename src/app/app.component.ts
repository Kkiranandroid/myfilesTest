import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, MenuController, IonicApp, AlertController, App   } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { loginconfirmation } from '../pages/loginconfirmation/loginconfirmation';
import { login } from '../pages/login/login';
import { signup } from '../pages/signup/signup';
import { redeem } from '../pages/redeem/redeem';
import { viewcards } from '../pages/viewcards/viewcards';
import { usage } from '../pages/usage/usage';
import { dashboard } from '../pages/dashboard/dashboard';
import { notifications } from '../pages/notifications/notifications';
import { addnotifications } from '../pages/addnotifications/addnotifications';
import { myprofile } from '../pages/myprofile/myprofile';
import { TranslateService } from '@ngx-translate/core';
import { FCM } from '@ionic-native/fcm';
import { UserdetailsProvider } from '../providers/userdetails/userdetails';
import { viewcardsdetails } from '../pages/viewcardsdetails/viewcardsdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Diagnostic } from '@ionic-native/diagnostic';

import { FilterPage } from '../pages/filter/filter';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { sendcloopcoins } from '../pages/sendcloopcoins/sendcloopcoins';
import { coopCardCoins } from '../pages/coopCardCoins/coopCardCoins';
import { coindetails } from '../pages/coindetails/coindetails';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  checklanguage: any;
  backPressed=false;
  link = this.userdetailsProv.link;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events:Events, public menu: MenuController, public translate: TranslateService, private fcm: FCM, private ionicApp: IonicApp, public userdetailsProv: UserdetailsProvider, public alertCtrl: AlertController, public http: Http, private diagnostic: Diagnostic, public app: App) {
  
  
    this.initializeApp();

		this.menu.enable(false, 'menuuser');
		this.menu.enable(false, 'menumerchant');
		
if(localStorage.getItem("SesUserData")!=null){
		this.menu.enable(true, 'menuuser');
      	this.menu.enable(false, 'menumerchant');
		
}else if(localStorage.getItem("SesmerchantData")!=null){
		this.menu.enable(false, 'menuuser');
      	this.menu.enable(true, 'menumerchant');
  		}

 		
	 
	 //Press again to exit
      this.platform.registerBackButtonAction(() => {
          
        if (this.nav.canGoBack()) {
// This will get instance of all models, popups, loders          
//            let activePortal = ionicApp._loadingPortal.getActive() ||
//               ionicApp._modalPortal.getActive() ||
//               ionicApp._toastPortal.getActive() ||
//               ionicApp._overlayPortal.getActive();
            
            let activePortal = ionicApp._modalPortal.getActive() ||
               ionicApp._toastPortal.getActive() ||
               ionicApp._overlayPortal.getActive();

            if (activePortal) {
              
               activePortal.dismiss();
               
               console.log("handled with portal");
               return;
            }
            
            this.nav.pop()
          return;
        }else{
            
            if(!this.backPressed) {
              this.backPressed = true;
              this.userdetailsProv.ShowToast("Press again to exit",1000);
              setTimeout(() => this.backPressed = false, 2000);
              return;
            }
            localStorage.removeItem("guestuserdidlogin");
            this.platform.exitApp();
        }
      });
      //Press again to exit end





        

  }//constructor

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
	
	  
	  if(localStorage.getItem("merchantlanguage")!=null){
	
	  this.checklanguage= localStorage.getItem("merchantlanguage");
	  localStorage.removeItem("languagedata");
	  
	  if(this.checklanguage== "en" || this.checklanguage== "english"){
	  this.translate.use('en');
	  }else if(this.checklanguage== "mexican" || this.checklanguage== "es"){
	  this.translate.use('mexican');
	  }
	  }
	  
	  else if(localStorage.getItem("languagedata")!=null){
	 
	  this.checklanguage= localStorage.getItem("languagedata");
	  localStorage.removeItem("merchantlanguage");
	  if(this.checklanguage== "en" || this.checklanguage== "english"){
	  this.translate.use('en');
	  }else if(this.checklanguage== "mexican" || this.checklanguage== "es"){
	  this.translate.use('mexican');
	  }
	  }
	 
   
	  if(localStorage.getItem("SesUserData")!=null){
            if(JSON.parse(localStorage.getItem("SesUserData")).userId){
            this.rootPage= viewcards;
            }
    }else if(localStorage.getItem("SesmerchantData")!=null){
            if(JSON.parse(JSON.parse(localStorage.getItem("SesmerchantData"))).merchantid){
            this.rootPage= dashboard;
            }
    }else{ 
            this.rootPage= TutorialPage;
    }
	
	  
		  //uncoment below
          if (this.platform.is('cordova')){  
		
            this.fcm.onNotification().subscribe((data:any)=>{
          
            debugger;
          console.log("data.wasTapped="+ data.wasTapped);
              if(data.wasTapped){
             this.userdetailsProv.HideLoading();
                console.log("Received in background");
                if(data.type=="coins"){
                   this.nav.setRoot(coopCardCoins, {fromfcm: data});
                }else{
                   this.nav.setRoot(viewcards, {fromfcm: data});
                }
               

              } else {
			
                console.log("Received in foreground");
			        	let alt = this.alertCtrl.create({
                            title: data.title,
                            
                            subTitle: data.body, //data.TransactionId
                            buttons: [
                                      {
                                        text: 'Ok',
                                        handler: () => {
                                        
                                        
                    if(data.cardId!= "" && data.type== ""){
				this.nav.push(viewcardsdetails, {card: data.cardId});
				}else if(data.type=="coins"){
                 this.nav.push(coindetails, {card: data.cardId})    .then(() => {
               
                
          const startIndex = this.nav.getActive().index - 1;
               
              
               if(this.nav.getActive().index!= 1){
                this.nav.remove(startIndex, 1);
                }
            
        });
        }
				else if(data.cardId!= "" && data.type!= "logout"){
				this.nav.push(viewcardsdetails, {card: data.cardId})
				.then(() => {
               
                
  				const startIndex = this.nav.getActive().index - 1;
               
              
               if(this.nav.getActive().index!= 1){
                this.nav.remove(startIndex, 1);
                }
      			
				});
				}else if(data.type== "logout"){
                localStorage.removeItem("SesUserData");
                this.nav.setRoot(loginconfirmation);
                }
				else{
               
			        this.nav.setRoot(notifications,{fromfcm: data});
				}
                                        }
                                      }
                                     ]
                          });
                      alt.present();
				
              };//else
			  
			  
            })
          }
      //uncoment above
		
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  viewcards(){
  this.nav.setRoot( viewcards );
  }
  seeusage(){
  this.nav.setRoot( usage );
  }

  openMobileDashboard(){
  this.nav.setRoot( dashboard );
  }
   myprofile(){
  this.nav.setRoot( myprofile );
  }
  notification(){
  this.nav.setRoot( notifications );
  }
  redeem(){
  this.nav.setRoot( redeem );
  }

  sendcloopcoins(){
  this.nav.setRoot( sendcloopcoins );
  }

   coopCardCoins(){
  this.nav.setRoot( coopCardCoins );
  }

  dashboard(){
  window.open('https://cloopcard.com/cloop/','_system','location=yes');
  }
 
  logout(){
  
  
  let alert = this.alertCtrl.create({
    title: 'Do you want to logout',
     cssClass: 'redeemMsg',
    
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'ok',
       handler: () => {
 if (this.userdetailsProv.CheckConnection()) {
    localStorage.removeItem("SesmerchantData");
    localStorage.removeItem("filterdata");
 	this.nav.setRoot( loginconfirmation );
	}
        } //ok handel
      }
    ]
  });
  alert.present();
  }
  
  logoutUser(){
  
  let alert = this.alertCtrl.create({
    title: 'Do you want to logout',
     cssClass: 'redeemMsg',
    
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'ok',
       handler: () => {
 this.userlogoutapi();
        } //ok handel
      }
    ]
  });
  alert.present();
  
 
  }
  settings(){
    this.nav.setRoot( FilterPage );
  }
  
tutorial(){
this.nav.setRoot( TutorialPage );
}




userlogoutapi(){

 var userid= JSON.parse(localStorage.getItem("SesUserData")).userId;
 
          
if (this.userdetailsProv.CheckConnection()) {
this.userdetailsProv.ShowLoading();

	let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
		let options = new RequestOptions({
                headers: headers
            });
		
       let body="";
	   console.log(this.link+'userlogout/'+userid);
            return this.http.post(this.link+'userlogout/'+userid, body, options)
			 .subscribe(function (response) {
			
			  methodInstance.userdetailsProv.HideLoading();
			   
               localStorage.removeItem("SesUserData");
               localStorage.removeItem("filterdata");
               methodInstance.nav.setRoot( loginconfirmation );
			   
                }, function (error) {
				 methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
	


}//internet
 } 
  
}
