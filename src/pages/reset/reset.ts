import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';
import { ConfirmPage } from '../confirm/confirm';
import { AndroidPermissions } from '@ionic-native/android-permissions';
@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {

home = { mobilenumber: '', mobpref: '', OTP: '', areaCode: ''}; //initialising
link = this.userdetailsProv.link;
coderesult: any=[];
nocode=false;
submitted = false;
country: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userdetailsProv: UserdetailsProvider, public http: Http, public androidPermissions: AndroidPermissions) {
  
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS])
 .then(
  success => console.log('read sms Permission granted'),
  err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
);
  
   this.country= this.navParams.get('country');
  
   if (this.userdetailsProv.CheckConnection()) {
       this.userdetailsProv.ShowLoading();
       this.countrylistapi();
        }
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPage');
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
  
  
    reset(form: NgForm){
 
 
  this.submitted = true; //to display message
 
	 if(form.valid){
     if (this.userdetailsProv.CheckConnection()) {
	 this.userdetailsProv.ShowLoading();
     this.sendotpreset(this.home.mobilenumber);
    
      } //internet
     
	  }
	
  }
 
 close(){
  this.navCtrl.pop();
  }
  
  
  sendotpreset(mobile) {
  

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
		 	console.log(this.link+'sendotpreset');
            return this.http.post(this.link+'sendotpreset', data, options)
                .subscribe(function (response) {
				
			
            let data = JSON.parse(response["_body"]);
            
			if(data.success!= false){
                 console.log(data.OTP);
				    methodInstance.home.OTP = data.OTP;
					methodInstance.home.areaCode = methodInstance.home.mobpref;
					
					 methodInstance.userdetailsProv.HideLoading();
                     methodInstance.navCtrl.push(ConfirmPage, {homeObj: methodInstance.home});
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
