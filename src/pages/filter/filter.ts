import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { Http, Headers, RequestOptions } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
userdata: any;
userid: any;
link = this.userdetailsProv.link;
notificationOnOff= false;
isNotification= "0";
fcmid= this.userdetailsProv.fcmid;
  constructor(public navCtrl: NavController, public navParams: NavParams, public userdetailsProv: UserdetailsProvider, public http: Http) {
  
  
  if(localStorage.getItem("SesUserData")!=null){
			this.userdata=JSON.parse(localStorage.getItem("SesUserData"));
			this.userid= this.userdata.userId;
			
			}
            
            
              if (this.userdetailsProv.CheckConnection()) {
            this.getNotificationSettings();
            } //internet
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
  }
  
  
 setNotificationSettings(){
 
   if (this.userdetailsProv.CheckConnection()) {

if(this.notificationOnOff== true){
this.isNotification= "1";
}else{
this.isNotification= "0";
}

let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
    	let body= {"status": this.isNotification, "fcmid": this.fcmid};
        let data= JSON.stringify(body);  
			console.log(data);
			console.log(this.link+'changenotificationstatus/' +this.userid);
            return this.http.post(this.link+'changenotificationstatus/' +this.userid, body, options)
			.subscribe(function (response) {
			
			
			   let coderesponse = JSON.parse(response["_body"]);
               
			   methodInstance.userdetailsProv.HideLoading(); 
					
			   
            }, function (error) {
				 methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
                
                } //internet
  }
  
  
  
  getNotificationSettings(){
 
  

let methodInstance = this;
  let headers = new Headers({
                'Content-Type': 'application/json'
            });
         
		let options = new RequestOptions({
                headers: headers
            });
    	let body= "";
        
			
			console.log(this.link+'getnotificationstatus/' +this.userid);
            return this.http.post(this.link+'getnotificationstatus/' +this.userid, body, options)
			.subscribe(function (response) {
			
			
			   let coderesponse = JSON.parse(response["_body"]);
			   methodInstance.userdetailsProv.HideLoading(); 
					 if(coderesponse.isNotification== "1"){
                    methodInstance.notificationOnOff= true;
                    
                    }else {
                     methodInstance.notificationOnOff= false;
                    }
                   
                    
                    
					
			   
            }, function (error) {
				 methodInstance.userdetailsProv.HideLoading();
                    console.log("Error happened: " + error)
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
                }
                );
  }



}
