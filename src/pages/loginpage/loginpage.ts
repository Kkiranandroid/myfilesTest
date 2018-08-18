import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FCM } from '@ionic-native/fcm';
import { viewcards } from '../viewcards/viewcards';
import { ResetPage } from '../reset/reset';
@IonicPage()
@Component({
  selector: 'page-loginpage',
  templateUrl: 'loginpage.html',
})
export class LoginpagePage {

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
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public userdetailsProv: UserdetailsProvider, public http: Http, private fcm: FCM) {
   this.country= this.navParams.get('country');

   
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
			
            if (this.userdetailsProv.CheckConnection()) {
             this.userdetailsProv.ShowLoading();
  this.countrylistapi();
  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginpagePage');
  }

close(){
  this.navCtrl.pop();
  }
  
  
  
  userlogin(form: NgForm){
 if (this.userdetailsProv.CheckConnection()) {
  this.submitted = true; //to display message
 
	 if(form.valid){
	 this.userdetailsProv.ShowLoading();
     this.userloginclick(this.home.mobilenumber);
	  }
	 } //internet
  }
  
  
  countrylistapi(){
    debugger;
 
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
       this.http.post(this.link+'countrylist', body, options)
			.subscribe(function (response) {
			
			
			   let coderesponse = JSON.parse(response["_body"]);
		          
                  debugger;
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
  
  
  
  
    
   userloginclick(mobile) {
  

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
        
    
let body= {"phone":mobilenum, "country":this.home.mobpref,"password": this.home.password, "fcmid": this.fcmid };
		
		let data= JSON.stringify(body);
		 console.log(data);
		 	console.log(this.link+'userlogin');
            return this.http.post(this.link+'userlogin', data, options)
                .subscribe(function (response) {
				
		
            let data = JSON.parse(response["_body"]);
			 btn_instance.userdetailsProv.HideLoading();
             
            if(data.success!= false){
                
                 
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
                    console.log("Error happened: " + error)
                btn_instance.userdetailsProv.SomethingWentWrongAlert();
            }  );
        }
    } //getotp
    
    forgot(){
   
 if (this.userdetailsProv.CheckConnection()) {
  this.navCtrl.push(ResetPage,{country: this.country});
   }//internet
    
    }
  
}
