import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UserdetailsProvider } from '../../providers/userdetails/userdetails';
import { merchantDetails } from '../../pages/merchantDetails/merchantDetails';
@IonicPage()
@Component({
  selector: 'notifications',
  templateUrl: 'notifications.html',
})
export class notifications {
userid: any;
userdata: any;
link = this.userdetailsProv.link;
fetchresult: any=[];
pagenumber: any= 1;
fromfcm:any;
	 infscrollEvent:any;
	 image: any;
	 loaded= false;
     timeZone: any;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public userdetailsProv: UserdetailsProvider) {
  
  this.timeZone= Intl.DateTimeFormat().resolvedOptions().timeZone;
     
     debugger;
  this.loaded= false;
  if(localStorage.getItem("SesUserData")!=null){
			this.userdata=JSON.parse(localStorage.getItem("SesUserData"));
			this.userid= this.userdata.userId;
			
			}
			
             if(navParams.get('noloading')!= undefined ){
             if (this.userdetailsProv.CheckConnection()) {
            
              setTimeout(()=>{
                debugger;
                             this.userdetailsProv.ShowLoading();

                          this.fetchnotification(""); 
                         }, 500);
		}
             }else{
             if (this.userdetailsProv.CheckConnection()) {

                             this.userdetailsProv.ShowLoading();
     
		this.fetchnotification("");
		}
             
             }
            
          /*  this.fromfcm= navParams.get('fromfcm');
   if(this.fromfcm!= undefined){           
        this.navCtrl.push(merchantDetails, {card: this.fromfcm.MerchantId});

        }   */ 
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad notifications');
  }

fetchnotification(infiniteScroll){

let methodInstance = this;
let headers = new Headers({
                    'Content-Type': 'application/json'
                });
                let options = new RequestOptions({
                    headers: headers
                });
					
			 let body= {"page":this.pagenumber,"itemsperpage":3, "timeZone": this.timeZone};		
			
              let data= JSON.stringify(body);  

                console.log(JSON.stringify(body));
				console.log(this.link+'fetchnotifications/'+this.userid)
                return this.http.post(this.link+'fetchnotifications/'+this.userid, data, options)
				.subscribe(
            function(response) {
              debugger;
			 methodInstance.userdetailsProv.HideLoading();
			 
			  if(infiniteScroll!= ""){
            infiniteScroll.complete();
             }
			 if(methodInstance.infscrollEvent!=undefined){
                methodInstance.infscrollEvent.enable(true);
             }
			 
			 try{
             
			  let fetchresponse = JSON.parse(response["_body"]);
			  methodInstance.loaded= true;
			   if(fetchresponse.length== 0){
			 
			  
			     if(methodInstance.fetchresult== undefined){
                    methodInstance.fetchresult="";
                    if(infiniteScroll!= ""){
                    infiniteScroll.enable(false);
					}
                 }
                   if(infiniteScroll!= ""){
                   infiniteScroll.enable(false);
                }
				
			  }else{
		
                
                 if(methodInstance.pagenumber== 1){
                methodInstance.fetchresult=fetchresponse;
              
                 for(var i=0; i< fetchresponse.length; i++){
                if(fetchresponse[i].notification_details.isRead== false){
                methodInstance.readnotification(fetchresponse[i]._id);
                }
                 }//for
                    }else{
                        for(var i=0; i< fetchresponse.length; i++){
                           
                             methodInstance.fetchresult.push(fetchresponse[i]);
                             if(fetchresponse[i].notification_details.isRead== false){
                 methodInstance.readnotification(fetchresponse[i]._id);
                }
                        }
                     }
                }
				 }  catch (e) {
                        methodInstance.userdetailsProv.SomethingWentWrongAlert();
                        methodInstance.userdetailsProv.HideLoading();
                        return false;
                           } //catch
			
			
            },
            function(error) {
                console.log("Error happened: " + error);
                methodInstance.userdetailsProv.HideLoading();
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
            },
        );      
}


doInfinite(infiniteScroll){
    
    if(this.userdetailsProv.CheckConnection()){
           if(this.fetchresult!=""){
           this.infscrollEvent=infiniteScroll;
           this.pagenumber= this.pagenumber + 1;
           
           this.fetchnotification(infiniteScroll);
           }
           else{
           infiniteScroll.enable(false);
           }
          }
  }
  
  
  
  
  readnotification(notificationId){

let methodInstance = this;
let headers = new Headers({
                    'Content-Type': 'application/json'
                });
                let options = new RequestOptions({
                    headers: headers
                });
					
			 let body= {"notificationid":notificationId};		
			
              let data= JSON.stringify(body);  

                console.log(JSON.stringify(body));
				console.log(this.link+'readusernotification/'+this.userid)
                return this.http.post(this.link+'readusernotification/'+this.userid, data, options)
				.subscribe(
            function(response) {
			  let data = JSON.parse(response["_body"]);
			
            },
            function(error) {
                console.log("Error happened: " + error);
                methodInstance.userdetailsProv.SomethingWentWrongAlert();
            },
        );      
}



moveTomerchantdetailpage(list){
  debugger;

 if(this.userdetailsProv.CheckConnection()){
               
            this.navCtrl.push(merchantDetails, {
                         card: list.merchantId,
            });
            }//internet
}
  
}
